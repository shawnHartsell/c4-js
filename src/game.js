//6x7
import {OrderedMap, List} from 'immutable'

export function createNew(rows, columns){
    var obj = {};
    
    for (var i = 0; i < rows; i++) {
        obj[i] = List().setSize(columns);
    }

    var gameGrid = OrderedMap(obj);
    return gameGrid;
}

export function executeTurn(row, column, playerId){

}

export function winner(){
    
}