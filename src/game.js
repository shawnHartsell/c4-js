import {OrderedMap, List, Map} from 'immutable'

export function createNew(rows, columns){
	var game = {};
	game.board = buildGameBoard(rows, columns);
	game.currentPlayerTurn = 1;
	game.winningPlayer = undefined;

	return Map(game);
}

//TODO: make use of Immutable.js helper methods for the mutations
export function takeTurn(game, row, column, playerId){
	var board = game.get("board");
	var boardRow = board.get(`${row}`);
	var updatedBoardRow = boardRow.set(`${column}`,playerId);
	var updatedBoard = board.set(`${row}`,updatedBoardRow);

	var updatedGame = game.set("currentPlayerTurn", playerId === 1 ? 2 : 1);
	var updatedGame2 = updatedGame.set("board",updatedBoard);

	return updatedGame2;
}

function buildGameBoard(rows, columns){
	 var obj = {};

     for (var i = 0; i < rows; i++) {
        obj[i] = List().setSize(columns);
     }

     return OrderedMap(obj);
}
