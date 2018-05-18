import React, { Component } from 'react';
import Input from './Input';
import { Login } from './Login';
import { shallow } from 'enzyme';

describe('Компонент Login', () => {
    const wrapper = shallow(<Login />);

    describe('Верстка', () => {
        it('Главное окно формы регистрации/авторизации', () => {
            const mainLogin = wrapper.find('.main__login');

            expect(mainLogin).toHaveLength(1);
        });

        it('Login пользователя', () => {
            const modal = wrapper.find('.modal');

            //expect(modal).toHaveLength(1);
        });

        it('Количество фаловеров пользователя', () => {
            const loginElement = wrapper.find('.app-user__followers');

            //expect(loginElement).toHaveLength(1);
        });

        it('Должен присутствовать компонент Followers', () => {
            //expect(wrapper.find('Connect(Followers)')).toHaveLength(1);
        });

        it('У компонента Followers должен быть атрибут login с передачей значения через props', () => {
            const login = 'user';
            //wrapper.setProps({ user: { login: login } });
            //const loginProp = wrapper.find('Connect(Followers)').prop('login');

            //expect(loginProp).toBe(login);
        });
    })
});