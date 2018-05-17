import { fork } from 'redux-saga/effects';
import authWatch from './auth';
import registerWatch from './registration';
import userWatch from './user';
import transactionsWatch from './transactions';
import { fetchWalletWatch, fetchBtcWatch, fetchEthWatch, currencyWatch } from './currency';
import { sellWatch, buyWatch } from './buy&sell';

export default function*() {
    yield fork(authWatch);
    yield fork(registerWatch);
    yield fork(userWatch);
    yield fork(fetchWalletWatch);
    yield fork(transactionsWatch);
    yield fork(fetchBtcWatch);
    yield fork(fetchEthWatch);
    yield fork(buyWatch);
    yield fork(sellWatch);
    //yield fork(currencyWatch);
}