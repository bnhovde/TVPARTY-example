import React, { Component } from 'react';
import autoBind from 'react-autobind';

// Components
import Screen from './../../../Primitives/Screen';
import JoinGameForm from './../../../Components/JoinGameForm';
import { H1, H2 } from './../../../Primitives/H';
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

  render() {
    const { playerName } = this.state.fields;
    const { currentPlayer, playerLoaded, onAddPlayer } = this.props;
    return (
      <Screen>
        {playerLoaded ? (
          <div>
            <H1>Hi There {currentPlayer.name}!</H1>
            <Block top={2}>
              <p>Wait for other players to connect, then click start!</p>
            </Block>
            <Block top={2}>
              <Button>Start game!</Button>
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
