import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cx from 'classnames';
import './_FinishedQuiz.scss';
import { Question } from '../../utils/interfaces';

interface Props {
  quiz: Question[];
}

export const FinishedQuiz: FC<Props> = ({
  quiz,
}) => {
  const successCount = quiz.filter(quizItem => quizItem.result === 'success');

  return (
    <div className="finished-quiz">
      <ul className="finished-quiz__list">
        {quiz.map((quizItem, index) => {

          const { result } = quizItem;

          return (
            <li key={uuidv4()}>
              <strong>{`${index + 1}`}</strong>
              &nbsp;
              {quizItem.question}
              <i className={cx(
                'fa',
                result === 'success' ? 'fa-check success' : 'fa-times error',
              )}
              />
            </li>
          );
        })}
      </ul>
      <p className="finished-quiz__result">{`Right ${successCount.length} from ${quiz.length}`}</p>
      <div className="finished-quiz__buttons">
        Buttons
      </div>
    </div>
  );
};
