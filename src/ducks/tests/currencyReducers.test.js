import currencyReducer, {
    fetchBtcRequest,
    fetchBtcSuccess,
    fetchBtcFailure,

    fetchEthRequest,
    fetchEthSuccess,
    fetchEthFailure,

    selectBtc,
    selectEth,
    selectOffset
} from '../currency';

describe('Currency reducers:', () => {
    it('selectOffset - выбор диапазона для отображения графика торгов', () => {
        const action = { payload: '4h' };
        const nextState = currencyReducer({offset: action.payload}, selectOffset(action.payload));

        expect(nextState.offset).toEqual(action.payload);
    });

    describe('Выбор валюты:', () => {
        it('selectBtc - выбор BTC для отображения', () => {
            const nextState = currencyReducer({selected: 'btc'}, selectBtc());

            expect(nextState.selected).toEqual('btc');
        });

        it('selectEth - выбор ETH для отображения', () => {
            const nextState = currencyReducer({selected: 'eth'}, selectEth());

            expect(nextState.selected).toEqual('eth');
        });
    });

    describe('Запрос на получение данных о BTC:', () => {
        it('fetchBtcRequest - отправка запроса', () => {
            const nextState = currencyReducer({isBtcLoading: true}, fetchBtcRequest());

            expect(nextState.isBtcLoading).toEqual(true);
        });

        it('fetchBtcSuccess - получен результат', () => {
            const action = {
                payload: [
                    {
                        mts: 10,
                        sell: 190,
                        purchase: 180
                    }
                ]
            };
            const nextState = currencyReducer({btc: action.payload}, fetchBtcSuccess(action.payload));

            expect(nextState.btc).toEqual(action.payload);
        });

        it('fetchBtcFailure - ошибка', () => {
            const error = new Error('New error');
            const nextState = currencyReducer({isBtcLoading: false}, fetchBtcFailure(error));

            expect(nextState.isBtcLoading).toEqual(false);
        });
    });

    describe('Запрос на получение данных о ETH:', () => {
        it('fetchEthRequest - отправка запроса', () => {
            const nextState = currencyReducer({isEthLoading: true}, fetchEthRequest());

            expect(nextState.isEthLoading).toEqual(true);
        });

        it('fetchEthSuccess - получен результат', () => {
            const action = {
                payload: [
                    {
                        mts: 10,
                        sell: 190,
                        purchase: 180
                    }
                ]
            };
            const nextState = currencyReducer({eth: action.payload}, fetchEthSuccess(action.payload));

            expect(nextState.eth).toEqual(action.payload);
        });

        it('fetchEthFailure - ошибка', () => {
            const error = new Error('New error');
            const nextState = currencyReducer({isEthLoading: false}, fetchEthFailure(error));

            expect(nextState.isEthLoading).toEqual(false);
        });
    });
});