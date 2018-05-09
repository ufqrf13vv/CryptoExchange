import { fork } from 'redux-saga/effects';
import authWatch from './auth';

export default function*() {
    yield fork(authWatch);
}