import { handleActions, createActions } from 'redux-actions';

const {
    fetchBtcRequest,
    fetchBtcSuccess,
    fetchBtcFailure,
    fetchEthRequest,
    fetchEthSuccess,
    fetchEthFailure,
    selectBtc,
    selectEth,
    selectOffset
    } = createActions(
    'FETCH_BTC_REQUEST',
    'FETCH_BTC_SUCCESS',
    'FETCH_BTC_FAILURE',
    'FETCH_ETH_REQUEST',
    'FETCH_ETH_SUCCESS',
    'FETCH_ETH_FAILURE',
    'SELECT_BTC',
    'SELECT_ETH',
    'SELECT_OFFSET'
);

const initialState = {
    selected: 'btc',
    offset: '4h',
    btc: [],
    eth: [],
    isBtcLoading: false,
    isEthLoading: false
};

export default handleActions(
    {
        [selectOffset]: (state, action) => ({
            ...state,
            offset: action.payload
        }),

        [selectBtc]: state => ({
            ...state,
            selected: 'btc'
        }),

        [selectEth]: state => ({
            ...state,
            selected: 'eth'
        }),

        [fetchBtcRequest]: (state, action) => ({
            ...state,
            btc: [],
            isBtcLoading: true
        }),

        [fetchBtcSuccess]: (state, action) => ({
            ...state,
            btc: action.payload,
            isBtcLoading: false
        }),

        [fetchBtcFailure]: (state, action) => ({
            ...state,
            isBtcLoading: false
        }),

        [fetchEthRequest]: (state, action) => ({
            ...state,
            eth: [],
            isEthLoading: true
        }),

        [fetchEthSuccess]: (state, action) => ({
            ...state,
            eth: action.payload,
            isEthLoading: false
        }),

        [fetchEthFailure]: (state, action) => ({
            ...state,
            isEthLoading: false
        })
    },
    initialState
)

export {
    fetchBtcRequest,
    fetchBtcSuccess,
    fetchBtcFailure,

    fetchEthRequest,
    fetchEthSuccess,
    fetchEthFailure,

    selectBtc,
    selectEth,
    selectOffset
};

export const sellBtc = state => state.currency.btc.map(item => [new Date(item.mts), item.sell]);
export const purchaseBtc = state => state.currency.btc.map(item => [new Date(item.mts), item.purchase]);
export const sellEth = state => state.currency.eth.map(item => [new Date(item.mts), item.sell]);
export const purchaseEth = state => state.currency.eth.map(item => [new Date(item.mts), item.purchase]);
export const getSelectedOffset = state => state.currency.offset;
export const getSelectedCurrency = state => state.currency.selected;
export const btcIsLoading = state => state.currency.isBtcLoading;
export const ethIsLoading = state => state.currency.isEthLoading;

export const getCurrentBtcSell = state => {
    if (state.currency.btc[0]) {
        return state.currency.btc[0].sell;
    }

    return 0;
};

export const getCurrentEthSell = state => {
    if (state.currency.eth[0]) {
        return state.currency.eth[0].sell;
    }

    return 0;
};

export const getCurrentBtcBuy = state => {
    if (state.currency.btc[0]) {
        return state.currency.btc[0].purchase;
    }

    return 0;
};

export const getCurrentEthBuy = state => {
    if (state.currency.eth[0]) {
        return state.currency.eth[0].purchase;
    }

    return 0;
};