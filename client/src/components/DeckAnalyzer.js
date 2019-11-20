import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import './DeckAnalyzer.css';
import Card from './Card';

class DeckAnalyzer extends Component {

  constructor(props) {
    super(props);

    let newDeck = [];

    for (var card of this.props.deck) {
      var result = card;
      for (var i = 0; i < result.count; i++) {
        newDeck.push(result);
      }
    }
    
    this.state = {
      deck: newDeck,
      showModal: true
    }

    this.handleShow = this.handleShow.bind(this);
    this.props.showModal.bind(this);
  }

  handleShow() {
    this.setState({
      showModal: false
    });
    this.props.showModal(false);
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.handleShow}>
        <div className="modal">
          <h5 className="content">Card Simulator</h5>
          <div className="modal-buckets">
            <p>Turn 1</p>
            <p>Turn 2</p>
            <p>Turn 3</p>
            <p>Turn 4</p>
            <p>Turn 5</p>
            <p>Turn 6</p>
            <p>Turn 7</p>
            <p>Turn 8</p>
            <p>Turn 9</p>
            <p>Turn 10</p>
          </div>
          <div className="modal-cards">
            { this.state.deck.map((card, index) => (
              <Card key={card.cardCode + "-" + index} card={card} />
            )) }
          </div>
        </div>
      </Modal>
    )
  }

}

export default DeckAnalyzer;