import React, { Component } from 'react';
import autoBind from 'react-autobind';

// Components
import { FullScreen } from './../../../Primitives/Screen';
import HeaderBar from './../../../Components/HeaderBar';
import { H2 } from './../../../Primitives/H';
import Block from './../../../Primitives/Block';
import { TextBold } from './../../../Primitives/Text';
import HeinoFull from './../Components/HeinoFull';
import Spinner from './../Components/Spinner';
import PlayerScores from './../Components/PlayerScores';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }

  componentDidMount() {
    this.props.socket.on('event', data => {
      if (data.type === 'speak') {
        this.props.speak(data.message);
      }
    });
  }

  render() {
    const { players = {}, gameCode = '' } = this.props.gameData;
    return (
      <FullScreen>
        <HeaderBar
          title="Let's drink!"
          subTitle="TVPARTY presents"
          gameCode={gameCode}
        />
        <Block>
          <PlayerScores players={players} currentPlayer={players[0]} />
          <Spinner />
          <HeinoFull />
        </Block>
      </FullScreen>
    );
  }
}

export default GameScreen;
