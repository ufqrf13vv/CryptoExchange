import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getTokenFromLocalStorage } from '../../helpers/localStorage';

export default class PrivateRoute extends Component {

    render() {
        const { component: Component, ...rest } = this.props;
        const token = getTokenFromLocalStorage();

        return (
            <Route
                {...rest}
                render={props =>
                token ? <Component {...props} /> : <Redirect to="/" /> }
            />
        );
    }
}