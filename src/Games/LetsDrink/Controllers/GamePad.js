import React, { Component } from 'react';
import autoBind from 'react-autobind';

// Helpers
import { delay } from './../../../utilities/helpers';

// Components
import { FullScreen } from './../../../Primitives/Screen';
import JoinGameForm from './../../../Components/JoinGameForm';
import ChatForm from './../../../Components/ChatForm';
import { H1 } from './../../../Primitives/H';
import { Button } from './../../../Primitives/Button';
import Block from './../../../Primitives/Block';

class GamePad extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      fields: {
        disableSpin: false,
        userName: '',
      },
    };
  }

  handleChange(key, value) {
    this.setState({
      fields: Object.assign({}, this.state.fields, {
        [key]: value,
      }),
    });
  }

  handleStartGame() {
    this.props.sendEvent({
      type: 'start',
    });
  }

  handleSpin() {
    // Prevent multiple events sent
    this.setState({
      disableSpin: true,
    });
    this.props.sendEvent({
      type: 'spin',
    });
    (async () => {
      await delay(10000);
      this.setState({
        disableSpin: false,
      });
    })();
  }

  handleSendMessage(e) {
    e.preventDefault();
    this.props.sendEvent({
      type: 'speak',
      message: `${this.props.currentPlayer.name} says ${this.state.fields
        .chatMessage}`,
    });
    this.setState({
      fields: Object.assign({}, this.state.fields, {
        chatMessage: '',
      }),
    });
  }

  render() {
    const { playerName, chatMessage } = this.state.fields;
    const {
      currentPlayer,
      currentPlayerId,
      playerLoaded,
      onAddPlayer,
    } = this.props;
    const { screen = 'splash', playersTurn } = this.props.gameData;
    return (
      <FullScreen>
        {playerLoaded ? (
          <div>
            <H1>Hi, {currentPlayer.name}!</H1>
            {screen === 'splash' && (
              <div>
                <Block top={2}>
                  <p>Wait for other players to connect, then click start!</p>
                </Block>
                <Block top={1}>
                  <Button onClick={this.handleStartGame}>Start game!</Button>
                </Block>
              </div>
            )}
            {screen === 'game' && (
              <div>
                <Block top={2}>
                  <p>Your score: x</p>
                </Block>
                <Block top={1}>
                  {currentPlayerId === playersTurn ? (
                    <Button
                      onClick={this.handleSpin}
                      disabled={this.state.disableSpin}
                    >
                      Spin!
                    </Button>
                  ) : (
                    <Button disabled>Not your turn..</Button>
                  )}
                </Block>
              </div>
            )}
            <Block top={1}>
              <ChatForm
                chatMessage={chatMessage}
                onChange={this.handleChange}
                onSubmit={this.handleSendMessage}
              />
            </Block>
          </div>
        ) : (
          <JoinGameForm
            playerName={playerName}
            onChange={this.handleChange}
            onSubmit={e => onAddPlayer(e, playerName)}
          />
        )}
      </FullScreen>
    );
  }
}

export default GamePad;
