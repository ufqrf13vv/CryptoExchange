import registerWatch, { registerFlow } from '../registration';
import { takeLatest, call, put } from 'redux-saga/effects';
import { registrationRequest, registrationSuccess, registrationFailure } from '../ducks/registration';
import { authSuccess } from '../ducks/auth';
import { registration, setTokenApi } from '../helpers/api';
import { setTokenToLocalStorage } from '../helpers/localStorage';