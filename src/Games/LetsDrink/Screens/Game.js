import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Howl } from 'howler';

// Helpers
import { items, sliceDegree } from './../constants/spinnerItems';
import { delay } from './../../../utilities/helpers';

// Components
import { FullScreen } from './../../../Primitives/Screen';
import HeaderBar from './../../../Components/HeaderBar';
import Message from './../../../Components/Message';
import Block from './../../../Primitives/Block';
import HeinoFull from './../Components/HeinoFull';
import Spinner from './../Components/Spinner';
import PlayerScores from './../Components/PlayerScores';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      alertData: {
        visible: false,
        message: '',
      },
    };
  }

  componentDidMount() {
    // Define sounds
    this.sounds = {
      themeSong: new Howl({
        src: [`${process.env.PUBLIC_URL}/assets/letsDrink/sounds/medley.mp3`],
        loop: true,
      }),
      spinSound: new Howl({
        src: [
          `${process.env.PUBLIC_URL}/assets/letsDrink/sounds/wheel-spin.wav`,
        ],
      }),
      cheer: new Howl({
        src: [`${process.env.PUBLIC_URL}/assets/letsDrink/sounds/cheer.wav`],
      }),
      beerSound: new Howl({
        src: [`${process.env.PUBLIC_URL}/assets/letsDrink/sounds/beer.m4a`],
      }),
      beerOpenSound: new Howl({
        src: [
          `${process.env.PUBLIC_URL}/assets/letsDrink/sounds/beer-open.wav`,
        ],
      }),
      cashSound: new Howl({
        src: [`${process.env.PUBLIC_URL}/assets/letsDrink/sounds/cash.wav`],
      }),
    };
    this.sounds.cheer.play();
    this.sounds.themeSong.play();

    this.props.socket.on('event', data => {
      if (data.type === 'spin') {
        this.spin();
      }
    });
  }

  componentWillUnmount() {
    // Stop all sounds
    this.sounds.themeSong.stop();

    // Remove event listeners
    this.props.socket.off('event');
  }

  notify(message) {
    (async () => {
      this.setState({
        alertData: {
          visible: true,
          message,
        },
      });
      await delay(3000);
      this.setState({
        alertData: {},
      });
    })();
  }

  awardPrize(prize) {
    let sound;
    switch (prize) {
      case '5p':
      case '25p':
      case '100p':
        sound = 'cashSound';
        break;
      case 'beerx5':
        sound = 'beerSound';
        break;
      case 'star':
      case 'shades':
        sound = 'cheer';
        break;
      default:
        sound = 'beerOpenSound';
    }
    this.sounds[sound].play();
    this.notify(`You win a ${prize}`);
  }

  spin() {
    this.sounds.spinSound.play();
    const randomDegree = Math.floor(Math.random() * (3000 - (300 + 1))) + 300;
    this.props.updateGameData(this.props.gameData.gameCode, {
      ...this.props.gameData,
      spinRotation: randomDegree,
    });

    // Determine prize
    let degree = randomDegree;
    while (degree > 360) {
      degree -= 360;
    }
    const prizeIndex = Math.round(degree / sliceDegree) + 1;
    const index = prizeIndex === 17 ? 15 : prizeIndex;
    const prize = items[items.length - index];

    // Notify user
    (async () => {
      await delay(3200);
      this.awardPrize(prize);
    })();
  }

  render() {
    const { players = {}, gameCode = '', spinRotation } = this.props.gameData;
    const { alertData } = this.state;
    return (
      <FullScreen>
        <HeaderBar
          title="Let's drink!"
          subTitle="TVPARTY presents"
          gameCode={gameCode}
        />
        <Block>
          <Message data={alertData} />
          <PlayerScores players={players} currentPlayer={players[0]} />
          <Spinner rotation={spinRotation} />
          <HeinoFull />
        </Block>
      </FullScreen>
    );
  }
}

export default GameScreen;
