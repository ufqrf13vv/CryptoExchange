import { fork } from 'redux-saga/effects';
import authWatch from './auth';
import registerWatch from './registration';

export default function*() {
    yield fork(authWatch);
    yield fork(registerWatch);
}