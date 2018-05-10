import { handleActions, createActions } from 'redux-actions';

const {
    authRequest,
    authSuccess,
    authFailure
    } = createActions(
    'AUTH_REQUEST',
    'AUTH_SUCCESS',
    'AUTH_FAILURE'
);

const initialState = {
    isAuthorize: false,
    loginError: null
};

export default handleActions(
    {
        [authRequest]: (state, action) => ({
            ...state,
            isAuthorize: false,
            loginError: null
        }),

        [authSuccess]: (state, action) => ({
            ...state,
            isAuthorize: true,
            loginError: null
        }),

        [authFailure]: (state, action) => ({
            ...state,
            isAuthorize: false,
            loginError: action.payload
        })
    },
    initialState
)

export { authRequest, authSuccess, authFailure };

export const getIsAuthorize = state => state.auth.isAuthorize;
export const getAuthError = state => state.auth.loginError;