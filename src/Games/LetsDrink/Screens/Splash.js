import React, { Component } from 'react';
import autoBind from 'react-autobind';

// Components
import Screen from './../../../Primitives/Screen';
import { H1, H2 } from './../../../Primitives/H';
import Block from './../../../Primitives/Block';
import { Button } from './../../../Primitives/Button';

// TEMP
const greetings = ['Tight!', 'Time to party', 'uh-oh'];

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    // If a new player has connected, greet!
    const { players, gameCode, chats } = nextProps.gameData;
    const newPlayerId = Object.keys(players).find(p => !players[p].isGreeted);
    if (chats) {
      const newGameData = {
        ...nextProps.gameData,
        chats: [],
      };
      this.props.speak(chats[0]);
      this.props.updateGameData(gameCode, newGameData);
    }
    if (newPlayerId) {
      const randomGreeting =
        greetings[Math.floor(Math.random() * greetings.length)];
      const newPlayerData = { ...players[newPlayerId], isGreeted: true };
      this.props.speak(
        `${players[newPlayerId].name} has joined the game! ${randomGreeting}`,
      );
      this.props.updatePlayerData(gameCode, newPlayerId, newPlayerData);
    }
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
