import {Route, Switch} from 'react-router';
import React from 'react';
import URIConstants from 'src/share/constant/uriConstants';

import Profile from 'src/profile';
import Robot from 'src/robot';
import Log from 'src/log';
import Content from 'src/content';
import SettingPage from "src/extra/page/settingPage";
import FeedbackPage from "src/extra/page/feedbackPage";
import AboutPage from "src/extra/page/aboutPage";

const appRoute = (
    <Switch>
        <Route exact path={URIConstants.PROFILE} component={Profile}/>
        <Route path={URIConstants.CONTENT} component={Content}/>
        <Route path={URIConstants.ROBOT} component={Robot}/>
        <Route path={URIConstants.LOG} component={Log}/>
        <Route path={URIConstants.SETTING} component={SettingPage}/>
        <Route path={URIConstants.FEEDBACK} component={FeedbackPage}/>
        <Route path={URIConstants.ABOUT} component={AboutPage}/>
    </Switch>);

export default appRoute;