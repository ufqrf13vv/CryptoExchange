import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getIsAuthorize } from '../../ducks/auth';
import { getUserInfoRequest, getUserInfo } from '../../ducks/user';
import { fetchBtcRequest, fetchEthRequest } from '../../ducks/currency';

class PrivateRoute extends Component {

    componentDidMount() {
        this.props.getUserInfoRequest();
        this.props.fetchBtcRequest('4h');
        this.props.fetchEthRequest('4h');
    }

    render() {
        const { isAuthorized, userInfo, component: Component, ...rest } = this.props;

        return (
            <Route
                { ...rest }
                render={props =>
                isAuthorized ? <Component user={userInfo} {...props} /> : <Redirect to="/" /> }
            />
        );
    }
}

const mapStateToProps = state => ({
    isAuthorized: getIsAuthorize(state),
    userInfo: getUserInfo(state)
});

const mapDispatchToProps = { getUserInfoRequest, fetchBtcRequest, fetchEthRequest };

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
);