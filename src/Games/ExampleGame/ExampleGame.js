import React, { Component } from 'react';
import autoBind from 'react-autobind';

import GameWrapper from './../../Containers/GameWrapper';

class ExampleGame extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>ExampleGame!</h1>
      </div>
    );
  }
}

export default GameWrapper(ExampleGame);
