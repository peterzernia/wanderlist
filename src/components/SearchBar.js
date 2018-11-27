import React, { Component } from 'react'
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

function renderSuggestion(suggestion) {
  return (
    <MenuItem component="div">
      <div>
        {suggestion.name}
      </div>
    </MenuItem>
  );
}

function renderInputComponent(inputProps) {
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

class SearchBar extends Component {

  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Search for a Country or Territory',
      value,
      onChange: this.onChange
    };

    return(
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div style={{ maxWidth: 300, margin: '0 auto' }}>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
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
  }
};

export default SearchBar;
