import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import { authRequest, getIsAuthorize, getAuthError } from '../../ducks/auth';
import { registrationRequest, getIsRegistered, getRegError } from '../../ducks/registration';

import Particles from 'react-particles-js';
import particlesParams from '../../assets/js/particles-params';

import logo from '../../assets/img/Logo.svg';

import Input from './Input';
import Error from '../Error';

const formValidation = values => {

};

export class Login extends Component {

    state = {
        action: 'login'
    };

    /**
     * Change form state (login/registration)
     */
    handleClick = event => {
        const action = this.state.action === 'login' ? 'registration' : 'login';

        event.preventDefault();
        this.setState({ action: action});
    };

    /**
     * Submit form
     */
    handleSubmit = values => {
        const { action } = this.state;

        if (action === 'login') {
            this.props.authRequest(values);
        } else {
            this.props.registrationRequest(values);
        }
    };

    render() {
        const { action } = this.state;
        const { loginError, regError, isAuthorize } = this.props;

        if (isAuthorize) {
            return <Redirect to="/trade/btc" />
        } else {
            return (
                <div className="main">
                    <Particles
                        className="main__particles"
                        params={particlesParams}
                    />
                    <div className="main__login">
                        <div className="main__logo">
                            <img src={logo} alt="j-trade"/>
                        </div>
                        <Form
                            onSubmit={this.handleSubmit}
                            validate={formValidation}
                            render={({ handleSubmit }) => (
                                <form
                                    className="modal"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="input-text__wrapper input-text__wrapper--login">
                                        <Field
                                            name="email"
                                            component={Input}
                                            placeholder="email"
                                            type="email"
                                        />
                                    </div>
                                    <div className="input-text__wrapper input-text__wrapper--password">
                                        <Field
                                            name="password"
                                            component={Input}
                                            placeholder="password"
                                            type="password"
                                        />
                                    </div>
                                    {action === 'login' && loginError ? (
                                        <Error isError="true" errorText={loginError} />
                                    ):(
                                        <Error isError="true" errorText={regError} />
                                    )}
                                    <button className="submit" type="submit">
                                        {action === 'login' ? 'Войти' : 'Зарегистрироваться'}
                                    </button>
                                </form>
                            )}
                        />
                        <div className="main__footer">
                            {action === 'login' ?
                                'Впервые на сайте? ' :
                                'Уже зарегистрированы? '}
                            <a className="link" href=""
                                onClick={this.handleClick}>
                                {action === 'login' ? 'Регистрация' : 'Войти'}
                            </a>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    isAuthorize: getIsAuthorize(state),
    loginError: getAuthError(state),
    isRegister: getIsRegistered(state),
    regError: getRegError(state)
});

const mapDispatchToProps = { authRequest, registrationRequest };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);