import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

// Redux
import { playAudio } from './../../store/audio';
import { create } from './../../store/games';

// Helpers
import { generateGameCode } from './../../utilities/helpers';
import games from './../../constants/games';

// Components
import JoinGameForm from './../../Components/JoinGameForm';
import Drawer from './../../Components/Drawer';
import Toggle from './../../Components/Toggle';
import { H1 } from './../../Primitives/H';
import { Button } from './../../Primitives/Button';
import Block from './../../Primitives/Block';
import Screen from './../../Primitives/Screen';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      fields: {
        gameType: games[0].id,
        gameCode: '',
        userName: '',
      },
      overlayVisible: false,
    };
  }

  handleJoinGame() {
    const { gameCode, userName } = this.state.fields;
    // TO-DO: Check that game exists, and that username is available
    this.props.welcomeMessage(userName);
    this.props.startGame(gameCode);
  }

  startNewGame() {
    const { gameType } = this.state.fields;
    const gameCode = generateGameCode();
    this.props.createGame(gameCode, gameType).then(() => {
      this.props.startGame(gameCode);
    });
  }

  handleChange(key, value) {
    this.setState({
      fields: Object.assign({}, this.state.fields, {
        [key]: value,
      }),
    });
  }

  handleCancel(e) {
    e.preventDefault();
    this.setState({
      overlayVisible: false,
    });
  }

  joinGame() {
    this.setState({
      overlayVisible: true,
    });
  }

  render() {
    const { gameCode, userName, gameType } = this.state.fields;

    return (
      <Screen>
        <H1>TVPARTY</H1>

        <Block top={1}>
          <p>Choose a game:</p>
        </Block>

        <Block top={1}>
          <Toggle
            name="gameType"
            items={games}
            selected={gameType}
            onChange={this.handleChange}
          />
        </Block>

        <Block top={1}>
          <Button onClick={() => this.startNewGame()}>Start new game</Button>
        </Block>

        <Block top={1} align="center">
          <p>– OR –</p>
        </Block>

        <Block top={1}>
          <Button onClick={() => this.joinGame()}>Join existing game</Button>
        </Block>

        <Drawer visible={this.state.overlayVisible}>
          <JoinGameForm
            gameCode={gameCode}
            userName={userName}
            onChange={this.handleChange}
            onSubmit={this.handleJoinGame}
            onCancel={this.handleCancel}
          />
        </Drawer>
      </Screen>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createGame: (gameCode, gameType) => dispatch(create(gameCode, gameType)),
    startGame: gameCode => dispatch(push(`/host/${gameCode}`)),
    welcomeMessage: name =>
      dispatch(playAudio(`${name} has joined the game! Tight!`)),
  };
}

export default connect(null, mapDispatchToProps)(Dashboard);
