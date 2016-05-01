import {OrderedMap, List, Map} from 'immutable'

export function createNew(rows, columns){
	var game = {};
	game.board = buildGameBoard(rows, columns);
	game.currentPlayerTurn = 1;
	game.winningPlayer = undefined;

	return Map(game);
}

export function takeTurn(game, row, column, playerId){

	var updatedGame = game.withMutations((g) => {
			g.set("currentPlayerTurn", playerId === 1 ? 2 : 1);
			g.setIn(["board",`${row}`,`${column}`], playerId);
	});

	return updatedGame;
}

function buildGameBoard(rows, columns){
	 var obj = {};

     for (var i = 0; i < rows; i++) {
        obj[i] = List().setSize(columns);
     }

     return OrderedMap(obj);
}
