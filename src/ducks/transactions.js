import { handleActions, createActions } from 'redux-actions';

const {
    fetchUserTransactionsRequest,
    fetchUserTransactionsSuccess,
    fetchUserTransactionsFailure
    } = createActions(
    'FETCH_USER_TRANSACTIONS_REQUEST',
    'FETCH_USER_TRANSACTIONS_SUCCESS',
    'FETCH_USER_TRANSACTIONS_FAILURE'
);

const initialState = {
    isLoading: false,
    transactions: [],
    error: null
};

export default handleActions(
    {
        [fetchUserTransactionsRequest]: (state, action) => ({
            ...state,
            isLoading: true
        }),

        [fetchUserTransactionsSuccess]: (state, action) => ({
            ...state,
            isLoading: false,
            transactions: action.payload
        }),

        [fetchUserTransactionsFailure]: (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload
        })
    },
    initialState
)

export { fetchUserTransactionsRequest, fetchUserTransactionsSuccess, fetchUserTransactionsFailure };