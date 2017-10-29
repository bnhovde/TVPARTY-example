import React from 'react';
import { Route, Link } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard';
import About from '../../Pages/About';

const App = () => (
  <div>
    <header>
      <Link to="/">Dashboard</Link>
      <Link to="/about">About</Link>
    </header>

    <main>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/about" component={About} />
    </main>
  </div>
);

export default App;
