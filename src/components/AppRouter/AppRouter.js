import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute';
import Login from '../Login';
import TradePage from '../Pages/TradePage';
import FeedPage from '../Pages/FeedPage';
import ProfilePage from '../Pages/ProfilePage';

export default class AppRouter extends Component {

    render() {
        return (
            <Switch>
                <PrivateRoute path="/trade/:currency" exact component={TradePage} />
                <PrivateRoute path="/profile" exact component={ProfilePage} />
                <PrivateRoute path="/feed" exact component={FeedPage} />
                <Route path="/" exact component={Login} />
            </Switch>
        );
    }
}