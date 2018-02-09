import React from 'react';
import ReactDOM from 'react-dom';
import {createStore , applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import Thunk from 'redux-thunk';
import './App.css';
import Index from './AppRoutes/RouteManager';
import {getAllPost} from './Actions/postActions';
import reducers from './Reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers , applyMiddleware(Thunk));

store.dispatch(getAllPost());
ReactDOM.render(
    <Provider store={store}>
         <Index />
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
