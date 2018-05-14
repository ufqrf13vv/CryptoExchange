import {takeLatest, fork, take, select, put, cancel, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {getIsAuthorize, logout} from '../ducks/auth';
import {
    selectBtc,
    selectEth,
    fetchBtcRequest,
    fetchEthRequest,
    fetchBtcSuccess,
    fetchEthSuccess,
    fetchBtcFailure,
    fetchEthFailure,
    getOffset,
    selectOffset
} from '../ducks/currency';
import {candles, getWallet} from '../helpers/api';
import {fetchWalletRequest, fetchWalletSuccess, fetchWalletFailure} from '../ducks/wallet';
import {changeLocation} from '../ducks/location';

function* fetchBtcFlow(action) {
    try {
        const response = yield call(candles, 'btc', action.payload);

        yield put(fetchBtcSuccess(response.data.result));
    } catch (error) {
        yield put(fetchBtcFailure(error));
    }
}

function* fetchEthFlow(action) {
    try {
        const response = yield call(candles, 'eth', action.payload);

        yield put(fetchEthSuccess(response.data.result));
    } catch (error) {
        yield put(fetchEthFailure(error));
    }
}

function* loginCurrencyFlow() {
    while (true) {
        const offset = yield select(getOffset);

        yield put(fetchBtcRequest(offset));
        yield put(fetchEthRequest(offset));

        yield delay(15000);
    }
}

export function* currencyWatch() {
    let currencyTask;

    while (true) {
        const action = yield take([getIsAuthorize, logout, selectBtc, selectEth, selectOffset, changeLocation]);

        if (currencyTask) {
            yield cancel(currencyTask);

            currencyTask = undefined;
        }

        if (action.type !== logout.toString()) currencyTask = yield fork(loginCurrencyFlow);
    }
}

function* fetchWalletFlow() {
    try {
        const response = yield call(getWallet);

        yield put(fetchWalletSuccess(response.data.result));
    } catch (error) {
        yield put(fetchWalletFailure(error));
    }
}

export function* fetchWalletWatch() {
    yield takeLatest(fetchWalletRequest, fetchWalletFlow);
}

export function* fetchBtcWatch() {
    yield takeLatest(fetchBtcRequest, fetchBtcFlow);
}

export function* fetchEthWatch() {
    yield takeLatest(fetchEthRequest, fetchEthFlow);
}