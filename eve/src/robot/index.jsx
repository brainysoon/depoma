import React from 'react';
import {Switch, Route} from 'react-router';
import RobotPage from 'src/robot/page/robotPage';

const Robot = () => {
    return (
        <Switch>
            <Route path={'/robot'} component={RobotPage}/>
        </Switch>
    );
};

export default Robot;