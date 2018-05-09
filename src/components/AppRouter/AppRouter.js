import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//import { logout, getIsAuthorized } from '../../ducks/auth';
//import { getNetworkError } from '../../ducks/network';
//  Components
import PrivateRoute from '../PrivateRoute';
import Login from '../Login';

export default class AppRouter extends Component {

    render() {
        return (
            <div className="app">
                <Switch>
                    <Route path="/" component={Login} />
                </Switch>
            </div>
        )
    }
}

//const mapStateToProps = state => ({
//    isAuthorized: getIsAuthorized(state),
//    networkError: getNetworkError(state)
//});
//
//const mapDispatchToProps = {logout};
//
//export default withRouter(
//    connect(mapStateToProps, mapDispatchToProps)(AppRouter)
//);