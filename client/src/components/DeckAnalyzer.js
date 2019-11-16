import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

class DeckAnalyzer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deck: [],
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
        <div> hi </div>
      </Modal>
    )
  }

}

export default DeckAnalyzer;