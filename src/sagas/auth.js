import { call, put, select, take } from 'redux-saga/effects';
import { authRequest, authSuccess, authFailure, getIsAuthorize } from '../ducks/auth';
import { login, setTokenApi } from '../helpers/api';
import { getTokenFromLocalStorage, setTokenToLocalStorage } from '../helpers/localStorage';

export default function* authWatch() {
    while (true) {
        const isAuthorized = yield select(getIsAuthorize);
        const localStorageToken = yield call(getTokenFromLocalStorage);
        let token;

        if (!isAuthorized) {
            if (localStorageToken) {
                token = localStorageToken;

                yield call(setTokenApi, token);
                yield call(setTokenToLocalStorage, token);

                yield put(authSuccess());
            } else {
                try {
                    const action = yield take(authRequest);
                    const result = yield call(login, action.payload);
                    
                    token = result.data.jwt;

                    yield call(setTokenApi, token);
                    yield call(setTokenToLocalStorage, token);

                    yield put(authSuccess());
                } catch (error) {
                    const { message } = error.data;

                    yield put(authFailure(message));
                }
            }
        }
    }
}