import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import QRScanDialog from 'src/share/component/qrScanDialog';

import AppReducer from 'src/bootstrap/reducer/appReducer';
import AppRoute from 'src/bootstrap/route/appRoute';

const history = createHistory();
const middleware = routerMiddleware(history);
const composeEnhancer = composeWithDevTools({});

const store = createStore(
    combineReducers({
        app: AppReducer,
        router: routerReducer
    }),
    composeEnhancer(applyMiddleware(middleware))
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