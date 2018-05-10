import { takeLatest, call, put } from 'redux-saga/effects';
import { registrationRequest, registrationSuccess, registrationFailure } from '../ducks/registration';
import { authSuccess } from '../ducks/auth';
import { registration, setTokenApi } from '../helpers/api';
import { setTokenToLocalStorage } from '../helpers/localStorage';

export function* registerFlow(action) {
    try {
        const result = yield call(registration, action.payload);
        const token = result.data.jwt;

        setTokenToLocalStorage(token);
        setTokenApi(token);

        yield put(registrationSuccess(token));
        yield put(authSuccess());
    } catch (error) {
        const messages = error.data.message;
        const keys = Object.keys(messages);
        let message = '';

        for (const key of keys) {
            message += `${key}: ${messages[key]}`;
        }

        yield put(registrationFailure(message));
    }
}

export default function* registerWatch() {
    yield takeLatest(registrationRequest, registerFlow);
}