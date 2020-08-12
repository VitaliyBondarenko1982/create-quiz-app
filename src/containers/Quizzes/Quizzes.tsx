import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { QuizzesInterface } from '../../utils/interfaces';
import { Loader } from '../../components/UI/Loader';
import axios from '../../utils/api';
import './_Quizzes.scss';

export class Quizzes extends Component {
  state = {
    quizzes: [
      { id: Math.random().toString(), name: '' },
    ],
    loading: true,
  };

  async componentDidMount() {
    try {
      const response = await axios.get('quizzes.json');
      const quizzes: QuizzesInterface[] = [];

      Object.keys(response.data).forEach((key, index) => {
        quizzes.push({
          id: key,
          name: `Test #${index + 1}`,
        });
      });

      this.setState({
        quizzes,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  renderQuizzes = () => {
    return this.state.quizzes.map((quiz) => {
      return (
        <li className="quizzes__item" key={quiz.id}>
          <NavLink
            to={`quiz/${quiz.id}`}
            className="quizzes__link"
          >
            {quiz.name}
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
          {this.state.loading ? (
            <Loader />
          ) : (
            <ul className="quizzes__list">
              {this.state.quizzes.length ? this.renderQuizzes() : null}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
