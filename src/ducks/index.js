import { combineReducers } from 'redux';
import auth from './auth';
import registration from './registration';
import currency from './currency';
import wallet from './wallet';
import user from './user';
import transactions from './transactions';
import feed from './feed';

export default combineReducers({ auth, registration, currency, wallet, user, transactions, feed });