import { handleActions, createActions } from 'redux-actions';

const {
    feedRequest,
    feedSuccess,
    feedFailure
    } = createActions(
    'FEED_REQUEST',
    'FEED_SUCCESS',
    'FEED_FAILURE'
);

const initialState = {
    feed: [],
    error: null
};

export default handleActions(
    {
        [feedRequest]: (state, action) => ({
            ...state
        }),

        [feedSuccess]: (state, action) => ({
            ...state,
            feed: action.payload
        }),

        [feedFailure]: (state, action) => ({
            ...state,
            error: action.payload
        })
    },
    initialState
)

export { feedRequest, feedSuccess, feedFailure };

export const getFeed = state => state.feed.feed;
export const getFeedError = state => state.feed.error;