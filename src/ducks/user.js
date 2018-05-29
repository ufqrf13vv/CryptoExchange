import { handleActions, createActions } from 'redux-actions';

const {
    getUserInfoRequest,
    getUserInfoSuccess,
    getUserInfoFailure,
    getUserActivityRequest,
    getUserActivitySuccess,
    getUserActivityFailure
    } = createActions(
    'GET_USER_INFO_REQUEST',
    'GET_USER_INFO_SUCCESS',
    'GET_USER_INFO_FAILURE',
    'GET_USER_ACTIVITY_REQUEST',
    'GET_USER_ACTIVITY_SUCCESS',
    'GET_USER_ACTIVITY_FAILURE'
);

const initialState = {
    info: {},
    isLoading: false,
    activity: {},
    error: null
};

export default handleActions(
    {
        [getUserInfoRequest]: (state, action) => ({
            ...state,
            isLoading: true
        }),

        [getUserInfoSuccess]: (state, action) => ({
            ...state,
            isLoading: false,
            info: action.payload
        }),

        [getUserInfoFailure]: (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload
        }),

        [getUserActivityRequest]: (state, action) => ({
            ...state,
            isLoading: true
        }),

        [getUserActivitySuccess]: (state, action) => ({
            ...state,
            isLoading: false,
            activity: action.payload
        }),

        [getUserActivityFailure]: (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload
        })
    },
    initialState
)

export { 
    getUserInfoRequest, 
    getUserInfoSuccess, 
    getUserInfoFailure,
    getUserActivityRequest,
    getUserActivitySuccess,
    getUserActivityFailure
};

export const getUserInfo = state => state.user.info;
export const getUserActivity = state => state.user.activity;
export const getError = state => state.user.error;