import * as gameApi from '../src/game';
import chai from 'chai';
import {expect} from 'chai';
import * as R from 'ramda';

describe('game', () => {
   it('can create game', ()=>{
        let rows = 6;
        let columns = 7;
		let game = gameApi.createNew(6,7);

		expect(game.get("currentPlayerTurn")).to.equal(1);
		expect(game.get("winningPlayer")).to.not.be.ok;

		var board = game.get("board");

		expect(board.length).to.equal(rows);

        var allColumnsInitialized = R.all(column => !column);
		var hasAllColumns = R.all(row => row.length === columns && allColumnsInitialized(row));

        expect(hasAllColumns(board)).to.equal(true);
   });

   it('can take turn with no winning move', () => {
	   let game = gameApi.createNew(6,7);
	   let [row,column,playerId] = [4,4,1];

	   var state = gameApi.takeTurn(game, row, column, playerId);

	   expect(state).to.be.ok;
	   expect(state.get("currentPlayerTurn")).to.equal(2);
	   expect(state.get("board")[row][column]).to.equal(playerId);
	   expect(state.get("winningPlayer")).to.not.be.ok;
   });

  /*
  	TODO:
  	Refactor so that assert doesn't rely on array element order
	or modify data structure of getWinningPositions	*/
   it('can determine winning positions', ()=>{
	   let game = gameApi.createNew(6,7);
	   let [row,column] = [2,3];
	   let expectedPositions = {
			vertical:[
				{ row: 2, column: 3 },
				{ row: 1, column: 3 },
				{ row: 3, column: 3 },
				{ row: 0, column: 3 },
				{ row: 4, column: 3 },
				{ row: 5, column: 3 }
			],
			horizontal:[
				{ row: 2, column: 3 },
				{ row: 2, column: 2 },
				{ row: 2, column: 4 },
				{ row: 2, column: 1 },
				{ row: 2, column: 5 },
				{ row: 2, column: 0 },
				{ row: 2, column: 6 }
			],
			diagonal:[
				{ row: 2, column: 3 },
				{ row: 1, column: 2 },
				{ row: 3, column: 4 },
				{ row: 0, column: 1 },
				{ row: 4, column: 5 },
				{ row: 5, column: 6 }
			]
		};

	   let positions = gameApi.getWinningPositions(game.get("size"), row, column);
	   expect(positions).to.deep.equal(expectedPositions);
   });

   //TODO: need to test against larger, more relaistics boards
   //I bet there are edge cases
   it('can determine super naive vertical win', ()=>{
	   let game = gameApi.createNew(4,1);
	   game = gameApi.takeTurn(game, 0, 0, 1);
	   game = gameApi.takeTurn(game, 1, 0, 1);
	   game = gameApi.takeTurn(game, 2, 0, 1);
	   game = gameApi.takeTurn(game, 3, 0, 1);

	   let positions = gameApi.getWinningPositions(game.get("size"), 3, 0, 1);
	   let isWin = gameApi.isVerticalWin(game.get("board"), positions.vertical, 1);
	   expect(isWin).to.equal(true);
   });
   
   it('can determine somewhat realistic horizontal win', ()=>{
	  let game = gameApi.createNew(1,7);
	  game = gameApi.takeTurn(game, 0, 0, 1);
	  game = gameApi.takeTurn(game, 0, 1, 2);
	  game = gameApi.takeTurn(game, 0, 3, 1);
	  game = gameApi.takeTurn(game, 0, 4, 1);
	  game = gameApi.takeTurn(game, 0, 5, 1);
	  game = gameApi.takeTurn(game, 0, 6, 2);
	  game = gameApi.takeTurn(game, 0, 2, 1);
	  
	 let positions = gameApi.getWinningPositions(game.get("size"), 0, 2, 1);
	 let isWin = gameApi.isHorizontalWin(game.get("board"), positions.horizontal, 1);
	 expect(isWin).to.equal(true); 
   });
});
