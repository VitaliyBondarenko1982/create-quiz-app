import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import cx from 'classnames';
import { Question } from '../../utils/interfaces';
import { Button } from '../UI/Button/Button';
import './_FinishedQuiz.scss';

interface Props {
  quiz: Question[];
  onRetry: () => void;
}

export const FinishedQuiz: FC<Props> = ({
  quiz,
  onRetry,
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
        <Button
          buttonType="primary"
          onClick={onRetry}
          disabled={false}
        >
          Repeat
        </Button>
        <Link to="/">
          <Button
            buttonType="success"
            disabled={false}
          >
            All tests
          </Button>
        </Link>
      </div>
    </div>
  );
};
