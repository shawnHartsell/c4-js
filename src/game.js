import {OrderedMap, List, Map} from 'immutable'
import * as R from 'ramda';

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
	let curMove = {row: lastMoveRow, column: lastMoveColumn};
	let maxRowIndex = gameSize.maxRowIndex;
	let maxColumnIndex = gameSize.maxColumnIndex;

	let positions = {
		vertical: [],
		horizontal: [],
		diagonal: []
	};

	//add the current move to each position collection
	positions.vertical.push(curMove);
	positions.horizontal.push(curMove);
	positions.diagonal.push(curMove);

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

//TODO: Make this more concise
//TODO: Can probably generalize the math for each calculation
export function isVerticalWin(gameBoard, positions, playerId) {

	//sort the positions in descending order
	var sortedPositions = R.sort((a,b) => b.row - a.row, positions);

	/* example
	{ row: 5, column: 3 }
	{ row: 4, column: 3 }
	{ row: 3, column: 3 }
	{ row: 2, column: 3 }
	{ row: 1, column: 3 }
	{ row: 0, column: 3 }
	 */

	//get the positions that the player occupies
	var isMatch = p => gameBoard[p.row][p.column] === playerId;
	var occupiedPositions = R.filter(isMatch, sortedPositions);

	// if the player doesn't occupy 4 positions then they did not win
	if(occupiedPositions < 4){
		return false;
	}

	//if there are 4 and the distance between each position is one there are 4 in a row
	//TODO: if this works, take advantage of R.reduced continuation to short circuit the iteration
	let reducer = (result, curPos) => {
		if(result.prevPos){
			result.distance = result.prevPos.row - curPos.row;
			result.prev = curPos;
		}
		else {
			result.prevPos = curPos;
		}

		return result;
	};

	var result = R.reduce(reducer, { distance: 0 }, occupiedPositions);
	return result.distance === 1;
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
