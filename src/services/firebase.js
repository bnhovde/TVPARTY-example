import * as firebase from 'firebase';
import config from './../constants/config';

firebase.initializeApp(config);

export function createGame(code, gameType) {
  return firebase
    .database()
    .ref(`games/${code}`)
    .set({
      code,
      gameType,
      timestamp: Date.now(),
    });
}

export function fetchGames() {
  return firebase
    .database()
    .ref('games')
    .orderByKey();
}

export function addPlayerToGame(code, userData) {
  return firebase
    .database()
    .ref(`games/${code}/players`)
    .push(userData);
}

export function fetchGameByCode(code) {
  return firebase.database().ref(`games/${code}`);
}

export default firebase;
