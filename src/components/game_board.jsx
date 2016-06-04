import React from 'react';
import GameBoardRow from './game_board_row';

const GameBoard = ({ game, onTakeTurn }) => {
  const rows = game.get('board').map((row, rowIndex) => {//jscs:ignore requireShorthandArrowFunctions
    return (<GameBoardRow
     key={rowIndex}
     row={row}
     rowIndex={rowIndex}
     onTakeTurn={onTakeTurn} />); });

  return <div className="game-board">{ rows }</div>;
};

export default GameBoard;
