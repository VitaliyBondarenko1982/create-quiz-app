import { combineReducers } from 'redux';
import { quizReducer } from './quizReducer';
import { createReducer } from './createReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer,
});
