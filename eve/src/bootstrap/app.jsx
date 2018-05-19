import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import QRScanDialog from 'src/share/component/qrScanDialog';
import axiosMiddleware from 'redux-axios-middleware';
import {SERVER_API_BASE_URL} from 'src/share/constant/configConstants';
import axios from 'axios';
import thunk from 'redux-thunk';
import AppReducer from 'src/bootstrap/reducer/appReducer';
import AppRoute from 'src/bootstrap/route/appRoute';

const history = createHistory();
const composeEnhancer = composeWithDevTools({});

const client = axios.create({
    baseURL: SERVER_API_BASE_URL,
    responseType: 'json'
});

const store = createStore(
    combineReducers({
        app: AppReducer,
        router: routerReducer
    }),
    composeEnhancer(applyMiddleware(
        thunk,
        routerMiddleware(history),
        axiosMiddleware(client)),
    )
);

const App = () => {
    return <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                {AppRoute}
                <QRScanDialog/>
            </div>
        </ConnectedRouter>
    </Provider>;
};

export default App;