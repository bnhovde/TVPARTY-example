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
    const { hasJoined, onAddPlayer } = this.props;
    return (
      <Screen>
        {hasJoined ? (
          <div>
            <H1>Hi There!</H1>
            <Block top={2}>
              <Button>Join </Button>
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
