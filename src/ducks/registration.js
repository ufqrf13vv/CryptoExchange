import { handleActions, createActions } from 'redux-actions';

const {
    registrationRequest,
    registrationSuccess,
    registrationFailure
    } = createActions(
    'REGISTRATION_REQUEST',
    'REGISTRATION_SUCCESS',
    'REGISTRATION_FAILURE'
);

const initialState = {
    isRegistered: false,
    regError: null
};

export default handleActions(
    {
        [registrationRequest]: (state, action) => ({
            ...state
        }),

        [registrationSuccess]: (state, action) => ({
            ...state,
            isRegistered: true
        }),

        [registrationFailure]: (state, action) => ({
            ...state,
            regError: action.payload
        })
    },
    initialState
)

export { registrationRequest, registrationSuccess, registrationFailure };

export const getIsRegistered = state => state.registration.isRegistered;
export const getRegError = state => state.registration.regError;