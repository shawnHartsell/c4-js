import React from 'react';
import { connect } from 'react-redux';
import { takeTurn } from '../actions';

const mapStateToProps = (state) => (
  { gameState: state }
);

const mapDispatchToProps = (dispatch) => (
  {
    onCellClick: (row, column, currentPlayerTurn) => {
      dispatch(takeTurn(row, column, currentPlayerTurn));
    },
  }
);

//TODO: Do something if a win or tie is determined
class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this._createBoardRow = this._createBoardRow.bind(this);
  }

  //todo: render game board, map click handler for cells
  render() {
    let gameState = this.props.gameState;
    let gameBoard = [];

    if (gameState && gameState.has('board')) {
      gameBoard = gameState.get('board').map(this._createBoardRow);
    }

    return <div> { gameBoard } </div>;
  }

  //todo: keys, and row/column ids might need to be descending
  //todo: break down into separate stateless component(s)?
  //todo: add classes for css
  //todo: disable once cell is occupied
  _createBoardRow(row, rowIndex) {
    return (
        <div key={rowIndex}> {
            row.map((playerId, columnIndex) => {
                let key = rowIndex + ':' + columnIndex;
                return (<button
                            key={key}
                            playerId={playerId}
                            row={rowIndex}
                            column={columnIndex}
                            onClick={() =>
                                this.props.onCellClick(rowIndex,
                                columnIndex,
                                this.props.gameState.get('currentPlayerTurn')) }>
                           </button>);
              })
        }
            </div>
    );
  }

  _takeTurn(dispatch, row, column) {
    let _this = this;
    return () => {
        dispatch(takeTurn(row, column, _this.props.gameState.get('currentPlayerTurn')));
      };
  }
}

let game =  connect(mapStateToProps, mapDispatchToProps)(GameBoard);

export default game;

