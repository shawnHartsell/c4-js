export const CREATE_GAME = 'CREATE_GAME';
export const TAKE_TURN = 'TAKE_TURN';
export const RESET_GAME = 'RESET_GAME';

export const createGame = (rows, columns) => ({
    type: CREATE_GAME,
    rows: rows,
    columns: columns,
  });

export const takeTurn = (row, column) => ({
        type: TAKE_TURN,
        row: row,
        column: column,
      });

export const resetGame = () => ({
    type: RESET_GAME,
  });
