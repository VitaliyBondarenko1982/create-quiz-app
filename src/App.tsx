import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './HOC';
import { Quiz } from './containers/Quiz';
import { Quizzes } from './containers/Quizzes';
import { Auth } from './containers/Auth';
import './_App.scss';
import { QuizCreator } from './containers/QuizCreator';

const App = () => (
  <div className="App">
    <Layout>
      <Quiz />
      <Switch>
        <Route path="/" component={Quizzes} exact />
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/quiz-creator" component={QuizCreator} />
      </Switch>
    </Layout>
  </div>
);

export default App;
