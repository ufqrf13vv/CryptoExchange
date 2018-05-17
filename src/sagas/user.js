import { takeLatest, call, put } from 'redux-saga/effects';
import { getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure } from '../ducks/user';
import { getUserInfo } from '../helpers/api';

export function* userFlow() {
    try {
        const userInfo = yield call(getUserInfo);

        yield put(getUserInfoSuccess(userInfo.data.result));
    } catch (error) {
        yield put(getUserInfoFailure(error));
    }
}

export default function* userWatch() {
    yield takeLatest(getUserInfoRequest, userFlow);
}