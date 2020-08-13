import { AnyAction } from 'redux';
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  quizzes: [],
  loading: true,
  isFinished: false,
  activeQuestion: 0,
  answerState: {
    id: 0,
    result: '',
  },
  quiz: [
    {
      question: '',
      rightAnswerId: 1,
      id: Infinity,
      result: '',
      answers: [
        { text: '', id: 1 },
        { text: 'Kyiv', id: 2 },
        { text: 'Odesa', id: 3 },
        { text: 'Konotop', id: 4 },
      ],
    },
  ],
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
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
      };
    default:
      return state;
  }
};
