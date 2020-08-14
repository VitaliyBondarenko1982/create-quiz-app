import { Dispatch } from 'redux';
import { AppState, Question } from '../../utils/interfaces';
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from './actionTypes';
import axios from '../../utils/api';

export const createQuizQuestion = (item: Question) => ({
  type: CREATE_QUIZ_QUESTION,
  item,
});

export const resetQuizCreation = () => ({
  type: RESET_QUIZ_CREATION,
});

export const finishCreateQuiz = () => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const state = getState();

    await axios.post('quizzes.json', state.create.quiz);
    dispatch(resetQuizCreation());
  };
};
