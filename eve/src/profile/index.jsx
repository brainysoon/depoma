import React from 'react';
import {Switch, Route} from 'react-router';
import HomePage from 'src/profile/page/homePage';
import URIConstants from 'src/share/constant/uriConstants';

const Profile = () => {
    return (
        <Switch>
            <Route path={URIConstants.PROFILE} component={HomePage}/>
        </Switch>
    );
};

export default Profile;