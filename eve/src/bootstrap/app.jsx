import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'

import AppReducer from 'src/bootstrap/reducer/appReducer';
import AppRoute from 'src/bootstrap/route/appRoute';

const history = createHistory();
const middleware = routerMiddleware(history)

const store = createStore(
    combineReducers({
        app: AppReducer,
        router: routerReducer
    }),
    applyMiddleware(middleware)
);

const App = () => {
    return <Provider store={store}>
        <ConnectedRouter history={history}>
            {AppRoute}
        </ConnectedRouter>
    </Provider>;
};

export default App;