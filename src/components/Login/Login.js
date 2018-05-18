import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
//  Ducks
import { authRequest, getIsAuthorize, getAuthError } from '../../ducks/auth';
import { registrationRequest, getIsRegistered, getRegError } from '../../ducks/registration';
//  Particles
import Particles from 'react-particles-js';
import particlesParams from '../../assets/js/particles-params';
//  Logo
import logo from '../../assets/img/Logo.svg';
//  Components
import Input from './Input';
import Error from '../Error';

const formValidation = values => {
    //const errors = {};
    //const user = {};
    //
    //if (!values.email) {
    //    user.email = 'login required';
    //}
    //
    //if (values.email && values.email.length < 10) {
    //    user.email = 'First name must be more than 10 symbols';
    //}
    //
    //if (Object.keys(user).length > 0) {
    //    errors.user = user;
    //
    //    return errors;
    //}
};

export class Login extends Component {

    state = {
        action: 'login'
    };

    handleClick = event => {
        const action = this.state.action === 'login' ? 'registration' : 'login';

        event.preventDefault();
        this.setState({ action: action});
    };

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
        const { loginError, regError } = this.props;

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
                        <a href=""
                            onClick={this.handleClick}>
                            {action === 'login' ? 'Регистрация' : 'Войти'}
                        </a>
                    </div>
                </div>
            </div>
        )
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