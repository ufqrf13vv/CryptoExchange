import { handleActions, createActions } from 'redux-actions';

const {
    getUserInfoRequest,
    getUserInfoSuccess,
    getUserInfoFailure
    } = createActions(
    'GET_USER_INFO_REQUEST',
    'GET_USER_INFO_SUCCESS',
    'GET_USER_INFO_FAILURE'
);

const initialState = {
    info: {},
    isLoading: false,
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
        })
    },
    initialState
)

export { getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure };

export const getUserInfo = state => state.user.info;