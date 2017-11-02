import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

// Redux
import { fetch, gameItemSelector } from './../../store/games';
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
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchGames();
  }

  renderGame() {
    const { path, params: { gameCode } } = this.props.match;
    const isHost = path.includes('/host');
    const gameData = this.props.allGames.find(g => g.code === gameCode);
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
    return (
      <div>
        {!this.props.allGames.length > 0 ? <Loader /> : this.renderGame()}
      </div>
    );
  }
}

GameHost.propTypes = {
  allGames: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      gameType: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    }),
  ).isRequired,
  fetchGames: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      gameCode: PropTypes.string,
    }),
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    allGames: gameItemSelector(state.games),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGames: () => dispatch(fetch()),
    speak: message => dispatch(speak(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameHost);
