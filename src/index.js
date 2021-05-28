import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//store
import { createStore } from 'redux';
import myReducer from './reducers/index';
import { Provider } from 'react-redux';

const store = createStore(myReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// window .__ là extension quản lý redux trên chrome. bỏ đi cũng được
ReactDOM.render( <
    Provider store = { store } >
    <
    App / >
    <
    /Provider>,
    document.getElementById('root')
);