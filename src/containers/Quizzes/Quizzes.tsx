import React, { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { StateApp, QuizInterface } from '../../utils/interfaces';
import { Loader } from '../../components/UI/Loader';
import { fetchQuizzes as fetchQuizzesAction } from '../../store/actions/quizAction';
import './_Quizzes.scss';

interface StateProps {
  quizzes: QuizInterface[];
  loading: boolean;
}

interface DispatchProps {
  fetchQuizzes: () => void;
}

type Props = StateProps & DispatchProps;

const QuizzesTemplate: FC<Props> = ({
  quizzes,
  loading,
  fetchQuizzes,
}) => {
  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const renderQuizzes = () => {
    return quizzes.map((quiz) => {
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

  return (
    <div className="quizzes">
      <div className="quizzes_container">
        <h1 className="quizzes__title">Tests</h1>
        {loading && quizzes.length ? (
          <Loader />
        ) : (
          <ul className="quizzes__list">
            {renderQuizzes()}
          </ul>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: StateApp) => ({
  quizzes: state.quiz.quizzes,
  loading: state.quiz.loading,
});

const mapDispatchToProps = {
  fetchQuizzes: fetchQuizzesAction,
};

export const Quizzes = connect(mapStateToProps, mapDispatchToProps)(QuizzesTemplate);
