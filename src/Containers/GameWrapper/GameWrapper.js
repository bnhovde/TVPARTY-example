import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

// Redux
import { watchGame, singleGameLoaded } from './../../store/games';
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
      gameCode: this.props.match.params.gameCode,
    };
  }

  componentDidMount() {
    this.props.watchGame(this.state.gameCode);
  }

  renderGame() {
    const { path } = this.props.match;
    const isHost = path.includes('/host');
    const gameData = this.props.currentGame;
    const gameConfig = games.find(g => g.id === gameData.gameType);
    const GameComponent = gameComponents[gameConfig.main];
    return (
      <GameComponent
        gameData={gameData}
        isHost={isHost}
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
    watchGame: gameCode => dispatch(watchGame(gameCode)),
    speak: message => dispatch(speak(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameHost);
