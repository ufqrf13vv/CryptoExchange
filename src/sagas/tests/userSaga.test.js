import { takeLatest, call, put } from 'redux-saga/effects';
import { getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure } from '../../ducks/user';
import { getUserInfo } from '../../helpers/api';
import userWatch, { userFlow } from '../user';

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

        it('2) Action fetchUserTransactionsSuccess - запись данных в хранилище', () => {
            const error = new Error('test error');

            expect(sagaFlow.throw(error).value).toEqual(put(getUserInfoFailure(error)));
        });
    });
});

