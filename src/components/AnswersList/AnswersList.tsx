import React, {FC} from 'react';
import './_AnswersList.scss';
import {Answer, AnswerState} from "../../utils/interfaces";
import {AnswerItem} from "../AnswerItem";

interface Props {
  answers: Answer[];
  answerState: AnswerState;
}

export const AnswersList: FC<Props> = ({
  answers,
  answerState
}) => {
  return (
    <div className="answer answers__list">
      {answers.map(answer => {
        const answerStateResult = () => {
          if (answerState && answerState.id === answer.id) {
            return answerState.result;
          }

          return null;
        }
        return (
          <AnswerItem
            key={answer.id}
            answer={answer}
            answerState={answerStateResult()}
          />
        );
      })}
    </div>
  )
}
