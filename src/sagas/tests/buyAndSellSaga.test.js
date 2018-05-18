import {takeLatest, put, call} from 'redux-saga/effects';
import {
    buyCurrencyRequest,
    buyCurrencySuccess,
    buyCurrencyFailure,

    sellCurrencyRequest,
    sellCurrencySuccess,
    sellCurrencyFailure
} from '../../ducks/wallet';
import { buyCurrency, sellCurrency } from '../../helpers/api';
import { sellWatch, buyWatch, sellFlow, buyFlow } from '../buy&sell';

describe('Покупка эл. валюты', () => {
    describe('Отслеживаем все запросы на покупку', () => {
        it('Вызов метода takeLatest для action buyCurrencyRequest', () => {
            const sagaWatcher = buyWatch();

            expect(sagaWatcher.next().value).toEqual(takeLatest(buyCurrencyRequest, buyFlow));
        });
    });

    describe('Успешный сценарий покупки', () => {
        const action = {
            payload : {
                currencyName: 'btc',
                value: 1
            }
        };
        const sagaFlow = buyFlow(action);

        it('1) Отправка запроса на покупку', () => {
            expect(sagaFlow.next().value).toEqual(call(buyCurrency, action.payload.currencyName, action.payload.value));
        });

        it('2) Action buyCurrencySuccess - запись данных в хранилище', () => {
            const result = {
                payload: {
                    usd: 1,
                    btc: 0,
                    eth: 1
                }
            };

            expect(sagaFlow.next({ data: result.payload }).value).toEqual(put(buyCurrencySuccess(result.payload)));
        });
    });

    describe('Ошибочный сценарий', () => {
        const action = {
            payload : {
                currencyName: 'btc',
                value: 1
            }
        };
        const sagaFlow = buyFlow(action);

        it('1) Отправка запроса на покупку', () => {
            expect(sagaFlow.next().value).toEqual(call(buyCurrency, action.payload.currencyName, action.payload.value));
        });

        it('2) Action buyCurrencyFailure - запись ошибки', () => {
            const error = new Error('test error');

            expect(sagaFlow.throw(error).value).toEqual(put(buyCurrencyFailure(error)));
        });
    });
});

describe('Продажа эл. валюты', () => {
    describe('Отслеживаем все запросы на продажу', () => {
        it('Вызов метода takeLatest для action sellCurrencyRequest', () => {
            const sagaWatcher = sellWatch();

            expect(sagaWatcher.next().value).toEqual(takeLatest(sellCurrencyRequest, sellFlow));
        });
    });

    describe('Успешный сценарий продажи', () => {
        const action = {
            payload : {
                currencyName: 'btc',
                value: 1
            }
        };
        const sagaFlow = sellFlow(action);

        it('1) Отправка запроса на продажу', () => {
            expect(sagaFlow.next().value).toEqual(call(sellCurrency, action.payload.currencyName, action.payload.value));
        });

        it('2) Action sellCurrencySuccess - запись данных в хранилище', () => {
            const result = {
                payload: {
                    usd: 1,
                    btc: 0,
                    eth: 1
                }
            };

            expect(sagaFlow.next({ data: result.payload }).value).toEqual(put(sellCurrencySuccess(result.payload)));
        });
    });

    describe('Ошибочный сценарий', () => {
        const action = {
            payload : {
                currencyName: 'btc',
                value: 1
            }
        };
        const sagaFlow = sellFlow(action);

        it('1) Отправка запроса на продажу', () => {
            expect(sagaFlow.next().value).toEqual(call(sellCurrency, action.payload.currencyName, action.payload.value));
        });

        it('2) Action fetchUserTransactionsSuccess - запись ошибки', () => {
            const error = new Error('test error');

            expect(sagaFlow.throw(error).value).toEqual(put(sellCurrencyFailure(error)));
        });
    });
});