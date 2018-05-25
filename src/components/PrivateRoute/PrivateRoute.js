import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getIsAuthorize } from '../../ducks/auth';

class PrivateRoute extends Component {

    render() {
        const { isAuthorized, component: Component, ...rest } = this.props;

        return (
            <Route
                { ...rest }
                render={props =>
                isAuthorized ? <Component {...props} /> : <Redirect to="/" /> }
            />
        );
    }
}

const mapStateToProps = state => ({
    isAuthorized: getIsAuthorize(state)
});

export default withRouter(
    connect(mapStateToProps)(PrivateRoute)
);