import React, {Component} from 'react';
import {ActiveQuiz} from "../components/ActiveQuiz";
import './_Quiz.scss';

export class Quiz extends Component {
  state = {
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
    ]
  }

  render() {
    const { quiz, activeQuestion, answerState } = this.state;

    return (
      <div className="quiz">
        <div className="quiz__container">
          <h1 className="quiz__title">Answer to all questions</h1>
          <ActiveQuiz
            answers={quiz[activeQuestion].answers}
            question={quiz[activeQuestion].question}
            quizLength={quiz.length}
            answerNumber={activeQuestion + 1}
            answerState={answerState}
          />
        </div>
      </div>
    )
  }
}
