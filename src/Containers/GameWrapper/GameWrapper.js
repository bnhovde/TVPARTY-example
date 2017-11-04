import React from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

// Redux
import { watchGame, addPlayer, singleGameLoaded } from './../../store/games';
import { speak } from './../../store/audio';

// Helpers
import games from './../../Games/games';

// Components
import Loader from './../../Components/Loader';
import * as gameComponents from './../../Games';

class GameHost extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isHost: this.props.match.path.includes('/host'),
      gameCode: this.props.match.params.gameCode,
    };
  }

  componentDidMount() {
    this.props.watchGame(this.state.gameCode);
    window.addEventListener('beforeunload', this.handleWindowClose);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleWindowClose);
  }

  handleWindowClose(e) {
    // Set user to inactive
  }

  renderGame() {
    const gameData = this.props.currentGame;
    const gameConfig = games.find(g => g.id === gameData.gameType);
    const GameComponent = gameComponents[gameConfig.main];
    return (
      <GameComponent
        gameData={gameData}
        isHost={this.state.isHost}
        {...this.state}
        {...this.props}
      />
    );
  }

  render() {
    return <div>{!this.props.gameLoaded ? <Loader /> : this.renderGame()}</div>;
  }
}

GameHost.propTypes = {
  gameLoaded: PropTypes.bool.isRequired,
  currentGame: PropTypes.shape({
    code: PropTypes.string,
    gameType: PropTypes.string,
    timestamp: PropTypes.number,
  }).isRequired,
  watchGame: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      gameCode: PropTypes.string,
    }),
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    currentGame: state.games.currentGame,
    gameLoaded: singleGameLoaded(state.games),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    speak: message => dispatch(speak(message)),
    watchGame: gameCode => dispatch(watchGame(gameCode)),
    addPlayer: (gameCode, playerData) =>
      dispatch(addPlayer(gameCode, playerData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameHost);
