import React from 'react';
import { Modal, Form, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { resetGame } from '../actions';

const mapStateToProps = (state) => ({
     winner: state.get('winningPlayer'),
     remainingTurns: state.get('remainingTurns'),
});

class EndGame extends React.Component {
  constructor(props) {
    super(props);
    this._getMessage = this._getMessage.bind(this);
    this._onClose = this._onClose.bind(this);
  };

  render() {
    return (
      <Modal dialogClassName="end-game-modal" show={ this.props.winner || !this.props.remainingTurns ? true : false}>
        <Modal.Header>
          <Modal.Title>Game Over</Modal.Title>
          <Modal.Body>
            <h4>{this._getMessage()}</h4>
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

  _getMessage() {
    const remainingTurns = this.props.remainingTurns;
    const winner = this.props.winner;
    let winningPlayerColor;

    if(remainingTurns && !winner) {
      return '';
    }

    if(!(remainingTurns || winner)) {
      return 'Good Job! The Game Ended In A Tie! Both Players Win!'
    }

    const playerWinMsg = winner === 1 ? 'Red Player' : 'Blue Player';
    return `Good Job ${playerWinMsg}! You Win!`
  };
};

export default connect(mapStateToProps, null)(EndGame);
