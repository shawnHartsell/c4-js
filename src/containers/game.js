import { connect } from 'react-redux';
import { takeTurn } from '../actions';
import GameBoard from '../components/game_board';

const mapStateToProps = (state) => {
  console.dir('in container');
  console.dir(state.get('board'));
  return { game: state.get('board') };
};

const mapDispatchToProps = (dispatch) => (
  {
    onTakeTurn: (row, column) => { dispatch(takeTurn(row, column)); },
  }
);

const Game = connect(mapStateToProps, mapDispatchToProps)(GameBoard);

export default Game;
