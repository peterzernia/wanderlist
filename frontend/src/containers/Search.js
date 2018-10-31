import React, { Component } from 'react';
import Results from '../components/Results';
import SearchBar from '../components/SearchBar';

class Search extends Component {
  constructor(){
    super();
    this.state = {
      searched: false
    };
  }
  getCountry = async (e) => {
    e.preventDefault();
    const query = e.target.country.value;
    const url = `http://localhost:8000/api/v1/countries/?search=${query}`;
    const api_call = await fetch(url);
    const data = await api_call.json();
    this.setState ({
      searched: true,
      name: data[0].name,
      capital: data[0].capital,
      flag: data[0].flag,
      region: data[0].region,
      subregion: data[0].subregion,
      demonym: data[0].demonym,
      language: data[0].languages[0].name,
      borders: data[0].borders
    });
  console.log(data[0].languages[0].name)
  }
  render() {
    return (
      <div className="search">
        <div className="">
          <SearchBar getCountry={this.getCountry} /> <br/>
          <Results searched={this.state.searched}
                   name={this.state.name}
                   capital={this.state.capital}
                   flag={this.state.flag}
                   region={this.state.region}
                   subregion={this.state.subregion}
                   demonym={this.state.demonym}
                   language={this.state.language}
                   borders={this.state.borders}/>
         </div>
      </div>
    );
  }
}

export default Search;
