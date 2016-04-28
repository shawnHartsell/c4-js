import * as game from '../src/game';
import {expect} from 'chai';

describe('game logic', () => {
   it('can create game board', ()=>{
        let rows = 6;
        let columns = 7;
        
        var board = game.createNew(6,7);
        var entries = board.entrySeq();
        
        expect(entries.size).to.equal(rows);
        
        var hasAllColumns = entries.every(entry => {
           return entry[1].size === columns; 
        });
        
        expect(hasAllColumns).to.equal(true);
   });
});