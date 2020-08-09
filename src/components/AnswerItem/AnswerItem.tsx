import React, {FC} from 'react';
import cx from 'classnames';
import {Answer} from '../../utils/interfaces';
import './_AnswerItem.scss';


interface Props {
  answer: Answer;
  answerState: string | null;
}

export const AnswerItem: FC<Props> = ({
  answer,
  answerState,
}) => {
  return (
    <button
      type="button"
      className={cx('answer__item', answerState)}
    >
      {answer.text}
    </button>
  )
}
