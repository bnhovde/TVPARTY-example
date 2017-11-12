import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Alcometer from "./Alcometer";

class GameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalScore: 0,
    };

    this.props.socket.on('event', data => {
      this.iFramRef.contentWindow.newEvent(data);
    });

    this.scoreCallback = this.scoreCallback.bind(this);

  }

  componentDidMount() {
    const {
      isHost,
      gameData,
      id,
    } = this.props;
    window.setTimeout(() => {
      this.iFramRef.contentWindow.register(this.scoreCallback);
    }, 2000);
  }

  componentWillReceiveProps(newProps) {
    const {
      gameData,
      isHost,
      id
    } = newProps;
  }

  scoreCallback(player, points) {
    this.setState({
      totalScore: this.state.totalScore += points,
    });
  }

  render() {
    return (
        <div>
          <div className="playerScreen">
            <h1>Karamba Karacho!</h1>
            <iframe
                className="gameIframe"
                ref={ref => {
                  this.iFramRef = ref;
                }}
                height="800"
                width="1200"
                src={`${process.env.PUBLIC_URL}/assets/karambaKaracho/phaserIframe.html`}
            />
            <Alcometer
              percentage={this.state.totalScore}
            />
          </div>
        </div>
    );
  }
}

GameScreen.propTypes = {
  isHost: PropTypes.bool,
  gameData: PropTypes.object,
  speak: PropTypes.func,
  socket: PropTypes.object,
};

GameScreen.defaultProps = {};

export default GameScreen;
