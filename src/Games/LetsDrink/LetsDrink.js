import React, { Component } from 'react';
import autoBind from 'react-autobind';

// Components
import SplashScreen from './Screens/Splash';
import GameScreen from './Screens/Game';
import GamePad from './Controllers/GamePad';

class LetsDrink extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }

  componentDidMount() {
    // Generic event handlers
    this.props.socket.on('event', data => {
      if (data.type === 'start') {
        this.props.updateGameData(this.props.gameData.gameCode, {
          ...this.props.gameData,
          screen: 'game',
        });
      }
    });

    // Player has left game, set as inactive
    this.props.socket.on('player left game', data => {
      console.log('player left game', data);
      const { players } = this.props.gameData;
      const playerId = Object.keys(players).find(
        p => players[p].socketId === data.socketId,
      );
      this.props.updatePlayerData(this.props.gameData.gameCode, playerId, {
        ...players[playerId],
        inactive: true,
      });
    });
  }

  handleAddPlayer(e, playerName) {
    e.preventDefault();
    // Add player data to firebase (through redux)
    this.props.addPlayer(this.props.gameData.gameCode, {
      name: playerName || 'Unknown player',
      socketId: this.props.socket.id,
    });

    // Add player data to

    this.props.sendEvent({
      type: 'greetPlayer',
      name: playerName,
    });
  }

  render() {
    const {
      players = {},
      gameCode = '',
      screen = 'splash',
    } = this.props.gameData;

    // For regular players, return the controller
    if (!this.props.isHost) {
      return <GamePad {...this.props} onAddPlayer={this.handleAddPlayer} />;
    }

    // Otherwise, return the current gameScreen
    return (
      <div>
        {screen === 'splash' && <SplashScreen {...this.props} />}
        {screen === 'game' && <GameScreen {...this.props} />}
      </div>
    );
  }
}

export default LetsDrink;
