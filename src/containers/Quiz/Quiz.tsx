import React, { Component } from 'react';
import { ActiveQuiz } from '../../components/ActiveQuiz';
import { State } from '../../utils/interfaces';
import { FinishedQuiz } from '../../components/FinishedQuiz';
import axios from '../../utils/api';
import './_Quiz.scss';
import { Loader } from '../../components/UI/Loader';

export class Quiz extends Component<any, any> {
  state = {
    isFinished: false,
    activeQuestion: 0,
    loading: true,
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

  async componentDidMount() {
    try {
      const response = await axios.get(`quizzes/${this.props.match.params.id}.json`);
      const quiz = response.data;

      this.setState({
        quiz,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  onAnswerClickHandler = (answerId: number) => {
    const { answerState, activeQuestion, quiz } = this.state;

    if (answerState.result === 'success') {
      return;
    }

    const question = quiz[activeQuestion];

    if (question.rightAnswerId === answerId) {
      if (question.result !== 'error') {
        question.result = 'success';
      }

      this.setState({
        answerState: {
          id: answerId,
          result: 'success',
        },
      });

      const timeout = setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState((prevState: State) => ({
            activeQuestion: prevState.activeQuestion + 1,
            answerState: {},
          }));
        }

        clearTimeout(timeout);
      }, 1000);
    } else {
      question.result = 'error';

      this.setState({
        answerState: {
          id: answerId,
          result: 'error',
        },
      });
    }
  };

  retryHandler = () => {
    this.setState((prevState: State) => ({
      ...prevState,
      activeQuestion: 0,
      answerState: {},
      isFinished: false,
      quiz: [...prevState.quiz].map(item => {
        return {
          ...item,
          result: '',
        };
      }),
    }));
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  render() {
    const { quiz, activeQuestion, answerState } = this.state;

    return (
      <div className="quiz">
        <div className="quiz__container">
          <h1 className="quiz__title">Answer to all questions</h1>
          { this.state.loading
            ? <Loader />
            : this.state.isFinished
              ? (
                <FinishedQuiz
                  quiz={quiz}
                  onRetry={this.retryHandler}
                />
              )
              : (
                <ActiveQuiz
                  answers={quiz[activeQuestion].answers}
                  question={quiz[activeQuestion].question}
                  quizLength={quiz.length}
                  answerNumber={activeQuestion + 1}
                  answerState={answerState}
                  onAnswerClick={this.onAnswerClickHandler}
                />
              )}
          {}
        </div>
      </div>
    );
  }
}
