import { CREATE_GAME, TAKE_TURN } from '../actions';
import * as game from '../game';

export function handleAction(state, action) {
  switch (action.type){
    case CREATE_GAME:
      return game.createNew(action.rows, action.columns);
    case TAKE_TURN:
      return game.takeTurn(state, action.row, action.column, action.playerId);
    default:
      return state;
  }
}
