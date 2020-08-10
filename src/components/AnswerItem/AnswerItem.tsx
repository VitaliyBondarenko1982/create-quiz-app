import React, { FC } from 'react';
import cx from 'classnames';
import { Answer } from '../../utils/interfaces';
import './_AnswerItem.scss';

interface Props {
  answer: Answer;
  answerState: string | null;
  onAnswerClick: (id: number) => void;
}

export const AnswerItem: FC<Props> = ({
  answer,
  answerState,
  onAnswerClick,
}) => {
  return (
    <button
      type="button"
      className={cx('answer__item', answerState)}
      onClick={() => onAnswerClick(answer.id)}
    >
      {answer.text}
    </button>
  );
};
