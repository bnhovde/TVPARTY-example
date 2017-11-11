import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

// Redux
import { speak } from './../../store/audio';
import { create } from './../../store/games';

// Helpers
import { generateGameCode } from './../../utilities/helpers';
import games from './../../Games/games';

// Components
import { Input } from '../../Primitives/Input';
import HeaderBar from './../../Components/HeaderBar';
import Toggle from './../../Components/Toggle';
import { H1 } from './../../Primitives/H';
import { Button } from './../../Primitives/Button';
import Form from './../../Primitives/Form';
import Block from './../../Primitives/Block';
import { AnimatedScreen } from './../../Primitives/Screen';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      fields: {
        gameType: games[0].id,
        gameCode: '',
      },
    };
  }

  handleJoinGame() {
    const { gameCode } = this.state.fields;
    this.props.joinGame(gameCode);
  }

  startNewGame() {
    const gameData = {
      gameType: this.state.fields.gameType,
      gameCode: generateGameCode(),
      created: Date.now(),
      data: {},
    };
    this.props.createGame(gameData).then(() => {
      this.props.hostGame(gameData.gameCode);
    });
  }

  handleChange(key, value) {
    this.setState({
      fields: Object.assign({}, this.state.fields, {
        [key]: value,
      }),
    });
  }

  render() {
    const { gameCode, gameType } = this.state.fields;

    return (
      <AnimatedScreen>
        <HeaderBar title="TVPARTY.IO" subTitle="Bring your friends!" />

        <Block top={2}>
          <Form onSubmit={this.handleJoinGame}>
            <Block top={0.5} left={0.5} right={0.5}>
              <Input
                required
                placeholder="Enter code (4 letters)"
                value={gameCode}
                onChange={({ target }) => {
                  this.handleChange('gameCode', target.value);
                }}
              />
            </Block>
            <Block top={0.5} bottom={0.5} left={0.5} right={0.5}>
              <Button type="submit" disabled={gameCode.length !== 4}>
                Join Game!
              </Button>
            </Block>
          </Form>
        </Block>

        <Block top={1} align="center">
          <p>– OR –</p>
        </Block>

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
      </AnimatedScreen>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createGame: gameData => dispatch(create(gameData)),
    hostGame: gameCode => dispatch(push(`/host/${gameCode}`)),
    joinGame: gameCode => dispatch(push(`/${gameCode}`)),
    welcomeMessage: name =>
      dispatch(speak(`${name} has joined the game! Tight!`)),
  };
}

export default connect(null, mapDispatchToProps)(Dashboard);
