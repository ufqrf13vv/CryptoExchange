import React from 'react';
import { AppRouter } from './AppRouter';
import { Switch, Route, Redirect, MemoryRouter } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { shallow } from 'enzyme';

describe('Компонент AppRouter', () => {
    const wrapper = shallow(<AppRouter />);

    it('Наличие Switch', () => {
        expect(wrapper.find(Switch)).toHaveLength(1);
    });

    it('Должен присутствовать как минимум один компонент PrivateRoute', () => {
        expect(wrapper.find(PrivateRoute).length).toBeGreaterThanOrEqual(1);
    });

    it('Наличие компонента <PrivateRoute path="/user/me" />', () => {
        const findRoute = wrapper.findWhere(
            el => el.type() === PrivateRoute && el.prop('path') === '/user/me'
        );

        expect(findRoute).toHaveLength(1);
    });

    it('Наличие компонента <PrivateRoute path="/user/:name" />', () => {
        const findRoute = wrapper.findWhere(
            el => el.type() === PrivateRoute && el.prop('path') === '/user/:name'
        );

        expect(findRoute).toHaveLength(1);
    });

    it('Должен присутствовать компонент Route', () => {
        expect(wrapper.find(Route)).not.toHaveLength(0);
    });

    it('Наличие компонента <Route path="/login" />', () => {
        const findRoutes = wrapper.findWhere(
            el => el.type() === Route && el.prop('path') === '/login'
        );

        expect(findRoutes).toHaveLength(1);
    });

    it('Редирект на /user/me', () => {
        const findRedirects = wrapper.findWhere(
            el => el.type() === Redirect && el.prop('to') === '/user/me'
        );

        expect(findRedirects).toHaveLength(1);
    });

    it('Выводить кнопку logout если props.isAuthorized === true', () => {
        wrapper.setProps({ isAuthorized: true });
        expect(wrapper.find('button.app__button')).toHaveLength(1);
    });
});
