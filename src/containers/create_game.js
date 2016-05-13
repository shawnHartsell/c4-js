
import React from 'react'
import { connect } from 'react-redux'
import { createGame } from '../actions'

class CreateGame extends React.Component {
    constructor(props) {
        super(props);
        this._handleRows = this._handleRows.bind(this);
        this._handleColumns = this._handleColumns.bind(this);
        this._createGame = this._createGame.bind(this);
    }
    
    render() {
        return <div>
                    <input type="text" defaultValue="rows" onBlur={this._handleRows} />
                    <input type="text"defaultValue="columns" onBlur={this._handleColumns} />
                    <button onClick={this._createGame(this.props.dispatch)}>create game!</button>
                </div>;
    };

    _handleRows(e) {
        this.setState( {rows: e.target.value} );
    };
    
    _handleColumns(e) {
        this.setState( {columns: e.target.value } );  
    };
    
    _createGame(dispatch) {
        let self = this;
        return () => {
            dispatch(createGame(self.state.rows, self.state.columns));
        }
    };
};

export default connect()(CreateGame)