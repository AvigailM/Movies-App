/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import moviesReducer from './store/reducers/movies';
import authReducer from './store/reducers/auth';
import AppNavigator from './navigation/AppNavigator';
import logger from 'redux-logger'

const rootReducer = combineReducers({
  movies: moviesReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk,logger));

export const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};


export default App;
