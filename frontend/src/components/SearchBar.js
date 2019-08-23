import React, { useState } from 'react'
import { func } from 'prop-types'
import Button from '@material-ui/core/Button'
import countries from '../country_data'
import Autosuggest from 'react-autosuggest'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

/*
This component contains all of the logic for react-autosuggest to auto complete
users searches for countries.
*/
const theme = {
  container: {
    position: 'relative'
  },
  input: {
    width: 300,
    height: 30,
    marginBottom: 10
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'relative',
    width: 300,
    maxHeight: 200,
    zIndex: 2,
    overflowY: 'auto'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    display: 'block'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
};

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : countries.filter(country =>
    country.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = (suggestion) => (
    <MenuItem component="div">
      <div>
        {suggestion.name}
      </div>
    </MenuItem>
)

const renderInputComponent = (inputProps) => {
  const { inputRef = () => {}, ref, ...other } = inputProps;
  return (
    <TextField
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
      }}
      {...other}
    />
  );
}

export default function SearchBar({ handleSubmit }) {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const onChange = (e, { newValue }) => {
    setValue(newValue)
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  };

  const inputProps = {
    placeholder: 'Search for a Country or Territory',
    value,
    onChange,
  };

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ maxWidth: 300, margin: '0 auto' }}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            renderInputComponent={renderInputComponent}
            inputProps={inputProps}
            theme = {theme}
          />
          <Button variant="contained" color="primary" type='submit'>Search</Button>
        </div>
      </form>
    </div>
  )
};

SearchBar.propTypes = {
  handleSubmit: func,
}
