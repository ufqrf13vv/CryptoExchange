import walletReducer, {
    fetchWalletRequest,
    fetchWalletSuccess,
    fetchWalletFailure,

    buyCurrencyRequest,
    buyCurrencySuccess,
    buyCurrencyFailure,

    sellCurrencyRequest,
    sellCurrencySuccess,
    sellCurrencyFailure
} from '../wallet';

describe('Wallet reducers:', () => {
    describe('Данные об эл. кошельке пользователя:', () => {
        it('fetchWalletRequest - запрос на получение данных о эл. кошельке пользователя', () => {
            const nextState = walletReducer({isLoading: true}, fetchWalletRequest());

            expect(nextState.isLoading).toEqual(true);
        });

        it('fetchWalletSuccess - данные успешно получены', () => {
            const action = {
                payload: {
                    coins: 9281.546,
                    btc: 1,
                    eth: 0
                }
            };
            const nextState = walletReducer({coins: action.payload}, fetchWalletSuccess(action.payload));

            expect(nextState.coins).toEqual(action.payload);
        });

        it('fetchWalletFailure - ошибка', () => {
            const error = new Error('New error');
            const nextState = walletReducer({error: error}, fetchWalletFailure(error));

            expect(nextState.error).toEqual(error);
        });
    });

    describe('Покупка эл. валюты:', () => {
        it('buyCurrencyRequest - запрос на покупку валюты', () => {
            const nextState = walletReducer({isLoading: false}, buyCurrencyRequest());

            expect(nextState.isLoading).toEqual(false);
        });

        it('buyCurrencySuccess - покупка прошла успешно', () => {
            const action = {
                payload: {
                    currencyName: 'btc',
                    value: 1
                }
            };
            const nextState = walletReducer({coins: action.payload}, buyCurrencySuccess(action.payload));

            expect(nextState.coins).toEqual(action.payload);
        });

        it('buyCurrencyFailure - ошибка покупки', () => {
            const error = new Error('New error');
            const nextState = walletReducer({error: error}, buyCurrencyFailure(error));

            expect(nextState.error).toEqual(error);
        });
    });

    describe('Продажа эл. валюты:', () => {
        it('sellCurrencyRequest - запрос на продажу валюты', () => {
            const nextState = walletReducer({isLoading: false}, sellCurrencyRequest());

            expect(nextState.isLoading).toEqual(false);
        });

        it('sellCurrencySuccess - продажа прошла успешно', () => {
            const action = {
                payload: {
                    currencyName: 'btc',
                    value: 1
                }
            };
            const nextState = walletReducer({coins: action.payload}, sellCurrencySuccess(action.payload));

            expect(nextState.coins).toEqual(action.payload);
        });

        it('sellCurrencyFailure - ошибка продажи', () => {
            const error = new Error('New error');
            const nextState = walletReducer({error: error}, sellCurrencyFailure(error));

            expect(nextState.error).toEqual(error);
        });
    });
});