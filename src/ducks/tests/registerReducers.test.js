import registerReducer, { registrationRequest, registrationSuccess, registrationFailure } from '../registration';

describe('Reducers auth:', () => {
    it('Action registrationRequest - запрос на регистрацию пользователя', () => {
        const nextState = registerReducer({isRegistered: false}, registrationRequest());

        expect(nextState.isRegistered).toEqual(false);
    });

    it('Action registrationSuccess - пользователь зарегистрирован (isAuthorize = true)', () => {
        const nextState = registerReducer({isRegistered: true}, registrationSuccess());

        expect(nextState.isRegistered).toEqual(true);
    });

    it('Action registrationFailure - ошибка регистрации', () => {
        const error = new Error('Register error');
        const nextState = registerReducer({regError: null}, registrationFailure(error));

        expect(nextState.regError).toEqual(error);
    });
});