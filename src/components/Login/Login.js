import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
//  Particles
import Particles from 'react-particles-js';
import particlesParams from '../../assets/js/particles-params';
//  Logo
import logo from '../../assets/img/Logo.svg';
//  Components
import Input from './Input';

const formValidation = values => {
    const errors = {};
    const user = {};

    if (!values.login) {
        user.login = 'login required';
    }

    if (values.login && values.login.length < 10) {
        user.login = 'First name must be more than 10 symbols';
    }

    if (Object.keys(user).length > 0) {
        errors.user = user;
        console.log(errors)

        return errors;
    }
};

export default class Login extends Component {

    state = {
        action: 'login'
    };

    handleClick = event => {
        event.preventDefault();

        const action = this.state.action === 'login' ? 'registration' : 'login';

        this.setState({ action: action});
    };

    handleSubmit = values => {
        console.log('handleSubmit');
        console.log(values);
    };

    render() {
        const { action } = this.state;

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
                                        name="login"
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
                        <a href="#"
                            onClick={this.handleClick}>
                            {action === 'login' ? 'Регистрация' : 'Войти'}
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

//const mapStateToProps = state => ({
//    isAuthorized: getIsAuthorized(state)
//});
//
//const mapDispatchToProps = { authRequest };
//
//export default connect(
//    mapStateToProps,
//    mapDispatchToProps
//)(Login);