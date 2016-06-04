import { connect } from 'react-redux';
import { takeTurn } from '../actions';
import GameBoard from '../components/game_board';

const mapStateToProps = (state) => {//jscs:ignore requireShorthandArrowFunctions
  return { game: state };
};

const mapDispatchToProps = (dispatch) => (
  {
    onTakeTurn: (row, column) => { dispatch(takeTurn(row, column)); },
  }
);

const Game = connect(mapStateToProps, mapDispatchToProps)(GameBoard);

export default Game;
