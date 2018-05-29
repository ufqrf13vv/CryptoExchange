import authWatch from '../auth';
import { take, call, put, select } from 'redux-saga/effects';
import { authRequest, authSuccess, authFailure, getIsAuthorize } from '../../ducks/auth';
import { login, setTokenApi } from '../../helpers/api';
import { getTokenFromLocalStorage, setTokenToLocalStorage } from '../../helpers/localStorage';

describe('Авторизация пользователя', () => {
    const authSaga = authWatch();

    describe('Сценарий 1: пользователь не авторизован и токен есть в локальном хранилище', () => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9';

        it('1) Запрос на проверку аторизован ли пользователь', () => {
            expect(authSaga.next().value).toEqual(select(getIsAuthorize));
        });

        it('2) Запрос на получение токена из локального хранилища', () => {
            expect(authSaga.next().value).toEqual(call(getTokenFromLocalStorage));
        });

        it('3) Запрос на получение токена из локального хранилища', () => {
            expect(authSaga.next(token).value).toEqual(call(setTokenApi, token));
        });

        it('4) Запись токена в локальное хранилище', () => {
            expect(authSaga.next().value).toEqual(call(setTokenToLocalStorage, token));
        });

        it('5) Action authSuccess - успешная авторизация', () => {
            expect(authSaga.next().value).toEqual(put(authSuccess()));
        });
    });

    describe('Сценарий 2: пользователь не авторизован и токен отсутствует в локальном хранилище', () => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9';

        it('1) Запрос на проверку аторизован ли пользователь', () => {
            expect(authSaga.next().value).toEqual(select(getIsAuthorize));
        });

        it('2) Запрос на получение токена из локального хранилища', () => {
            expect(authSaga.next().value).toEqual(call(getTokenFromLocalStorage));
        });

        it('3) Вызов action authRequest - авторизация пользователя', () => {
            expect(authSaga.next().value).toEqual(take(authRequest));
        });

        it('4) Отправка запроса на бэк с данными пользователя', () => {
            const action = {
                payload: {
                    email: 'mail@mail.ru',
                    password: 'password'
                }
            };

            expect(authSaga.next(action).value).toEqual(call(login, action.payload));
        });

        it('5) Отправка полученного токена на бэк', () => {
            const action = {
                data: {
                    jwt: token
                }
            };

            expect(authSaga.next(action).value).toEqual(call(setTokenApi, token));
        });

        it('6) Запись полученного токена в локальное хранилище', () => {
            expect(authSaga.next().value).toEqual(call(setTokenToLocalStorage, token));
        });

        it('7) Action authSuccess - успешная авторизация', () => {
            expect(authSaga.next().value).toEqual(put(authSuccess()));
        });
    });

    describe('Сценарий 3: Ошибка авторизации', () => {
        it('1) Запрос на проверку аторизован ли пользователь', () => {
            expect(authSaga.next().value).toEqual(select(getIsAuthorize));
        });

        it('2) Запрос на получение токена из локального хранилища', () => {
            expect(authSaga.next().value).toEqual(call(getTokenFromLocalStorage));
        });

        it('3) Вызов action authRequest - авторизация пользователя', () => {
            expect(authSaga.next().value).toEqual(take(authRequest));
        });

        it('4) Отправка запроса на бэк с данными пользователя', () => {
            const action = {
                payload: {
                    email: 'mail@mail.ru',
                    password: 'password'
                }
            };

            expect(authSaga.next(action).value).toEqual(call(login, action.payload));
        });

        it('5) Action authFailure - ошибка авторизации', () => {
            const error = new Error({
                //data: {
                    message: 'error'
                //}
            });
            //authSaga.next();
            console.log(authSaga.throw(error).value)

            //expect(authSaga.throw(error).value).toEqual(put(authFailure(error.data.message)));
        });
    })
});