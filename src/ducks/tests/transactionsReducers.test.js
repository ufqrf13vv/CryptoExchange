import transactionsReducer, {
    fetchUserTransactionsRequest,
    fetchUserTransactionsSuccess,
    fetchUserTransactionsFailure
} from '../transactions';

describe('Transactions reducers:', () => {
    it('Action authRequest - запрос на получение данных о транзакциях пользователя', () => {
        const nextState = transactionsReducer({isLoading: true}, fetchUserTransactionsRequest());

        expect(nextState.isLoading).toEqual(true);
    });

    it('Action authSuccess - пользователь авторизован (isAuthorize = true)', () => {
        const action = {
            payload: [
                {
                    id: 1,
                    usd_delta: 8220.0195,
                    btc_delta: -1
                }
            ]
        };
        const nextState = transactionsReducer({ transactions: action.payload }, fetchUserTransactionsSuccess(action.payload));

        expect(nextState.transactions).toEqual(action.payload);
    });

    it('Action authFailure - ошибка авторизации', () => {
        const error = new Error('New error');
        const nextState = transactionsReducer({error: error}, fetchUserTransactionsFailure(error));

        expect(nextState.error).toEqual(error);
    });
});