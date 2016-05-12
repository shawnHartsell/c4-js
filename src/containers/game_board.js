import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    //this will be undefined the first time b/c there is no state
    console.dir(state);
    return { gameState: state };
}

class GameBoard extends React.Component {
    constructor(props){
        super(props);   
    }
    
    //todo: render game board, map click handler for cells
    render(){
        return <div></div>    
    }
};

let game =  connect(mapStateToProps, null)(GameBoard);

export default game;




