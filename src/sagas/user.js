import { takeLatest, call, put } from 'redux-saga/effects';

import { 
    getUserInfoRequest, 
    getUserInfoSuccess, 
    getUserInfoFailure,
    getUserActivityRequest,
    getUserActivitySuccess,
    getUserActivityFailure 
} from '../ducks/user';

import { getUserInfo, getUserFeedById } from '../helpers/api';

export function* userFlow() {
    try {
        const userInfo = yield call(getUserInfo);

        yield put(getUserInfoSuccess(userInfo.data.result));
    } catch (error) {
        yield put(getUserInfoFailure(error));
    }
}

export function* userActivityFlow(action) {
    console.log(action)
    try {
        const userActivity = yield call(getUserFeedById, action.payload);

        yield put(getUserActivitySuccess(userActivity.data.result));
    } catch (error) {
        yield put(getUserActivityFailure(error));
    }
}

export function* userWatch() {
    yield takeLatest(getUserInfoRequest, userFlow);
}

export function* userActivityWatch() {
    yield takeLatest(getUserActivityRequest, userActivityFlow);
}