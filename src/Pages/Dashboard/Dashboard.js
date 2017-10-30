import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { playAudio } from './../../store/audio';
import { generateRoomCode } from './../../utilities/helpers';
import { Button } from './../../Primitives/Button';
import JoinGameForm from './../../Components/JoinGameForm';
import Drawer from './../../Components/Drawer';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      fields: {
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
    const { roomCode, userName } = this.state.fields;

    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome!!</p>
        <Button onClick={() => this.startNewGame()}>Start new game</Button>
        <Button onClick={() => this.joinGame()}>Join existing game</Button>
        <Drawer visible={this.state.overlayVisible}>
          <JoinGameForm
            roomCode={roomCode}
            userName={userName}
            onChange={this.handleChange}
            onSubmit={this.onSubmit}
          />
        </Drawer>
      </div>
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
