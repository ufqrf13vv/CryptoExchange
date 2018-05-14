import { fork } from 'redux-saga/effects';
import authWatch from './auth';
import registerWatch from './registration';
import userWatch from './user';
import { fetchWalletWatch, fetchBtcWatch, fetchEthWatch } from './currency';

export default function*() {
    yield fork(authWatch);
    yield fork(registerWatch);
    yield fork(userWatch);
    yield fork(fetchWalletWatch);
    yield fork(fetchBtcWatch);
    yield fork(fetchEthWatch);
}