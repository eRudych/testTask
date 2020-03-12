import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import user from './components/modules/user/api/state';

const appReducers = combineReducers({ user });

const middlewares = [thunk, logger];

export const store = createStore(appReducers, compose(applyMiddleware(...middlewares)));
