import * as actions from '../src/actions';
import { expect } from 'chai';

describe('actions', ()=> {
  it('should create new game action', () => {
      let [rows, columns] = [6, 7];
      let expected = {
          type: actions.CREATE_GAME,
          rows: rows,
          columns: columns,
        };

      let action = actions.createGame(6, 7);
      expect(action).to.deep.equal(expected);
    });

  it('should create take turn action', () => {
      let [row, column, playerId] = [2, 3, 1];
      let expected = {
          type: actions.TAKE_TURN,
          row: row,
          column: column,
        };

      let action = actions.takeTurn(row, column, playerId);
      expect(action).to.deep.equal(expected);
    });

  it('should create reset game action', () => {
      const expected = {
        type: actions.RESET_GAME,
      };

      const action = actions.resetGame();
      expect(action).to.deep.equal(expected);
    });
});
