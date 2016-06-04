import React from 'react';
import BeginGame from '../containers/begin_game';
import Game from '../containers/game';
import EndGame from '../containers/end_game';

const App = () => (
    <div>
        <BeginGame />
        <Game />
        <EndGame />
    </div>
);

export default App;
