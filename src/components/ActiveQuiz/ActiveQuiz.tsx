import React, { FC } from 'react';
import {Answer, AnswerState} from "../../utils/interfaces";
import './_ActiveQuiz.scss';
import {AnswersList} from "../AnswersList";

interface Props {
  answers: Answer[];
  question: string;
  quizLength: number;
  answerNumber: number;
  answerState: AnswerState;
}

export const ActiveQuiz: FC<Props> = ({
  answers,
  question,
  quizLength,
  answerNumber,
  answerState
}) => {
  return (
    <div className="active-quiz">
      <p className="active-quiz__question">
        <span>
          <strong>{`${answerNumber}. `}</strong>
          &nbsp;
          {question}
        </span>
        <small>
          {`${answerNumber} from ${quizLength}`}
        </small>
      </p>
        <AnswersList
          answers={answers}
          answerState={answerState}
        />
    </div>
  )
}
