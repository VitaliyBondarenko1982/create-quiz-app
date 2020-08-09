import React, {FC} from 'react';
import './_AnswersList.scss';
import {Answer} from "../../utils/interfaces";
import {AnswerItem} from "../AnswerItem";

interface Props {
  answers: Answer[];
  answerState: {
    [id: number]: string;
  } | null;
}

export const AnswersList: FC<Props> = ({
  answers,
  answerState
}) => {
  return (
    <div className="answer answers__list">
      {answers.map(answer => {
        return (
          <AnswerItem
            key={answer.id}
            answer={answer}
            answerState={answerState ? answerState[answer.id] : null}
          />
        );
      })}
    </div>
  )
}
