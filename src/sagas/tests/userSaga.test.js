import { takeLatest, call, put } from 'redux-saga/effects';
import {
    getUserInfoRequest,
    getUserInfoSuccess,
    getUserInfoFailure,
    getUserActivityRequest,
    getUserActivitySuccess,
    getUserActivityFailure
} from '../../ducks/user';
import { getUserInfo, getUserFeedById } from '../../helpers/api';
import { userWatch, userFlow, userActivityWatch, userActivityFlow } from '../user';

describe('Получение данных о пользователе', () => {
    describe('Отслеживаем все запросы на получение данных:', () => {
        it('Вызов метода takeLatest для action registrationRequest', () => {
            const sagaWatcher = userWatch();

            expect(sagaWatcher.next().value).toEqual(takeLatest(getUserInfoRequest, userFlow));
        });
    });

    describe('Успешный сценарий получения данных', () => {
        const sagaFlow = userFlow();

        it('1) Отправка запроса на получение данных', () => {
            expect(sagaFlow.next().value).toEqual(call(getUserInfo));
        });

        it('2) Action fetchUserTransactionsSuccess - запись данных в хранилище', () => {
            const info = {
                data: {
                    result: {
                        id: 409,
                        email: 'anarchy16@inbox.ru',
                        name: null,
                        surname: null
                    }
                }
            };

            expect(sagaFlow.next({ data: info.data }).value).toEqual(put(getUserInfoSuccess(info.data.result)));
        });
    });

    describe('Ошибочный сценарий', () => {
        const sagaFlow = userFlow();

        it('1) Отправка запроса на получение данных', () => {
            expect(sagaFlow.next().value).toEqual(call(getUserInfo));
        });

        it('2) Action fetchUserTransactionsSuccess - запись ошибки в хранилище', () => {
            const error = new Error('test error');

            expect(sagaFlow.throw(error).value).toEqual(put(getUserInfoFailure(error)));
        });
    });
});

describe('Получение данных о последней активности пользователя', () => {
    describe('Отслеживаем все запросы на получение данных об активности:', () => {
        it('Вызов метода takeLatest для action getUserActivityRequest', () => {
            const sagaWatcher = userActivityWatch();

            expect(sagaWatcher.next().value).toEqual(takeLatest(getUserActivityRequest, userActivityFlow));
        });
    });

    describe('Успешный сценарий получения данных', () => {
        const action = { payload: 407 };
        const sagaFlow = userActivityFlow(action);

        it('1) Отправка запроса на получение данных', () => {
            expect(sagaFlow.next().value).toEqual(call(getUserFeedById, action.payload));
        });

        it('2) Action getUserActivitySuccess - запись данных в хранилище', () => {
            const info = {
                data: {
                    result: {
                        id: 409,
                        transaction: 'transaction'
                    }
                }
            };

            expect(sagaFlow.next({ data: info.data }).value).toEqual(put(getUserActivitySuccess(info.data.result)));
        });
    });

    describe('Ошибочный сценарий', () => {
        const action = { payload: 407 };
        const sagaFlow = userActivityFlow(action);

        it('1) Отправка запроса на получение данных', () => {
            expect(sagaFlow.next().value).toEqual(call(getUserFeedById, action.payload));
        });

        it('2) Action getUserActivityFailure - запись ошибки в хранилище', () => {
            const error = new Error('test error');

            expect(sagaFlow.throw(error).value).toEqual(put(getUserActivityFailure(error)));
        });
    });
});

