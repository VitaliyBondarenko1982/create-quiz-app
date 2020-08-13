import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { ActiveQuiz } from '../../components/ActiveQuiz';
import {
  AppState,
  AnswerState,
  QuizWithDetails,
} from '../../utils/interfaces';
import { FinishedQuiz } from '../../components/FinishedQuiz';
import { Loader } from '../../components/UI/Loader';
import { fetchQuizById as fetchQuizByIdAction } from '../../store/actions/quizAction';
import './_Quiz.scss';

interface StateProps {
  isFinished: boolean;
  activeQuestion: number;
  loading: boolean;
  answerState: AnswerState;
  quiz: QuizWithDetails[];
  match: any;
}

interface DispatchProps {
  fetchQuizById: (id: number) => void;
}

type Props = StateProps & DispatchProps;

const QuizTemplate: FC<Props> = ({
  isFinished,
  activeQuestion,
  loading,
  answerState,
  quiz,
  match,
  fetchQuizById,
}) => {
  useEffect(() => {
    fetchQuizById(match.params.id);
  }, [fetchQuizById]);

  // const onAnswerClickHandler = (answerId: number) => {
  //   // const {answerState, activeQuestion, quiz} = state;
  //
  //   if (answerState.result === 'success') {
  //     return;
  //   }
  //
  //   const question = quiz[activeQuestion];
  //
  //   if (question.rightAnswerId === answerId) {
  //     if (question.result !== 'error') {
  //       question.result = 'success';
  //     }
  //
  //     this.setState({
  //       answerState: {
  //         id: answerId,
  //         result: 'success',
  //       },
  //     });

  //     const timeout = setTimeout(() => {
  //       if (isQuizFinished()) {
  //         this.setState({
  //           isFinished: true,
  //         });
  //       } else {
  //         this.setState((prevState: State) => ({
  //           activeQuestion: prevState.activeQuestion + 1,
  //           answerState: {},
  //         }));
  //       }
  //
  //       clearTimeout(timeout);
  //     }, 1000);
  //   } else {
  //     question.result = 'error';
  //
  //     setState({
  //       answerState: {
  //         id: answerId,
  //         result: 'error',
  //       },
  //     });
  //   }
  // };

  // const retryHandler = () => {
  //   setState((prevState: State) => ({
  //     ...prevState,
  //     activeQuestion: 0,
  //     answerState: {},
  //     isFinished: false,
  //     quiz: [...prevState.quiz].map(item => {
  //       return {
  //         ...item,
  //         result: '',
  //       };
  //     }),
  //   }));
  // };

  // const isQuizFinished = () => {
  //   return this.state.activeQuestion + 1 === this.state.quiz.length;
  // };

  // const { quiz, activeQuestion, answerState } = this.state;

  return (
    <div className="quiz">
      <div className="quiz__container">
        <h1 className="quiz__title">Answer to all questions</h1>
        {/* eslint-disable-next-line no-nested-ternary */}
        {loading && quiz
          ? <Loader />
          : (
            isFinished
              ? (
                <FinishedQuiz
                  quiz={quiz}
                  onRetry={() => console.log('Hello')}
                />
              )
              : (
                <ActiveQuiz
                  answers={quiz[activeQuestion].answers}
                  question={quiz[activeQuestion].question}
                  quizLength={quiz.length}
                  answerNumber={activeQuestion + 1}
                  answerState={answerState}
                  onAnswerClick={() => console.log('Hello')}
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
};

export const Quiz = connect(mapStateToProps, mapDispatchToProps)(QuizTemplate);
