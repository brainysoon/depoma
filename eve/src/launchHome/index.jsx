import React from 'react';
import {Switch, Route} from 'react-router';
import HomePage from 'src/launchHome/page/homePage';

const LaunchHome = () => {

    console.log('here');
    return (
        <Switch>
            <Route path={'/'} component={HomePage}/>
        </Switch>
    );
};

export default LaunchHome;