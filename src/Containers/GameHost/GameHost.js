import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

// Redux
import { fetch, gameItemSelector } from './../../store/games';

// Helpers
import games from './../../constants/games';

// Components
import * as gameComponents from './../../Games';
import Loader from './../../Components/Loader';

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
    const { gameCode } = this.props.match.params;
    const gameObj = this.props.allGames.find(g => g.code === gameCode);
    const gameConfig = games.find(g => g.id === gameObj.gameType);
    const GameComponent = gameComponents[gameConfig.main];
    return <GameComponent />;
  }

  render() {
    return (
      <div>
        {!this.props.allGames.length > 0 ? <Loader /> : this.renderGame()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allGames: gameItemSelector(state.games),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGames: () => dispatch(fetch()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameHost);
