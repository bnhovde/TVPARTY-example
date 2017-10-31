import * as firebase from 'firebase';
import config from './../constants/config';

firebase.initializeApp(config);

export function createGame(code, gameType) {
  return new Promise((resolve, reject) => {
    const game = {
      code,
      gameType,
      timestamp: Date.now(),
    };
    const newGameRef = firebase
      .database()
      .ref('games')
      .push();
    game.id = newGameRef.key;
    newGameRef.set(game);
    resolve(game);
  });
}

export function fetchGames() {
  return firebase
    .database()
    .ref('games')
    .orderByKey();
}

export default firebase;
