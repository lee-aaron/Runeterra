import React, {Component} from 'react';
import './Card.css';

class Card extends Component {

  constructor(props) {
    super(props);

    this.state = {
      card: this.props.card
    }
  }

  render() {

    let card = this.state.card;

    return (
      <div className="card-body">
        <img className="card-image" src={"http://localhost:3001/runeterra/image/" + card.cardCode} />
      </div>
    )
  }

}

export default Card;