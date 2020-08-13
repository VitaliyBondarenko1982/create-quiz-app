import { AnyAction } from 'redux';
import {
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  quizzes: [
    { id: Math.random().toString(), name: '' },
  ],
  loading: true,
};

export const quizReducer = (
  state = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case FETCH_QUIZZES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUIZZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizzes: action.quizzes,
      };
    case FETCH_QUIZZES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
