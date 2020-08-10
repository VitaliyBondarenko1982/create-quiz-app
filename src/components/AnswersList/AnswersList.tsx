import React, { FC } from 'react';
import { Answer, AnswerState } from '../../utils/interfaces';
import { AnswerItem } from '../AnswerItem';
import './_AnswersList.scss';

interface Props {
  answers: Answer[];
  answerState: AnswerState;
  onAnswerClick: (id: number) => void;
}

export const AnswersList: FC<Props> = ({
  answers,
  answerState,
  onAnswerClick,
}) => {
  return (
    <div className="answer answers__list">
      {answers.map(answer => {
        const answerStateResult = () => {
          if (answerState && answerState.id === answer.id) {
            return answerState.result;
          }

          return null;
        };

        return (
          <AnswerItem
            key={answer.id}
            answer={answer}
            answerState={answerStateResult()}
            onAnswerClick={onAnswerClick}
          />
        );
      })}
    </div>
  );
};
