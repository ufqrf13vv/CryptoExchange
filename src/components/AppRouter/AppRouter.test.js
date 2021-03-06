import React from 'react';
import { Switch, Route, Redirect, MemoryRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import PrivateRoute from '../PrivateRoute';
import { shallow } from 'enzyme';

describe('Компонент AppRouter', () => {
    const wrapper = shallow(<AppRouter />);

    it('Наличие Switch', () => {
        expect(wrapper.find(Switch)).toHaveLength(1);
    });

    it('Должен присутствовать компонент PrivateRoute', () => {
        expect(wrapper.find(PrivateRoute).length).toBeGreaterThanOrEqual(1);
    });

    it('Переход на страницу "Торги"', () => {
        const findRoute = wrapper.findWhere(
            el => el.type() === PrivateRoute && el.prop('path') === '/trade/:currency'
        );

        expect(findRoute).toHaveLength(1);
    });

    it('Переход на страницу "Лента"', () => {
        const findRoute = wrapper.findWhere(
            el => el.type() === PrivateRoute && el.prop('path') === '/feed'
        );

        expect(findRoute).toHaveLength(1);
    });

    it('Переход на страницу "Профиль"', () => {
        const findRoute = wrapper.findWhere(
            el => el.type() === PrivateRoute && el.prop('path') === '/profile'
        );

        expect(findRoute).toHaveLength(1);
    });

    it('Должен присутствовать компонент Route', () => {
        expect(wrapper.find(Route)).not.toHaveLength(0);
    });

    it('Наличие компонента <Route path="/" />', () => {
        const findRoutes = wrapper.findWhere(
            el => el.type() === Route && el.prop('path') === '/'
        );

        expect(findRoutes).toHaveLength(1);
    });
});
