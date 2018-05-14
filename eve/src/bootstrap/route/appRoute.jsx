import {Route, Switch} from 'react-router';
import React from 'react';
import URIConstants from 'src/share/constant/uriConstants';

import Profile from 'src/profile';
import Robot from 'src/robot';
import Log from 'src/log';
import Content from 'src/content';

const appRoute = (
    <Switch>
        <Route exect path={URIConstants.HOME} component={Profile}/>
        <Route path={URIConstants.CONTENT} component={Content}/>
        <Route path={URIConstants.ROBOT} component={Robot}/>
        <Route path={URIConstants.LOG} component={Log}/>
    </Switch>);

export default appRoute;