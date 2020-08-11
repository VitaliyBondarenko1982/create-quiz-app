import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './_Quizzes.scss';

export class Quizzes extends Component {
  renderQuizzes = () => {
    return [1, 2, 3].map((quiz) => {
      return (
        <li className="quizzes__item" key={uuidv4()}>
          <NavLink
            to={`quiz/${quiz}`}
            className="quizzes__link"
          >
            {`Test #${quiz}`}
          </NavLink>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="quizzes">
        <div className="quizzes_container">
          <h1 className="quizzes__title">Tests</h1>
          <ul className="quizzes__list">
            {this.renderQuizzes()}
          </ul>
        </div>
      </div>
    );
  }
}
