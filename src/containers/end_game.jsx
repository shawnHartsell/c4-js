import React from 'react';
import { Modal, Form, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { resetGame } from '../actions';

const mapStateToProps = (state) => ({
     winner: state.get('winningPlayer')
});

class EndGame extends React.Component {
  constructor(props) {
    super(props);
    this._getWinMessage = this._getWinMessage.bind(this);
    this._onClose = this._onClose.bind(this);
  };

  render() {
    return (
      <Modal dialogClassName="end-game-modal" show={this.props.winner ? true : false}>
        <Modal.Header>
          <Modal.Title>Game Over</Modal.Title>
          <Modal.Body>
            <h4>{this._getWinMessage()}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="primary"
              bsSize="large"
              onClick={this._onClose}>
              Play Again!
            </Button>
          </Modal.Footer>
        </Modal.Header>
      </Modal>
    );
  };

  _onClose(e) {
    this.props.dispatch(resetGame());
    this.setState({showModal: false});
  }

  _getWinMessage() {
    let winningPlayerColor;

    switch (this.props.winner) {
      case 1:
        winningPlayerColor = 'Red';
        break;
      case 2:
        winningPlayerColor = 'Blue';
        break;
      default:
    }

    return winningPlayerColor ? `Congrats ${winningPlayerColor} Player, You Win!` : '';
  };
};

export default connect(mapStateToProps, null)(EndGame);
