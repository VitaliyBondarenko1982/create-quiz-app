import React, { FC } from 'react';
import {Answer} from "../../utils/interfaces";
import './_ActiveQuiz.scss';
import {AnswersList} from "../AnswersList";

interface Props {
  answers: Answer[];
  question: string;
  quizLength: number;
  answerNumber: number;
  answerState: {
    [id: number]: string;
  } | null;
}

export const ActiveQuiz: FC<Props> = ({
  answers,
  question,
  quizLength,
  answerNumber,
  answerState
}) => {
  return (
    <div className="active-qiz">
      <p className="active-quiz__question">
        <span>
          <strong>{`${answerNumber}`}</strong>
          &nbsp
          {question}
        </span>
        <small>
          {`${answerNumber} from ${quizLength}`}
        </small>
        <AnswersList
          answers={answers}
          answerState={answerState}
        />
      </p>
    </div>
  )
}
