import { CREATE_GAME, TAKE_TURN, RESET_GAME } from '../actions';
import * as game from '../game';

let initialState = game.init();

export function handleAction(state = initialState, action) {
  switch (action.type){
    case CREATE_GAME:
      return game.createNew(action.rows, action.columns);
    case TAKE_TURN:
      return game.takeTurn(state, action.row, action.column);
    case RESET_GAME:
      return game.init();
    default:
      return state;
  }
}
