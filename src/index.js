import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { handleAction } from './reducers';
import App from './components/app';

let store = createStore(handleAction);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)
