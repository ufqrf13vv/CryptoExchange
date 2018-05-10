import { combineReducers } from 'redux';
import auth from './auth';
import registration from './registration';

export default combineReducers({ auth, registration });