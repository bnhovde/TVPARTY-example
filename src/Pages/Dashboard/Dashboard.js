import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }

  startNewGame() {
    console.log('test');
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome!!</p>
        <button onClick={() => this.startNewGame()}>Start new game</button>
        <button onClick={() => this.joinGame()}>Join existing game</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push('/about-us'),
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Dashboard);
