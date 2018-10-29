import React, { Component } from 'react';
import Display from './components/Display'
import Form from './components/Form'
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
    const country = e.target.country.value;
    const url = `http://localhost:8000/api/${country}`;
    const api_call = await fetch(url);
    const data = await api_call.json();
    this.setState ({
      searched: true,
      name: data.name,
      capital: data.capital,
      flag: data.flag,
      borders: data.borders
    });
  console.log(data.name)
  }
  render() {
    return (
      <div className="App">
        <Form getCountry={this.getCountry} /> <br/>
        <Display name={this.state.name}
                 capital={this.state.capital}
                 flag={this.state.flag} />
      </div>
    );
  }
}

export default App;
