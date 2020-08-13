import { Dispatch } from 'redux';
import axios from '../../utils/api';
import { QuizInterface } from '../../utils/interfaces';
import {
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
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
