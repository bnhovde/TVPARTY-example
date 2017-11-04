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

  render() {
    const { players = {}, gameCode = '' } = this.props.gameData;
    return (
      <div>
        {this.props.isHost ? (
          <SplashScreen {...this.props} />
        ) : (
          <GamePad {...this.props} onAddPlayer={this.handleAddPlayer} />
        )}
      </div>
    );
  }
}

export default LetsDrink;
