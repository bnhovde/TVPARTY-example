import React, { Component } from 'react';
import autoBind from 'react-autobind';

// Components
import { FullScreen } from './../../../Primitives/Screen';
import HeaderBar from './../../../Components/HeaderBar';
import { H2 } from './../../../Primitives/H';
import Block from './../../../Primitives/Block';
import { TextBold } from './../../../Primitives/Text';
import HeinoPeeker from './../Components/HeinoPeeker';
import SpinningBeer from './../Components/SpinningBeer';

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

  componentWillUnmount() {
    // Remove event listeners
    this.props.socket.off('event');
  }

  render() {
    const { players = {}, gameCode = '' } = this.props.gameData;
    return (
      <FullScreen>
        <HeaderBar
          title="Let's drink!"
          subTitle="Score points and become Heino"
          gameCode={gameCode}
        />
        <Block top={1}>
          <H2>Connected players:</H2>
        </Block>
        <Block top={0.5}>
          {Object.keys(players).map(p => (
            <div key={p}>
              <TextBold>{players[p].name}</TextBold>
            </div>
          ))}
        </Block>
        <Block top={2}>
          <p>Press START once everyone is in!</p>
        </Block>
        <SpinningBeer />
        <HeinoPeeker />
      </FullScreen>
    );
  }
}

export default SplashScreen;
