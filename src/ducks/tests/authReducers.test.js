import authReducer, { authRequest, authSuccess, authFailure } from '../auth';

describe('Auth reducers:', () => {
    it('authRequest - запрос на авторизацию пользователя', () => {
        const nextState = authReducer({isAuthorize: false}, authRequest());

        expect(nextState.isAuthorize).toEqual(false);
    });

    it('authSuccess - пользователь авторизован (isAuthorize = true)', () => {
        const nextState = authReducer({isAuthorize: true}, authSuccess());

        expect(nextState.isAuthorize).toEqual(true);
    });

    it('authFailure - ошибка авторизации', () => {
        const error = new Error('Auth error');
        const nextState = authReducer({loginError: null}, authFailure(error));

        expect(nextState.loginError).toEqual(error);
    });
});