import { takeLatest, call, put } from 'redux-saga/effects';
import { feedRequest, feedSuccess, feedFailure } from '../ducks/feed';
import { getFeed } from '../helpers/api';

export function* feedFlow() {
    try {
        const feed = yield call(getFeed);

        yield put(feedSuccess(feed.data.result));
    } catch (error) {
        yield put(feedFailure(error));
    }
}

export default function* feedWatch() {
    yield takeLatest(feedRequest, feedFlow);
}