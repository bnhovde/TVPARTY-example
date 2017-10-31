import React, { Component } from 'react';
import autoBind from 'react-autobind';

import GameWrapper from './../../Containers/GameWrapper';

class LetsDrink extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Let\`s drink!</h1>
      </div>
    );
  }
}

export default GameWrapper(LetsDrink);
