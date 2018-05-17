import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchUserTransactionsRequest, fetchUserTransactionsSuccess, fetchUserTransactionsFailure } from '../ducks/transactions';
import { getUserTransactions } from '../helpers/api';

export function* transactionsFlow() {
    try {
        const userInfo = yield call(getUserTransactions);

        yield put(fetchUserTransactionsSuccess(userInfo.data.result));
    } catch (error) {
        yield put(fetchUserTransactionsFailure(error));
    }
}

export default function* transactionsWatch() {
    yield takeLatest(fetchUserTransactionsRequest, transactionsFlow);
}