import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchUserTransactionsRequest, fetchUserTransactionsSuccess, fetchUserTransactionsFailure } from '../../ducks/transactions';
import { getUserTransactions } from '../../helpers/api';
import transactionsWatch, { transactionsFlow } from '../transactions';

describe('Получение транзакция пользователя', () => {
    describe('Отслеживаем все запросы на получение транзакций:', () => {
        it('Вызов метода takeLatest для action registrationRequest', () => {
            const sagaWatcher = transactionsWatch();

            expect(sagaWatcher.next().value).toEqual(takeLatest(fetchUserTransactionsRequest, transactionsFlow));
        });
    });

    describe('Успешный сценарий получения транзакций', () => {
        const sagaFlow = transactionsFlow();

        it('1) Отправка запроса на получение данных', () => {
             expect(sagaFlow.next().value).toEqual(call(getUserTransactions));
        });

        it('2) Action fetchUserTransactionsSuccess - запись данных в хранилище', () => {
            const info = {
                data: {
                    result: {
                        id: 409,
                        created_at: '2018-05-17T15:55:01.215Z',
                        usd_delta: '+8220.0195',
                        btc_delta: '-1.0'
                    }
                }
            };

            expect(sagaFlow.next({ data: info.data }).value).toEqual(put(fetchUserTransactionsSuccess(info.data.result)));
        });
    });

    describe('Ошибочный сценарий', () => {
        const sagaFlow = transactionsFlow();

        it('1) Отправка запроса на получение данных', () => {
            expect(sagaFlow.next().value).toEqual(call(getUserTransactions));
        });

        it('2) Action fetchUserTransactionsSuccess - запись данных в хранилище', () => {
            const error = new Error('test error');

            expect(sagaFlow.throw(error).value).toEqual(put(fetchUserTransactionsFailure(error)));
        });
    });
});

