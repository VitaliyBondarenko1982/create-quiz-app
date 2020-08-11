import React, { Component } from 'react';
import { ActiveQuiz } from '../components/ActiveQuiz';
import { State } from '../utils/interfaces';
import './_Quiz.scss';
import {FinishedQuiz} from "../components/FinishedQuiz";

export class Quiz extends Component {
  state = {
    isFinished: false,
    activeQuestion: 0,
    answerState: {
      id: 0,
      result: '',
    },
    quiz: [
      {
        question: 'The capital of Ukraine is...?',
        rightAnswerId: 2,
        id: 1,
        result: '',
        answers: [
          { text: 'Lviv', id: 1 },
          { text: 'Kyiv', id: 2 },
          { text: 'Odesa', id: 3 },
          { text: 'Konotop', id: 4 },
        ],
      },
      {
        question: 'London is the capital of...',
        rightAnswerId: 3,
        id: 2,
        result: '',
        answers: [
          { text: 'France', id: 1 },
          { text: 'Denmark', id: 2 },
          { text: 'Great Britain', id: 3 },
          { text: 'Italy', id: 4 },
        ],
      },
    ],
  };

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

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  render() {
    const { quiz, activeQuestion, answerState } = this.state;

    return (
      <div className="quiz">
        <div className="quiz__container">
          <h1 className="quiz__title">Answer to all questions</h1>
          {this.state.isFinished
            ? (
              <FinishedQuiz
                quiz={quiz}
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
        </div>
      </div>
    );
  }
}
