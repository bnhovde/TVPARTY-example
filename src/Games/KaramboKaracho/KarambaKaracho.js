import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './KarambaKaracho.css';
import GamePad from "./GamePad";
import GameScreen from "./GameScreen";

class KarambaKaracho extends Component {
  constructor(props) {
    super(props);
    this.handleAddPlayer = this.handleAddPlayer.bind(this);

    this.state = {
      allPlayersReady: false,
    }
  }
  componentDidMount() {
    const {
      isHost,
      gameData,
    } = this.props;
  }


  handleAddPlayer(e, playerName) {
    e.preventDefault();
    this.props.addPlayer(this.props.gameData.gameCode, {
      name: playerName || 'Unknown player',
    });
    this.props.sendEvent({
      type: 'greetPlayer',
      name: playerName,
    });
  }

  componentWillReceiveProps(newProps) {
    const {
      gameData,
      isHost
    } = newProps;

    if(this.game && isHost) {
      this.game.newGameData(gameData);
    }
  }

  render() {
    const {
      isHost
    } = this.props;

    if(isHost) {
      return <GameScreen {...this.props}/>;
    } else {
      return(
          <GamePad {...this.props} onAddPlayer={this.handleAddPlayer} />
      );
    }
  }
}

KarambaKaracho.propTypes = {
  isHost: PropTypes.bool,
  gameData: PropTypes.object,
  speak: PropTypes.func,
  socket: PropTypes.object,
};

KarambaKaracho.defaultProps = {
};

export default KarambaKaracho;
