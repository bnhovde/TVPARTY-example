import React, { Component } from 'react';
import autoBind from 'react-autobind';
import styled from 'styled-components';

// Helpers
import { delay } from './../../../utilities/helpers';

// Components
import { FullScreen } from './../../../Primitives/Screen';
import JoinGameForm from './../../../Components/JoinGameForm';
import ChatForm from './../../../Components/ChatForm';
import { H1 } from './../../../Primitives/H';
import { Button } from './../../../Primitives/Button';
import Block from './../../../Primitives/Block';

const Avatar = styled.img`
  display: block;
  width: 20vw;
  max-width: 200px;
  margin: 0 auto;
`;

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

  findAvatar() {
    const { playerWithHair, playerWithShades } = this.props.gameData;

    let avatar = 'face';
    if (playerWithHair === this.props.currentPlayerId) {
      avatar = 'face-hair';
    }
    if (playerWithShades === this.props.currentPlayerId) {
      avatar = 'face-shades';
    }
    if (
      playerWithHair === this.props.currentPlayerId &&
      playerWithShades === this.props.currentPlayerId
    ) {
      avatar = 'face-shades-hair';
    }
    return avatar;
  }

  render() {
    const { playerName, chatMessage } = this.state.fields;
    const {
      currentPlayer,
      currentPlayerId,
      playerLoaded,
      onAddPlayer,
    } = this.props;

    const {
      screen = 'splash',
      playersTurn,
      players = {},
      playerWithHair,
      playerWithShades,
    } = this.props.gameData;

    const player = players[currentPlayerId] || {};
    const waitingForPlayer = players[playersTurn] || {};

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
                <Block top={1}>
                  <Avatar
                    src={`${process.env
                      .PUBLIC_URL}/assets/letsDrink/${this.findAvatar()}.svg`}
                  />
                </Block>
                <Block top={1}>
                  <p>Your cash: {player.points || 0}</p>
                </Block>
                <Block top={0.5}>
                  <p>You've won {player.drinks || 0} drinks</p>
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
                    <Button disabled>
                      Waiting for {waitingForPlayer.name}
                    </Button>
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
