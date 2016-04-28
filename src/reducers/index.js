import {CREATE_GAME} from '../actions';
import * as game from '../game';

export function handleAction(state, action){
    switch (action.type){
        case CREATE_GAME:
            return game.createNew(action.rows, action.columns);
        default:
            return state;
    }
}