import React, { Component } from 'react';
import logo from './lor_intro_screen_with_logo.png';
import './App.css';
import DeckAnalyzer from './components/DeckAnalyzer';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deck_code: '',
      error: '',
      deck: [],
      showModal: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.calculateDeck = this.calculateDeck.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal(show) {
    this.setState({
      showModal: show
    })
  }

  handleChange(e) {
    this.setState({deck_code: e.target.value});
  }

  calculateDeck(e) {
    e.preventDefault();
    fetch('http://localhost:3001/runeterra', {
      method: "POST",
      body: JSON.stringify({
        deck_code: this.state.deck_code
      }),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
    .then(res => {
      if ( res.status === 'error') {
        this.setState({
          error: 'error', 
          deck: []
        });
      } else {
        this.setState({
          deck: res.deck,
          error: '',
          showModal: true
        });
      }
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
            {this.state.error ? <div className="App-error"> There was an error translating your deck code  </div> : ''}
          </form>
        </div>
        {this.state.showModal ? <DeckAnalyzer deck={this.state.deck} showModal={this.handleModal} /> : ''}
      </div>
    );
  }
}

export default App;
