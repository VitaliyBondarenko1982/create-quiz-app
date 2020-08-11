import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './_Quizzes.scss';

export class Quizzes extends Component {
  renderQuizzes = () => {
    return [1, 2, 3].map((quiz) => {
      return (
        <li key={uuidv4()}>
          <NavLink
            to={`quiz/:${quiz}`}
          >
            {`Test #${quiz}`}
          </NavLink>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="quiz-list">
        <div className="quiz-list__container">
          <h1>Tests</h1>
          <ul>
            {this.renderQuizzes()}
          </ul>
        </div>
      </div>
    );
  }
}
