import React from 'react';
import {Switch, Route} from 'react-router';
import ContentPage from 'src/content/page/contentPage';
import URIConstants from 'src/share/constant/uriConstants';

const Content = () => {
    return (
        <Switch>
            <Route path={URIConstants.CONTENT} component={ContentPage}/>
        </Switch>
    );
};

export default Content;