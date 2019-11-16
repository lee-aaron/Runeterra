import React, { Component } from 'react';
import logo from './lor_intro_screen_with_logo.png';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deck_code: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.calculateDeck = this.calculateDeck.bind(this);
  }

  handleChange(e) {
    this.setState({deck_code: e.target.value});
  }

  calculateDeck(e) {
    e.preventDefault();
    fetch('http://localhost:3001/runeterra/calculate', {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.text())
    .then(res => {
      console.log(res);
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <img src={logo} className="App-background" alt="logo" />
        <div className="App-body">
          <form onSubmit={this.calculateDeck} autoComplete="off">
            Deck Code: <input type="text" name="deck_code" onChange={this.handleChange}/>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
