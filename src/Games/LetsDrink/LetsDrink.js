import React, { Component } from 'react';
import autoBind from 'react-autobind';

// Components
import SplashScreen from './Screens/Splash';
import GamePad from './Controllers/GamePad';

class LetsDrink extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }

  handleAddPlayer(e, playerName) {
    e.preventDefault();
    this.props.addPlayer(this.props.gameData.gameCode, {
      name: playerName || 'Unknown player',
    });
  }

  handleChat(message) {
    const newGameData = {
      ...this.props.gameData,
      chats: [message],
    };
    this.props.updateGameData(this.props.gameData.gameCode, newGameData);
  }

  render() {
    const { players = {}, gameCode = '' } = this.props.gameData;
    return (
      <div>
        {this.props.isHost ? (
          <SplashScreen {...this.props} />
        ) : (
          <GamePad
            {...this.props}
            onAddPlayer={this.handleAddPlayer}
            onChat={this.handleChat}
          />
        )}
      </div>
    );
  }
}

export default LetsDrink;
