import * as gameApi from '../src/game';
import chai from 'chai';
import {expect} from 'chai';

describe('game', () => {
   it('can create game', ()=>{
        let rows = 6;
        let columns = 7;
		let game = gameApi.createNew(6,7);

		expect(game.get("currentPlayerTurn")).to.equal(1);
		expect(game.get("winningPlayer")).to.not.be.ok;

		var board = game.get("board");
		var boardRows = board.entrySeq();

        expect(boardRows.size).to.equal(rows);

        var hasAllColumns = boardRows.every(entry => {
           return entry[1].size === columns;
        });

        expect(hasAllColumns).to.equal(true);
   });

   it('can take turn with no winning move', () => {
	   let game = gameApi.createNew(6,7);
	   let [row,column,playerId] = [4,4,1];

	   var state = gameApi.takeTurn(game, row, column, playerId);

	   expect(state).to.be.ok;
	   expect(state.get("currentPlayerTurn")).to.equal(2);
	   expect(state.get("board").get(`${row}`).get(`${column}`)).to.equal(playerId);
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
				{ row: 1, column: 3 },
				{ row: 3, column: 3 },
				{ row: 0, column: 3 },
				{ row: 4, column: 3 },
				{ row: 5, column: 3 }
			],
			horizontal:[
				{ row: 2, column: 2 },
				{ row: 2, column: 4 },
				{ row: 2, column: 1 },
				{ row: 2, column: 5 },
				{ row: 2, column: 0 },
				{ row: 2, column: 6 }
			],
			diagonal:[
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
});
