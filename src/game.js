import {OrderedMap, List, Map} from 'immutable'

export function createNew(rows, columns){
	var game = {};
	game.board = buildGameBoard(rows, columns);
	game.currentPlayerTurn = 1;
	game.winningPlayer = undefined;
	game.size = {maxRowIndex: rows - 1, maxColumnIndex: columns - 1};

	return Map(game);
}

export function takeTurn(game, row, column, playerId){

	var updatedGame = game.withMutations((g) => {
			let board = g.get("board");
			board[row][column] = playerId;

			g.set("board", board);
			g.set("currentPlayerTurn", playerId === 1 ? 2 : 1);
	});

	return updatedGame;
}

export function getWinningPositions(gameSize, lastMoveRow, lastMoveColumn, playerId){
	let maxRowIndex = gameSize.maxRowIndex;
	let maxColumnIndex = gameSize.maxColumnIndex;

	let positions = {
		vertical: [],
		horizontal: [],
		diagonal: []
	};

	for(var i = 1; i <= 3; i++){
		let isPrevRowValid = (lastMoveRow - i >= 0);
		let isNextRowValid = (lastMoveRow + i <= maxRowIndex);
		let isPrevColumnValid = (lastMoveColumn - i >= 0);
		let isNextColumnValid = (lastMoveColumn + i <= maxColumnIndex);

		//vertial winning postions
		if(isPrevRowValid){
			positions.vertical.push({row: lastMoveRow - i, column: lastMoveColumn});
		}

		if(isNextRowValid){
			positions.vertical.push({row: lastMoveRow + i, column: lastMoveColumn});
		}

		//horizontal winning positions
		if(isPrevColumnValid){
			positions.horizontal.push({row: lastMoveRow, column: lastMoveColumn - i});
		}

		if(isNextColumnValid){
			positions.horizontal.push({row: lastMoveRow, column: lastMoveColumn + i});
		}

		//diagonal winning positions
		if(isPrevRowValid && isPrevColumnValid){
			positions.diagonal.push({row: lastMoveRow - i, column: lastMoveColumn - i});
		}

		if(isNextRowValid && isNextColumnValid){
			positions.diagonal.push({row: lastMoveRow + i, column: lastMoveColumn + i});
		}
	}

	return positions;

}

function buildGameBoard(rows, columns){
	 var board = [];

     for (var i = 0; i < rows; i++) {
    	var row = [];
		for(var j = 0; j < columns; j++) {
			row.push(0);
		}
		board.push(row);
     }

     return board;
}
