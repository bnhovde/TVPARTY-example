import React from 'react';
import { Route, Link } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard';
import About from '../../Pages/About';
import Game from '../../Pages/Game';

const App = () => (
  <div>
    <header>
      <Link to="/">Dashboard</Link>
      <Link to="/about">About</Link>
    </header>

    <main>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/about" component={About} />
      <Route path="/game/:roomKey" component={Game} />
    </main>
  </div>
);

export default App;
