import React, { Component } from 'react';
import Display from './components/Display'
import SearchBar from './components/SearchBar'
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      searched: false
    };
  }
  getCountry = async (e) => {
    e.preventDefault();
    const query = e.target.country.value;
    const url = `http://localhost:8000/api/v1/?search=${query}`;
    const api_call = await fetch(url);
    const data = await api_call.json();
    this.setState ({
      searched: true,
      name: data[0].name,
      capital: data[0].capital,
      flag: data[0].flag,
      borders: data[0].borders
    });
  console.log(data)
  }
  render() {
    return (
      <div className="App">
        <SearchBar getCountry={this.getCountry} /> <br/>
        <Display name={this.state.name}
                 capital={this.state.capital}
                 flag={this.state.flag} />
      </div>
    );
  }
}

export default App;
