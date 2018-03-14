import {Route, Switch} from 'react-router';
import React from 'react';

import LaunchHome from 'src/launchHome';

const appRoute = (
    <Switch>
        <Route path='/' component={LaunchHome}/>
    </Switch>);

export default appRoute;