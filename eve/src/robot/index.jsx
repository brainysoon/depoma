import React from 'react';
import {Switch, Route} from 'react-router';
import RobotPage from 'src/robot/page/robotPage';
import URIConstants from 'src/share/constant/uriConstants';

const Robot = () => {
    return (
        <Switch>
            <Route path={URIConstants.ROBOT} component={RobotPage}/>
        </Switch>
    );
};

export default Robot;