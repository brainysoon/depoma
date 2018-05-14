import {Route, Switch} from 'react-router';
import React from 'react';

import Profile from 'src/profile';

const appRoute = (
    <Switch>
        <Route path='/' component={Profile}/>
    </Switch>);

export default appRoute;