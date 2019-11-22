import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';

import './DeckAnalyzer.css';
import Card from './Card';
import Turn from './Turn';

class DeckAnalyzer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deck: this.props.deck,
      origDeck: this.props.deck,
      showModal: true,
      mulligan: [],
      turn1: [],
      turn2: [],
      turn3: [],
      turn4: [],
      turn5: [],
      turn6: [],
      turn7: [],
      turn8: [],
      turn9: [],
      turn10: [],
      isScrolling: false,
      totalProbability: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }

    this.handleShow = this.handleShow.bind(this);
    this.props.showModal.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (this.state.isScrolling !== nextState.isScrolling) {
      this.toggleScrolling(nextState.isScrolling);
    }
  };

  toggleScrolling = (isEnable) => {
    if (isEnable) {
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    } else {
      window.removeEventListener('mousemove', this.onMouseMove);
    }
  };

  onMouseMove = (event) => {
    if (!this.state.isScrolling) return;
    const x = event.pageX - this._scroller.offsetLeft;
    const walk = (x - this.state.startX) * 1.5;
    if (!walk || !x) return;
    this._scroller.scrollLeft = this.state.scrollLeft - walk;
  };

  onMouseUp = (event) => {
    this.setState({
      isScrolling: false
    });
  };

  onMouseLeave = (event) => {
    this.setState({
      isScrolling: false
    })
  }

  onMouseDown = (event) => {
    let startX = event.pageX - this._scroller.offsetLeft;
    let scrollLeft = this._scroller.scrollLeft;
    this.setState({ isScrolling: true, scrollLeft: scrollLeft, startX: startX });
  };

  attachScroller = (scroller) => {
    this._scroller = ReactDOM.findDOMNode(scroller);
  };

  handleShow() {
    this.setState({
      showModal: false
    });
    this.props.showModal(false);
  }

  // handles dropping a card into a turn bucket
  handleDrop = (card) => {
    card.count -= 1;
  }

  // calculates probability per bucket
  handleBucketChange = () => {

    fetch('http://localhost:3001/runeterra/calculate', {
      method: 'POST',
      body: JSON.stringify([this.state.mulligan, this.state.turn1, this.state.turn2, this.state.turn3, this.state.turn4, this.state.turn5,
      this.state.turn6, this.state.turn7, this.state.turn8, this.state.turn9, this.state.turn10]),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(res => {
        if (res.status == 'success') {
          this.setState({
            totalProbability: res.probability
          })
        }
      })
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.handleShow}>
        <div className="modal">
          <h5 className="content">Hextech Draw Simulator</h5>
          <DndProvider backend={HTML5Backend}>
            <div className="modal-bucket-container"
              ref={this.attachScroller}
              onMouseDown={this.onMouseDown}
              onScroll={this.onMouseMove}
              onMouseUp={this.onMouseUp}
              onMouseLeave={this.onMouseLeave}>
              <Turn name="Mulligan" bucket={this.state.mulligan} handleDrop={this.handleDrop} handleBucketChange={this.handleBucketChange} />
              <Turn name="Turn 1" bucket={this.state.turn1} handleDrop={this.handleDrop} handleBucketChange={this.handleBucketChange} />
              <Turn name="Turn 2" bucket={this.state.turn2} handleDrop={this.handleDrop} handleBucketChange={this.handleBucketChange} />
              <Turn name="Turn 3" bucket={this.state.turn3} handleDrop={this.handleDrop} handleBucketChange={this.handleBucketChange} />
              <Turn name="Turn 4" bucket={this.state.turn4} handleDrop={this.handleDrop} handleBucketChange={this.handleBucketChange} />
              <Turn name="Turn 5" bucket={this.state.turn5} handleDrop={this.handleDrop} handleBucketChange={this.handleBucketChange} />
              <Turn name="Turn 6" bucket={this.state.turn6} handleDrop={this.handleDrop} handleBucketChange={this.handleBucketChange} />
              <Turn name="Turn 7" bucket={this.state.turn7} handleDrop={this.handleDrop} handleBucketChange={this.handleBucketChange} />
              <Turn name="Turn 8" bucket={this.state.turn8} handleDrop={this.handleDrop} handleBucketChange={this.handleBucketChange} />
              <Turn name="Turn 9" bucket={this.state.turn9} handleDrop={this.handleDrop} handleBucketChange={this.handleBucketChange} />
              <Turn name="Turn 10" bucket={this.state.turn10} handleDrop={this.handleDrop} handleBucketChange={this.handleBucketChange} />
            </div>
            <div className="modal-probability">
              <h5>Chance</h5>
              {this.state.totalProbability.map((val, i) => {
                if (i == 0) {
                  return <div>
                    Total Probability:
                    <div>{val}</div>
                  </div>
                } else if (i == 1) {
                  return <div>
                    Mulligan:
                    <div>{val}</div>
                  </div>
                } else {
                  return <div>
                    Turn {i-1}:
                    <div>{val}</div>
                  </div>
                }
              })}
            </div>
            <div className="modal-cards">
              {this.state.deck.map((card, index) => (
                <Card key={card.cardCode + "-" + index} card={card} handleBucketChange={this.handleBucketChange} />
              ))}
            </div>
          </DndProvider>
        </div>
      </Modal>
    )
  }

}

export default DeckAnalyzer;