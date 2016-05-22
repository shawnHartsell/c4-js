import React from 'react';
import GameBoardRow from './game_board_row';

const GameBoard = ({ game, onTakeTurn }) => {
  console.dir('in board');
  console.dir(game);
  const rows = game.map((row, rowIndex) => { //jscs:ignore requireShorthandArrowFunctions
    return (<GameBoardRow
     key={rowIndex}
     row={row}
     rowIndex={rowIndex}
     onTakeTurn={onTakeTurn} />); });

  return <div>{ rows }</div>;
};

export default GameBoard;
