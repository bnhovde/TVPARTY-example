import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../../Containers/Dashboard';
import Game from '../../Containers/Game';

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Dashboard} />
      <Route path="/game/:gameCode" component={Game} />
    </main>
  </div>
);

export default App;
