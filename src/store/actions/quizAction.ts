import { Dispatch } from 'redux';
import axios from '../../utils/api';
import {
  AppState,
  QuizInterface,
  Question, AnswerState,
} from '../../utils/interfaces';
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
} from './actionTypes';

export const fetchQuizzesStart = () => ({
  type: FETCH_QUIZZES_START,
});

export const fetchQuizzesSuccess = (quizzes: QuizInterface[]) => ({
  type: FETCH_QUIZZES_SUCCESS,
  quizzes,
});

export const fetchQuizzesError = (error: any) => ({
  type: FETCH_QUIZZES_ERROR,
  error,
});

export const fetchQuizSuccess = (quiz: Question) => ({
  type: FETCH_QUIZ_SUCCESS,
  quiz,
});

export const quizSetState = (answerState: AnswerState, result: string) => ({
  type: QUIZ_SET_STATE,
  answerState,
  result,
});

export const finishQuiz = () => ({
  type: FINISH_QUIZ,
});

export const quizNextQuestion = (questionNumber: number) => ({
  type: QUIZ_NEXT_QUESTION,
  questionNumber,
});

export const retryQuiz = () => ({
  type: QUIZ_RETRY,
});

export const fetchQuizzes = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchQuizzesStart());

    try {
      const response = await axios.get('quizzes.json');
      const quizzes: QuizInterface[] = [];

      Object.keys(response.data).forEach((key, index) => {
        quizzes.push({
          id: key,
          name: `Test #${index + 1}`,
        });
      });

      dispatch(fetchQuizzesSuccess(quizzes));
    } catch (e) {
      dispatch(fetchQuizzesError(e));
    }
  };
};

export const fetchQuizById = (quizId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchQuizzesStart());
    try {
      const response = await axios.get(`quizzes/${quizId}.json`);
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      console.log(e);
    }
  };
};

export const quizAnswerClick = (answerId: number) => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const { answerState, activeQuestion, quiz } = getState().quiz;

    if (answerState.result === 'success') {
      return;
    }

    const question = quiz[activeQuestion];

    const isQuizFinished = () => {
      return activeQuestion + 1 === quiz.length;
    };

    if (question.rightAnswerId === answerId) {
      if (question.result !== 'error') {
        question.result = 'success';
      }

      dispatch(quizSetState({
        id: answerId,
        result: 'success',
      }, question.result));

      const timeout = setTimeout(() => {
        if (isQuizFinished()) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(activeQuestion + 1));
        }

        clearTimeout(timeout);
      }, 1000);
    } else {
      question.result = 'error';

      dispatch(quizSetState({
        id: answerId,
        result: 'error',
      }, question.result));
    }
  };
};
