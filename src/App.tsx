import React from 'react';
import { Layout } from './HOC';
import { Quiz } from './containers/Quiz';
import './_App.scss';

const App = () => (
  <div className="App">
    <Layout>
      <Quiz />
    </Layout>
  </div>
);

export default App;
