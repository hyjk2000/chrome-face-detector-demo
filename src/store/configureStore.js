import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as reducers from '../reducers';

const middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const configureStore = preloadedState => createStore(
  combineReducers(reducers),
  preloadedState,
  applyMiddleware(...middlewares)
);

export default configureStore;
