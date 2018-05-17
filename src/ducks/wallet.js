import { handleActions, createActions } from 'redux-actions';

const {
    fetchWalletRequest,
    fetchWalletSuccess,
    fetchWalletFailure,
    buyCurrencyRequest,
    buyCurrencySuccess,
    buyCurrencyFailure,
    sellCurrencyRequest,
    sellCurrencySuccess,
    sellCurrencyFailure
    } = createActions(
    'FETCH_WALLET_REQUEST',
    'FETCH_WALLET_SUCCESS',
    'FETCH_WALLET_FAILURE',
    'BUY_CURRENCY_REQUEST',
    'BUY_CURRENCY_SUCCESS',
    'BUY_CURRENCY_FAILURE',
    'SELL_CURRENCY_REQUEST',
    'SELL_CURRENCY_SUCCESS',
    'SELL_CURRENCY_FAILURE'
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
        }),

        [buyCurrencyRequest]: (state, action) => ({
            ...state
        }),

        [buyCurrencySuccess]: (state, action) => ({
            ...state,
            coins: action.payload
        }),

        [buyCurrencyFailure]: (state, action) => ({
            ...state,
            error: action.payload
        }),

        [sellCurrencyRequest]: (state, action) => ({
            ...state
        }),

        [sellCurrencySuccess]: (state, action) => ({
            ...state,
            coins: action.payload
        }),

        [sellCurrencyFailure]: (state, action) => ({
            ...state,
            error: action.payload
        })
    },
    initialState
)

export {
    fetchWalletRequest,
    fetchWalletSuccess,
    fetchWalletFailure,
    buyCurrencyRequest,
    buyCurrencySuccess,
    buyCurrencyFailure,
    sellCurrencyRequest,
    sellCurrencySuccess,
    sellCurrencyFailure
};

export const getWalletData = state => state.wallet.coins;
export const getError = state => state.wallet.error;