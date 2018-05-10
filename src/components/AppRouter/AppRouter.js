import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsAuthorize } from '../../ducks/auth';
//  Components
import PrivateRoute from '../PrivateRoute';
import Login from '../Login';
import Trade from '../Trade';

class AppRouter extends Component {

    render() {
        const { isAuthorized } = this.props;

        return (
            <Switch>
                <PrivateRoute path="/trade/:currency" component={Trade} />
                {isAuthorized && <Redirect to="/trade/btc" />}
                <Route path="/" component={Login} />
            </Switch>
        );
    }
}

const mapStateToProps = state => ({
    isAuthorized: getIsAuthorize(state)
});

const mapDispatchToProps = { };

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AppRouter)
);