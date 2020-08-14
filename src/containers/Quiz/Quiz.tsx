import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { ActiveQuiz } from '../../components/ActiveQuiz';
import {
  AppState,
  AnswerState,
  Question,
} from '../../utils/interfaces';
import { FinishedQuiz } from '../../components/FinishedQuiz';
import { Loader } from '../../components/UI/Loader';
import {
  fetchQuizById as fetchQuizByIdAction,
  quizAnswerClick as quizAnswerClickAction,
  retryQuiz as retryQuizAction,
} from '../../store/actions/quizAction';
import './_Quiz.scss';

interface StateProps {
  isFinished: boolean;
  activeQuestion: number;
  loading: boolean;
  answerState: AnswerState;
  quiz: Question[];
  match: any;
}

interface DispatchProps {
  fetchQuizById: (id: number) => void;
  quizAnswerClick: (answerId: number) => void;
  retryQuiz: () => void;
}

type Props = StateProps & DispatchProps;

const QuizTemplate: FC<Props> = ({
  isFinished,
  activeQuestion,
  loading,
  answerState,
  quiz,
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
  match,
}) => {
  useEffect(() => {
    fetchQuizById(match.params.id);

    return () => {
      retryQuiz();
    };
  }, [fetchQuizById]);

  return (
    <div className="quiz">
      <div className="quiz__container">
        <h1 className="quiz__title">Answer to all questions</h1>
        {/* eslint-disable-next-line no-nested-ternary */}
        {loading || !quiz.length
          ? <Loader />
          : (
            isFinished
              ? (
                <FinishedQuiz
                  quiz={quiz}
                  onRetry={retryQuiz}
                />
              )
              : (
                <ActiveQuiz
                  answers={quiz[activeQuestion].answers}
                  question={quiz[activeQuestion].question}
                  quizLength={quiz.length}
                  answerNumber={activeQuestion + 1}
                  answerState={answerState}
                  onAnswerClick={quizAnswerClick}
                />
              ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  isFinished: state.quiz.isFinished,
  activeQuestion: state.quiz.activeQuestion,
  loading: state.quiz.loading,
  answerState: state.quiz.answerState,
  quiz: state.quiz.quiz,
});

const mapDispatchToProps = {
  fetchQuizById: fetchQuizByIdAction,
  quizAnswerClick: quizAnswerClickAction,
  retryQuiz: retryQuizAction,
};

export const Quiz = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuizTemplate);
