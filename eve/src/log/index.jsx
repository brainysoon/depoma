import React from 'react';
import {Switch, Route} from 'react-router';
import LogPage from 'src/log/page/logPage';
import URIConstants from 'src/share/constant/uriConstants';

const Profile = () => {
    return (
        <Switch>
            <Route path={URIConstants.LOG} component={LogPage}/>
        </Switch>
    );
};

export default Profile;