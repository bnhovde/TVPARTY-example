import React, { Component } from 'react';
import autoBind from 'react-autobind';

// Components
import Screen from './../../../Primitives/Screen';
import { H1, H2 } from './../../../Primitives/H';
import Block from './../../../Primitives/Block';
import { Button } from './../../../Primitives/Button';

// TEMP
const greetings = ['Sweet!', 'himalaya', 'oh dear'];

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }

  componentDidMount() {
    this.props.socket.on('event', data => {
      console.log('splash screen message!', data);
      if (data.type === 'speak') {
        this.props.speak(data.message);
      }
      if (data.type === 'greetPlayer') {
        const randomGreeting =
          greetings[Math.floor(Math.random() * greetings.length)];
        this.props.speak(`${data.name} has joined the game! ${randomGreeting}`);
      }
    });
  }

  render() {
    const { players = {}, gameCode = '' } = this.props.gameData;
    return (
      <Screen>
        <H1>Let`s drink!</H1>
        <p>Game code: {gameCode}</p>
        <Block top={1}>
          <H2>Connected players:</H2>
          {Object.keys(players).map(p => <p key={p}>{players[p].name}</p>)}
        </Block>
        <Block top={1}>
          <p>Press "start" once everyone is in!</p>
        </Block>
      </Screen>
    );
  }
}

export default SplashScreen;
