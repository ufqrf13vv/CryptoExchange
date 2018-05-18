import userReducer, { getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure } from '../user';

describe('User reducers:', () => {
    it('getUserInfoRequest - запрос на получение данных о трпользователе', () => {
        const nextState = userReducer({isLoading: true}, getUserInfoRequest());

        expect(nextState.isLoading).toEqual(true);
    });

    it('getUserInfoSuccess - данные успешно получены', () => {
        const action = {
            payload: [
                {
                    id: 1,
                    email: 'mail@mail.ru'
                }
            ]
        };
        const nextState = userReducer({ info: action.payload }, getUserInfoSuccess(action.payload));

        expect(nextState.info).toEqual(action.payload);
    });

    it('getUserInfoFailure - ошибка', () => {
        const error = new Error('New error');
        const nextState = userReducer({error: error}, getUserInfoFailure(error));

        expect(nextState.error).toEqual(error);
    });
});