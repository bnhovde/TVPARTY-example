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
      isSpinning: false,
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

    // Set current player
    this.nextPlayer();

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

  // Change player turn
  nextPlayer() {
    const currentPlayer = this.props.gameData.playersTurn;
    const playerKeys = Object.keys(this.props.gameData.players);
    const current = playerKeys.indexOf(currentPlayer);
    const nextIndex = playerKeys[current + 1]
      ? playerKeys[current + 1]
      : playerKeys[0];
    this.props.updateGameData(this.props.gameData.gameCode, {
      ...this.props.gameData,
      playersTurn: nextIndex,
    });
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
    let points = false;
    let drinks = false;
    let shades = false;
    let hair = false;
    switch (prize) {
      case '5p':
        sound = 'cashSound';
        points = 5;
        break;
      case '25p':
        sound = 'cashSound';
        points = 25;
        break;
      case '100p':
        sound = 'cashSound';
        points = 100;
        break;
      case 'beerx1':
        sound = 'beerOpenSound';
        drinks = 1;
        break;
      case 'beerx5':
        sound = 'beerSound';
        drinks = 5;
        break;
      case 'hair':
        hair = true;
        sound = 'cheer';
        break;
      case 'shades':
        shades = true;
        sound = 'cheer';
        break;
      default:
        sound = 'beerOpenSound';
    }
    this.sounds[sound].play();

    // Award prize
    const { players, playersTurn } = this.props.gameData;
    const player = players[playersTurn];
    this.notify(`${player.name} wins ${prize}`);

    if (points) {
      const currentPoints = player.points || 0;
      this.props.updatePlayerData(this.props.gameData.gameCode, playersTurn, {
        ...player,
        points: currentPoints + points,
      });
    }

    if (drinks) {
      const currentDrinks = player.drinks || 0;
      this.props.updatePlayerData(this.props.gameData.gameCode, playersTurn, {
        ...player,
        drinks: currentDrinks + drinks,
      });
    }

    if (shades) {
      this.props.updateGameData(this.props.gameData.gameCode, {
        ...this.props.gameData,
        playerWithShades: playersTurn,
      });
    }

    if (hair) {
      this.props.updateGameData(this.props.gameData.gameCode, {
        ...this.props.gameData,
        playerWithHair: playersTurn,
      });
    }
  }

  spin() {
    this.setState({ isSpinning: true });
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

    // Stop heino animation
    (async () => {
      await delay(1000);
      this.setState({ isSpinning: false });
    })();

    // Notify user of prize
    (async () => {
      await delay(3200);
      this.awardPrize(prize);
    })();

    // Change player
    (async () => {
      await delay(4200);
      this.nextPlayer(prize);
    })();
  }

  render() {
    const {
      players = {},
      gameCode = '',
      spinRotation,
      playersTurn,
      playerWithShades,
      playerWithHair,
    } = this.props.gameData;
    const { alertData, isSpinning } = this.state;
    return (
      <FullScreen>
        <HeaderBar
          title="Let's drink!"
          subTitle="TVPARTY presents"
          gameCode={gameCode}
        />
        <Block>
          <Message data={alertData} />
          <PlayerScores
            players={players}
            playersTurn={playersTurn}
            playerWithShades={playerWithShades}
            playerWithHair={playerWithHair}
          />
          <Spinner rotation={spinRotation} />
          <HeinoFull isSpinning={isSpinning} />
        </Block>
      </FullScreen>
    );
  }
}

export default GameScreen;
