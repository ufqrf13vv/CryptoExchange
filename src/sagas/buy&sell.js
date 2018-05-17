import {takeLatest, put, call} from 'redux-saga/effects';
import {
    buyCurrencyRequest,
    buyCurrencySuccess,
    buyCurrencyFailure,
    sellCurrencyRequest,
    sellCurrencySuccess,
    sellCurrencyFailure
} from '../ducks/wallet';
import { buyCurrency, sellCurrency } from '../helpers/api';

export function* buyFlow(action) {
    try {
        const { currencyName, value } = action.payload;
        const response = yield call(buyCurrency, currencyName, value);
        const result = {
            usd: response.data.usd,
            btc: response.data.btc,
            eth: response.data.eth
        };

        yield put(buyCurrencySuccess(result));
    } catch (error) {
        yield put(buyCurrencyFailure(error));
    }
}

export function* sellFlow(action) {
    try {
        const { currencyName, value } = action.payload;
        const response = yield call(sellCurrency, currencyName, value);
        const result = {
            usd: response.data.usd,
            btc: response.data.btc,
            eth: response.data.eth
        };

        yield put(sellCurrencySuccess(result));
    } catch (error) {
        yield put(sellCurrencyFailure(error));
    }
}

export function* sellWatch() {
    yield takeLatest(sellCurrencyRequest, sellFlow);
}

export function* buyWatch() {
    yield takeLatest(buyCurrencyRequest, buyFlow);
}