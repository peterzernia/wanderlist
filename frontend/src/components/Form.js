import React from 'react';


class Form extends React.Component {
  render(){
    return(
      <div className='search'>
        <form onSubmit={ this.props.getCountry }>
          Search for a country <br/><br/>
          <input type='text' name="country" placeholder="Country"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Form;
