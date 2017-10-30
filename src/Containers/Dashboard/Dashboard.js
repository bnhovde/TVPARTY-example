import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

// Redux
import { playAudio } from './../../store/audio';

// Helpers
import { generateRoomCode } from './../../utilities/helpers';
import games from './../../constants/games';

// Components
import JoinGameForm from './../../Components/JoinGameForm';
import Drawer from './../../Components/Drawer';
import Select from './../../Components/Select';
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
        selectedGame: '',
        roomCode: '',
        userName: '',
      },
      overlayVisible: false,
    };
  }

  onSubmit() {
    // Check that room exists, and that username is available
    this.props.welcomeMessage(this.state.fields.userName);
    this.props.startGame(this.state.fields.roomCode);
  }

  startNewGame() {
    const roomCode = generateRoomCode();
    this.props.startGame(roomCode);
  }

  handleChange(key, value) {
    this.setState({
      fields: Object.assign({}, this.state.fields, {
        [key]: value,
      }),
    });
  }

  joinGame() {
    this.setState({
      overlayVisible: true,
    });
  }

  render() {
    const { roomCode, userName, selectedGame } = this.state.fields;

    return (
      <Screen>
        <H1>TVPARTY</H1>
        <Block top={1}>
          <p>See you at the party richter!</p>
        </Block>
        <Block top={1}>
          <Select
            name="selectedGame"
            items={games}
            selected={selectedGame}
            onChange={this.handleChange}
          />
        </Block>
        <Block top={1}>
          <Button onClick={() => this.startNewGame()}>Start new game</Button>
        </Block>
        <Block top={0.5} align="center">
          <p>OR</p>
        </Block>
        <Block top={0.5}>
          <Button onClick={() => this.joinGame()}>Join existing game</Button>
        </Block>
        <Drawer visible={this.state.overlayVisible}>
          <JoinGameForm
            roomCode={roomCode}
            userName={userName}
            onChange={this.handleChange}
            onSubmit={this.onSubmit}
          />
        </Drawer>
      </Screen>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startGame: roomCode => dispatch(push(`/game/letsdrink/${roomCode}`)),
    welcomeMessage: name =>
      dispatch(playAudio(`${name} has joined the game! Tight!`)),
  };
}

export default connect(null, mapDispatchToProps)(Dashboard);
