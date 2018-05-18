import registerWatch, { registerFlow } from '../registration';
import { takeLatest, call, put } from 'redux-saga/effects';
import { registrationRequest, registrationSuccess, registrationFailure } from '../../ducks/registration';
import { authSuccess } from '../../ducks/auth';
import { registration, setTokenApi } from '../../helpers/api';
import { setTokenToLocalStorage } from '../../helpers/localStorage';

describe('Регистрация пользователя', () => {
    describe('Отслеживаем все попытки регистрации пользователя:', () => {
        it('Вызов метода takeLatest для action registrationRequest', () => {
            const sagaWatcher = registerWatch();

            expect(sagaWatcher.next().value).toEqual(takeLatest(registrationRequest, registerFlow));
        });
    });

    describe('Успешнеый сценарий', () => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9';
        const action = {
            payload: {
                email: 'mail@mail.ru',
                password: 'password'
            }
        };
        const sageRegister = registerFlow(action);

        it('1) Отправка запроса с данными пользователя (email, password)', () => {
            const result = {
                email: 'mail@mail.ru',
                password: 'password'
            };

            expect(sageRegister.next(action).value).toEqual(call(registration, result));
        });

        it('2) Запись полученного токена в локальное хранилище', () => {
            const action = {
                data: {
                    jwt: token
                }
            };

            expect(sageRegister.next(action).value).toEqual(call(setTokenToLocalStorage, token));
        });

        it('3) Отправка полученного токена на бэк', () => {
            const action = {
                data: {
                    jwt: token
                }
            };

            expect(sageRegister.next(action).value).toEqual(call(setTokenApi, token));
        });

        it('4) Action registrationSuccess - успешная регистрация', () => {
            expect(sageRegister.next().value).toEqual(put(registrationSuccess(token)));
        });

        it('5) Action authSuccess - успешная авторизация', () => {
            expect(sageRegister.next().value).toEqual(put(authSuccess()));
        });
    });

    describe('Ошибочный сценарий', () => {
        const action = {
            payload: {
                email: 'mail@mail.ru',
                password: 'password'
            }
        };
        const sageRegister = registerFlow(action);

        it('1) Отправка запроса с данными пользователя (email, password)', () => {
            const result = {
                email: 'mail@mail.ru',
                password: 'password'
            };

            expect(sageRegister.next('asd').value).toEqual(call(registration, result));
        });

        it('2) Action registrationFailure - ошибка регистрации', () => {
            const error = {
                data: {
                    message: {
                        email: ['error']
                    }
                }
            };

            //expect(sageRegister.throw(error).value).toEqual(put(registrationFailure(error)));
        });
    });
});