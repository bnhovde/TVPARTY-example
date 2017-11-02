// Services
import firebase, { createGame, fetchGames } from './../../services/firebase';

// Helpers
import { checkObjEmpty } from './../../utilities/helpers';

// Actions
const GET_GAMES_REQUEST = 'app/games/GET_GAMES_REQUEST';
const GET_GAMES_SUCCESS = 'app/games/GET_GAMES_SUCCESS';
const GET_GAMES_FAILURE = 'app/games/GET_GAMES_FAILURE';
const CREATE_GAME_REQUEST = 'app/games/CREATE_GAME_REQUEST';
const CREATE_GAME_SUCCESS = 'app/games/CREATE_GAME_SUCCESS';
const CREATE_GAME_FAILURE = 'app/games/CREATE_GAME_FAILURE';
const WATCH_GAME_START = 'app/games/WATCH_GAME_START';
const WATCH_GAME_UPDATE = 'app/games/WATCH_GAME_UPDATE';

const initialState = {
  allGames: [],
  currentGame: {},
  lastFetched: null,
  isFetching: false,
};

// const games = firebase.database().ref('games');

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES_REQUEST:
      return Object.assign({}, state, {
        isReady: false,
        errorMessage: '',
      });
    case GET_GAMES_SUCCESS:
      return Object.assign({}, state, {
        isReady: true,
        apiError: false,
        data: action.items,
      });
    case GET_GAMES_FAILURE:
      return Object.assign({}, state, {
        isReady: false,
        apiError: true,
        errorMessage: action.message,
      });
    case CREATE_GAME_REQUEST:
      return Object.assign({}, state, {
        isReady: false,
        errorMessage: '',
        currentGame: {},
      });
    case CREATE_GAME_SUCCESS:
      return Object.assign({}, state, {
        isReady: true,
        apiError: false,
      });
    case CREATE_GAME_FAILURE:
      return Object.assign({}, state, {
        isReady: false,
        apiError: true,
        errorMessage: action.message,
        currentGame: {},
      });
    case WATCH_GAME_START:
      return Object.assign({}, state, {
        isReady: false,
        errorMessage: '',
      });
    case WATCH_GAME_UPDATE:
      return Object.assign({}, state, {
        isReady: true,
        apiError: false,
        currentGame: action.game,
      });
    default:
      return state;
  }
}

// Action Creators
export function getGamesRequest() {
  return { type: GET_GAMES_REQUEST };
}

export function getGamesSuccess(items) {
  return { type: GET_GAMES_SUCCESS, items };
}

export function getGamesFailure(error) {
  return { type: GET_GAMES_FAILURE, error };
}

export function createGameRequest() {
  return { type: CREATE_GAME_REQUEST };
}

export function createGameSuccess() {
  return { type: CREATE_GAME_SUCCESS };
}

export function createGameFailure(error) {
  return { type: CREATE_GAME_FAILURE, error };
}

export function watchGameRequest() {
  return { type: WATCH_GAME_START };
}

export function watchGameUpdate(game) {
  return { type: WATCH_GAME_UPDATE, game };
}

// Fetch all games thunk
export function fetch() {
  return dispatch => {
    dispatch(getGamesRequest());
    return fetchGames().on('value', snapshot => {
      const games = snapshot.val() || [];
      return dispatch(getGamesSuccess(games));
    });
  };
}

// Create game thunk
export function create(gameCode, gameType) {
  return dispatch => {
    dispatch(createGameRequest());
    return createGame(gameCode, gameType)
      .then(() => {
        return dispatch(createGameSuccess());
      })
      .catch(error => {
        dispatch(createGameFailure(error));
        throw error;
      });
  };
}

// Watch single game and receive updates
export function watchGame(gameCode) {
  return dispatch => {
    dispatch(watchGameRequest());
    firebase
      .database()
      .ref(`games/${gameCode}`)
      .on('value', snapshot => {
        const game = snapshot.val() || {};
        dispatch(watchGameUpdate(game));
      });
  };
}

// Selectors
export function singleGameLoaded(state) {
  return !checkObjEmpty(state.currentGame);
}
