import React, { Component } from 'react';
import autoBind from 'react-autobind';

// Components
import Screen from './../../Primitives/Screen';
import { H1, H2 } from './../../Primitives/H';
import Block from './../../Primitives/Block';

class LetsDrink extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }

  componentDidMount() {
    // If not host, add player to game
    this.props.speak("Welcome to let's drink!");
    this.props.addPlayer(this.props.gameData.code, { name: 'bobbs' });
  }

  render() {
    const { players = {}, code = '' } = this.props.gameData;
    return (
      <Screen>
        <H1>Let`s drink!</H1>
        <p>Game code: {code}</p>
        <Block top={1}>
          <H2>Connected players:</H2>
          {Object.keys(players).map(p => <p>{players[p].name}</p>)}
        </Block>
      </Screen>
    );
  }
}

export default LetsDrink;
