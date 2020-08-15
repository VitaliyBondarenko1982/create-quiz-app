import React, { FC, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from './HOC';
import { Quiz } from './containers/Quiz';
import { Quizzes } from './containers/Quizzes';
import { Auth } from './containers/Auth';
import { QuizCreator } from './containers/QuizCreator';
import { AppState } from './utils/interfaces';
import { Logout } from './components/Logout';
import { autoLogin as autoLoginAction } from './store/actions/authAction';
import './_App.scss';

interface StateProps {
  isAuthenticated: boolean;
}

interface DispatchProps {
  autoLogin: () => void;
}

type Props = StateProps & DispatchProps;

const AppTemplate: FC<Props> = ({ isAuthenticated, autoLogin }) => {
  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/" component={Quizzes} exact />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={Quizzes} exact />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <Layout>
        {routes}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: !!state.auth.token,
});

const mapDispatchToProps = {
  autoLogin: autoLoginAction,
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppTemplate);
