import { handleActions, createActions } from 'redux-actions';

const {
    authRequest,
    authSuccess,
    authFailure,
    logout
    } = createActions(
    'AUTH_REQUEST',
    'AUTH_SUCCESS',
    'AUTH_FAILURE',
    'LOGOUT'
);

const initialState = {
    isAuthorize: false,
    loginError: null
};

export default handleActions(
    {
        [authRequest]: (state, action) => ({
            ...state
        }),

        [authSuccess]: (state, action) => ({
            ...state,
            isAuthorize: true
        }),

        [authFailure]: (state, action) => ({
            ...state,
            loginError: action.payload
        }),

        [logout]: (state, action) => ({
            ...state,
            isAuthorize: false
        })
    },
    initialState
)

export { authRequest, authSuccess, authFailure, logout };

export const getIsAuthorize = state => state.auth.isAuthorize;
export const getAuthError = state => state.auth.loginError;