import React from 'react';
import {Switch, Route} from 'react-router';
import HomePage from 'src/profile/page/homePage';

const Profile = () => {
    return (
        <Switch>
            <Route path={'/'} component={HomePage}/>
        </Switch>
    );
};

export default Profile;