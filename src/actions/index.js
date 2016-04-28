export const CREATE_GAME = 'CREATE_GAME';
export const TAKE_TURN = 'TAKE_TURN';

export const createGame = (rows, columns) => {
    return {
        type: CREATE_GAME,
        rows: rows,
        columns: columns
    };
}

export const takeTurn = (row, column, playerId) => {
    return {
        type: TAKE_TURN,
        playerId: playerId,
        row: row,
        column: column
    };
}