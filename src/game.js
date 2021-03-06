import { OrderedMap, List, Map } from 'immutable';
import * as R from 'ramda';
import * as math from 'mathjs';

export const init = () => (
    Map({
      board: buildGameBoard(0, 0),
      currentPlayerTurn: 1,
      winningPlayer: undefined,
      size: { maxRowIndex: 0, maxColumnIndex: 0 },
      remainingTurns: 1, //sentinal to prevent end game dialog from rendering on init
      isInit: true,
    })
);

export const createNew = (rows, columns) => (
  Map({
    board: buildGameBoard(rows, columns),
    currentPlayerTurn: 1,
    winningPlayer: undefined,
    size: { maxRowIndex: rows - 1, maxColumnIndex: columns - 1 },
    isInit: false,
    remainingTurns: (rows * columns),
  })
);

export const takeTurn = (game, row, column) => (
  game.withMutations((g) => {
    const board = g.get('board');
    const curPlayerTurn = game.get('currentPlayerTurn');
    const curRemainingTurns = game.get('remainingTurns');

    const isWin = R.pipe(
      R.curry(getWinningPositions),
      R.mapObjIndexed((positions, direction, obj) =>
        calculateWin(g.get('board'), positions, curPlayerTurn, winStrategies[direction])),
      R.values,
      R.any(a => a === true)
    );

    board[row][column] = curPlayerTurn;
    g.set('board', board);
    g.set('currentPlayerTurn', curPlayerTurn === 1 ? 2 : 1);
    g.set('remainingTurns', curRemainingTurns - 1);
    g.set('winningPlayer', isWin(game.get('size'), row, column, curPlayerTurn) ? curPlayerTurn : undefined);
  })
);

export const getWinningPositions = (gameSize, lastMoveRow, lastMoveColumn, playerId) => {
  const curMove = { row: lastMoveRow, column: lastMoveColumn };
  const maxRowIndex = gameSize.maxRowIndex;
  const maxColumnIndex = gameSize.maxColumnIndex;

  const positions = {
    vertical: [],
    horizontal: [],
    diagonal: [],
  };

  //add the current move to each position collection
  positions.vertical.push(curMove);
  positions.horizontal.push(curMove);
  positions.diagonal.push(curMove);

  for (var i = 1; i <= 3; i++) {
    let isPrevRowValid = (lastMoveRow - i >= 0);
    let isNextRowValid = (lastMoveRow + i <= maxRowIndex);
    let isPrevColumnValid = (lastMoveColumn - i >= 0);
    let isNextColumnValid = (lastMoveColumn + i <= maxColumnIndex);

    //vertial winning postions
    if (isPrevRowValid) {
      positions.vertical.push({ row: lastMoveRow - i, column: lastMoveColumn });
    }

    if (isNextRowValid) {
      positions.vertical.push({ row: lastMoveRow + i, column: lastMoveColumn });
    }

    //horizontal winning positions
    if (isPrevColumnValid) {
      positions.horizontal.push({ row: lastMoveRow, column: lastMoveColumn - i });
    }

    if (isNextColumnValid) {
      positions.horizontal.push({ row: lastMoveRow, column: lastMoveColumn + i });
    }

    //diagonal winning positions
    if (isPrevRowValid && isPrevColumnValid) {
      positions.diagonal.push({ row: lastMoveRow - i, column: lastMoveColumn - i });
    }

    if (isPrevRowValid && isNextColumnValid) {
      positions.diagonal.push({ row: lastMoveRow - i, column: lastMoveColumn + i });
    }

    if (isNextRowValid && isPrevColumnValid) {
      positions.diagonal.push({ row: lastMoveRow + i, column: lastMoveColumn - i });
    }

    if (isNextRowValid && isNextColumnValid) {
      positions.diagonal.push({ row: lastMoveRow + i, column: lastMoveColumn + i });
    }
  }

  return positions;
};

const winStrategies = {
  horizontal: {
    type: 'horizontal',
    sortFn: (a, b) => b.column - a.column,
    isAdjacent: (curPos, nextPos) => curPos.column - nextPos.column === 1,
  },
  vertical: {
        type: 'vertical',
        sortFn: (a, b) => b.row - a.row,
        isAdjacent: (curPos, nextPos) => curPos.row - nextPos.row === 1,
      },
  diagonal: {
    type: 'diagonal',
    sortFn: (a, b) => b.row - a.row,
    isAdjacent: (curPos, nextPos) => {
      const rowDistance = curPos.row - nextPos.row;
      //hacky: sorting is only done by row so there could be a good chance
      //that cur's columns is less than nextPositions (ex. [5,0] and [4,1])
      const columnDistance = math.abs(curPos.column - nextPos.column);
      return rowDistance === 1 && columnDistance === 1;
    },
  },
};

const calculateWin = (gameBoard, positions, player, winStrategy) => {

    const calculateAdjacentPos = (occupiedPos) => {

      const reducer = (result, curPos) => {
        //no-op if at the last occupied position

        if (result.curIndex !== occupiedPos.length - 1) {
          let nextPos = occupiedPos[result.curIndex + 1];
          if (winStrategy.isAdjacent(curPos, nextPos)) {
            result.adjacentPositions++;
          }

          result.curIndex++;
        }

        return result;
      };

      return R.reduce(reducer, { adjacentPositions: 1, curIndex: 0 }, occupiedPos).adjacentPositions;
    };

    const isWin = R.pipe(
      R.sort(winStrategy.sortFn),
      R.filter(pos => gameBoard[pos.row][pos.column] === player),
      calculateAdjacentPos,
      adjacentPos => adjacentPos === 4);

    return isWin(positions);
  };

const buildGameBoard = (rows, columns) => {
  let board = [];

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (var j = 0; j < columns; j++) {
      row.push(0);
    }

    board.push(row);
  }

  return board;
};
