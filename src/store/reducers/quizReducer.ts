import { AnyAction } from 'redux';
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
  QUIZ_SET_STATE,
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
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        quiz: state.quiz
          .map((question, index) => {
            return state.activeQuestion === index
              ? {
                ...question,
                result: action.result,
              } : {
                ...question,
              };
          }),
      };
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true,
        activeQuestion: 0,
      };
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: action.questionNumber,
        answerState: {
          id: 0,
          result: '',
        },
      };
    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        isFinished: false,
        answerState: {
          id: 0,
          result: '',
        },
        quiz: state.quiz.map(question => {
          return {
            ...question,
            result: '',
          };
        }),
      };
    default:
      return state;
  }
};
