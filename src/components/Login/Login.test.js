import React, { Component } from 'react';
import Input from './Input';
import { Login } from './Login';
import { shallow, render } from 'enzyme';

describe('Компонент Login', () => {
    const shallowWrapper = shallow(<Login />);
    const renderWrapper = render(<Login />);

    describe('Верстка', () => {
        it('Главное окно формы регистрации/авторизации', () => {
            const mainLogin = renderWrapper.find('.main__login');

            expect(mainLogin).toHaveLength(1);
        });

        it('ReactFinalForm пристутствует', () => {
            const modal = shallowWrapper.find('ReactFinalForm');

            expect(modal).toHaveLength(1);
        });

        it('Инпут для ввода логина(email)', () => {
            const email = renderWrapper.find('input[name="email"]');

            expect(email).toHaveLength(1);
        });

        it('Инпут для ввода пароля(password)', () => {
            const password = renderWrapper.find('input[name="password"]');

            expect(password).toHaveLength(1);
        });

        it('Кнопка отправки данных(submit)', () => {
            const submit = renderWrapper.find('button[type="submit"]');

            expect(submit).toHaveLength(1);
        });
    });

    describe('Методы', () => {
        it('handleClick', () => {
            expect(shallowWrapper.instance().handleClick).toBeDefined();
        });

        it('handleSubmit', () => {
            expect(shallowWrapper.instance().handleSubmit).toBeDefined();
        });
    });

    describe('Состояние', () => {
        it('State содержит поле action', () => {
            expect(shallowWrapper.state().action).toBeDefined();
        });

        it('State.action по-умолчанию = login', () => {
            expect(shallowWrapper.state().action).toEqual('login');
        });

        it('Регистрация (state = registration)', () => {
            shallowWrapper.setState({action: 'registration'});
            shallowWrapper.update();

            expect(shallowWrapper.find('.main__footer').contains(<a class="link" href="">Регистрация</a>)).toEqual(false);
        });
    });
});