import React, { Component } from 'react';
import autoBind from 'react-autobind';

// Components
import { Screen } from './../../../../Primitives/Screen';
import JoinGameForm from './../../../../Components/JoinGameForm';
import ChatForm from './../../../../Components/ChatForm';
import { H1, H2 } from './../../../../Primitives/H';
import { Input } from '../../../../Primitives/Input';
import { Button } from './../../../../Primitives/Button';
import Block from './../../../../Primitives/Block';
import Form from '../../../../Primitives/Form';

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

  onSubmit(e) {
    e.preventDefault();

    const { playerName, sausageCount } = this.state.fields;

    this.props.sendEvent({
      type: 'submitClicked',
      playerName: playerName,
      sausageCount: sausageCount,
    });
  }

  handleChange(key, value) {
    this.setState({
      fields: Object.assign({}, this.state.fields, {
        [key]: value,
      }),
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
    const { playerName, sausageCount } = this.state.fields;
    const { currentPlayer, playerLoaded, onAddPlayer } = this.props;

    // Has game started
    let inputJsx = null;
    if (playerLoaded) {
      inputJsx = (
        <Input
          required
          placeholder="Antall pølser"
          value={sausageCount}
          onChange={({ target }) => {
            this.handleChange('sausageCount', target.value);
          }}
        />
      );
    }

    return (
      <Screen>
        {playerLoaded ? (
          <div>
            <H1>Hi, {currentPlayer.name}!</H1>
            <Block top={2}>
              <p>Wait for other players to connect, then click start!</p>
            </Block>
            <Block top={2}>
              <Form>
                <Screen>
                  <H1>Spis pølser!</H1>
                  <Block top={2}>{inputJsx}</Block>
                  <Block top={1}>
                    <Button onClick={e => this.onSubmit(e, sausageCount)}>
                      Start Game!
                    </Button>
                  </Block>
                </Screen>
              </Form>
            </Block>
          </div>
        ) : (
          <JoinGameForm
            playerName={playerName}
            onChange={this.handleChange}
            onSubmit={e => onAddPlayer(e, playerName)}
          />
        )}
      </Screen>
    );
  }
}

export default GamePad;