import React, { Component } from 'react';
import autoBind from 'react-autobind';

// Components
import { Screen, FullScreen } from '../../Primitives/Screen';
import JoinGameForm from '../../Components/JoinGameForm';
import { H1, H2 } from '../../Primitives/H';
import { Input } from '../../Primitives/Input';
import { Button } from '../../Primitives/Button';
import Block from '../../Primitives/Block';
import Form from '../../Primitives/Form';

class GamePad extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      fields: {
        userName: '',
        gameStarted: false,
      },
    };

    this.props.socket.on('event', data => {
      if (data.type === 'gameStarted') {
        this.setState({
          gameStarted: true
        })
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const { playerName } = this.state.fields;

    this.props.sendEvent({
      type: 'submitClicked',
      playerName: playerName,
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
    const { playerName } = this.state.fields;
    const { currentPlayer, playerLoaded, onAddPlayer } = this.props;

    return (
      <FullScreen>
        {playerLoaded ? (
          <div>
            <H1>Hi, {currentPlayer.name}!</H1>
            <Block top={2}>
              <p>Click "Go!" when ready!</p>
            </Block>
            <Block top={2}>
              <Form>
                <Screen>
                  <Block top={1}>
                    <Button onClick={e => this.onSubmit(e)}>Go!</Button>
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
      </FullScreen>
    );
  }
}

export default GamePad;
