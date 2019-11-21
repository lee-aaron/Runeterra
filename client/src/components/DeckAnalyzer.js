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
      isScrolling: false
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
    if ( !this.state.isScrolling ) return;
    const x = event.pageX - this._scroller.offsetLeft;
    const walk = (x - this.state.startX) * 1.5;
    if ( !walk || !x ) return;
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

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.handleShow}>
        <div className="modal">
          <h5 className="content">Card Simulator</h5>
          <DndProvider backend={HTML5Backend}>
            <div className="modal-bucket-container" 
              ref={this.attachScroller}
              onMouseDown={this.onMouseDown}
              onScroll={this.onMouseMove}
              onMouseUp={this.onMouseUp}
              onMouseLeave={this.onMouseLeave}>
              <Turn name="Turn 1" bucket={this.state.turn1} handleDrop={this.handleDrop} />
              <Turn name="Turn 2" bucket={this.state.turn2} handleDrop={this.handleDrop} />
              <Turn name="Turn 3" bucket={this.state.turn3} handleDrop={this.handleDrop} />
              <Turn name="Turn 4" bucket={this.state.turn4} handleDrop={this.handleDrop} />
              <Turn name="Turn 5" bucket={this.state.turn5} handleDrop={this.handleDrop} />
              <Turn name="Turn 6" bucket={this.state.turn6} handleDrop={this.handleDrop} />
              <Turn name="Turn 7" bucket={this.state.turn7} handleDrop={this.handleDrop} />
              <Turn name="Turn 8" bucket={this.state.turn8} handleDrop={this.handleDrop} />
              <Turn name="Turn 9" bucket={this.state.turn9} handleDrop={this.handleDrop} />
              <Turn name="Turn 10" bucket={this.state.turn10} handleDrop={this.handleDrop} />
            </div>
            <div className="modal-cards">
              {this.state.deck.map((card, index) => (
                <Card key={card.cardCode + "-" + index} card={card} />
              ))}
            </div>
          </DndProvider>
        </div>
      </Modal>
    )
  }

}

export default DeckAnalyzer;