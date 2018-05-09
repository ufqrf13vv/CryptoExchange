import { handleActions, createActions } from 'redux-actions';

const {
    authRequest,
    authSuccess,
    authFailure
    } = createActions(
    {
        AUTH_REQUEST: null,
        AUTH_SUCCESS: null,
        AUTH_FAILURE: null
    }
);

export default handleActions(
    {
        [authRequest]: (state, action) => ({
            ...state,
            isAuthorize: false,
            isFetching: true,
            error: null
        })
    }, null,
    {
        [authSuccess]: (state, action) => ({
            ...state,
            isAuthorize: false,
            isFetching: true,
            error: null
        })
    }, null,
    {
        [authFailure]: (state, action) => ({
            ...state,
            isAuthorize: false,
            isFetching: true,
            error: null
        })
    }, null
)

export { authRequest, authSuccess, authFailure };