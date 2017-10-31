import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../../Containers/Dashboard';
import GameClient from '../../Containers/GameClient';
import GameHost from '../../Containers/GameHost';

const App = () => (
  <main>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/:gameCode" component={GameClient} />
    <Route exact path="/host/:gameCode" component={GameHost} />
  </main>
);

export default App;
