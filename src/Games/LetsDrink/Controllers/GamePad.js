import React, { Component } from 'react';
import autoBind from 'react-autobind';

// Components
import { FullScreen } from './../../../Primitives/Screen';
import JoinGameForm from './../../../Components/JoinGameForm';
import ChatForm from './../../../Components/ChatForm';
import { H1, H2 } from './../../../Primitives/H';
import { Input } from '../../../Primitives/Input';
import { Button } from './../../../Primitives/Button';
import Block from './../../../Primitives/Block';

class GamePad extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      fields: {
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
    const { currentPlayer, playerLoaded, onAddPlayer } = this.props;
    return (
      <FullScreen>
        {playerLoaded ? (
          <div>
            <H1>Hi, {currentPlayer.name}!</H1>
            <Block top={2}>
              <p>Wait for other players to connect, then click start!</p>
            </Block>
            <Block top={2}>
              <ChatForm
                chatMessage={chatMessage}
                onChange={this.handleChange}
                onSubmit={this.handleSendMessage}
              />
            </Block>
            <Block top={1}>
              <Button onClick={this.handleStartGame}>Start game!</Button>
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
