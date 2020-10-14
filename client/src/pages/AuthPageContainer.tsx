import React from 'react';
import { Route } from 'react-router-dom';
// Page Components
import Home from './Home';
import Learn from './Learn';
import Account from './Account';

const AuthPageContainer = () => {
    return (
        <>
            <Route path="/learn">
                <Learn />
            </Route>
            <Route path="/account">
                <Account />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
        </>
    )
}

export default AuthPageContainer;