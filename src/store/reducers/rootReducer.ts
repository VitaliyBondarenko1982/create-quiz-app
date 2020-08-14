import { combineReducers } from 'redux';
import { quizReducer } from './quizReducer';
import { createReducer } from './createReducer';

export const rootReducer = combineReducers({
  quiz: quizReducer,
  create: createReducer,
});
