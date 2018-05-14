import React from 'react';
import {Switch, Route} from 'react-router';
import ProfilePage from 'src/profile/page/profilePage';
import URIConstants from 'src/share/constant/uriConstants';

const Profile = () => {
    return (
        <Switch>
            <Route path={URIConstants.PROFILE} component={ProfilePage}/>
        </Switch>
    );
};

export default Profile;