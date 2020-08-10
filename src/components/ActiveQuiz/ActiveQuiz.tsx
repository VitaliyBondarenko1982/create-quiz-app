import React, { FC } from 'react';
import { Answer, AnswerState } from '../../utils/interfaces';
import { AnswersList } from '../AnswersList';
import './_ActiveQuiz.scss';

interface Props {
  answers: Answer[];
  question: string;
  quizLength: number;
  answerNumber: number;
  answerState: AnswerState;
  onAnswerClick: (id: number) => void;
}

export const ActiveQuiz: FC<Props> = ({
  answers,
  question,
  quizLength,
  answerNumber,
  answerState,
  onAnswerClick,
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
        onAnswerClick={onAnswerClick}
      />
    </div>
  );
};
