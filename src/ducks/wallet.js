import { handleActions, createActions } from 'redux-actions';

const {
    fetchWalletRequest,
    fetchWalletSuccess,
    fetchWalletFailure
    } = createActions(
    'FETCH_WALLET_REQUEST',
    'FETCH_WALLET_SUCCESS',
    'FETCH_WALLET_FAILURE'
);

const initialState = {
    isLoading: false,
    coins: {},
    error: null
};

export default handleActions(
    {
        [fetchWalletRequest]: (state, action) => ({
            ...state,
            isLoading: true
        }),

        [fetchWalletSuccess]: (state, action) => ({
            ...state,
            isLoading: false,
            coins: action.payload
        }),

        [fetchWalletFailure]: (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload
        })
    },
    initialState
)

export { fetchWalletRequest, fetchWalletSuccess, fetchWalletFailure };

export const getWalletData = state => state.wallet.coins;