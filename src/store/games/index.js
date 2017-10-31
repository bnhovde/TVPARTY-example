// Services
import { createGame, fetchGames } from './../../services/firebase';

// Actions
const GET_GAMES_REQUEST = 'app/games/GET_GAMES_REQUEST';
const GET_GAMES_SUCCESS = 'app/games/GET_GAMES_SUCCESS';
const GET_GAMES_FAILURE = 'app/games/GET_GAMES_FAILURE';
const CREATE_GAME_REQUEST = 'app/games/CREATE_GAME_REQUEST';
const CREATE_GAME_SUCCESS = 'app/games/CREATE_GAME_SUCCESS';
const CREATE_GAME_FAILURE = 'app/games/CREATE_GAME_FAILURE';

const initialState = {
  data: [],
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
      });
    case CREATE_GAME_SUCCESS:
      return Object.assign({}, state, {
        isReady: true,
        apiError: false,
        items: action.items,
      });
    case CREATE_GAME_FAILURE:
      return Object.assign({}, state, {
        isReady: false,
        apiError: true,
        errorMessage: action.message,
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

export function createGameSuccess(game) {
  return { type: CREATE_GAME_SUCCESS, game };
}

export function createGameFailure(error) {
  return { type: CREATE_GAME_FAILURE, error };
}

// Thunks
export function create(gameCode, gameType) {
  return dispatch => {
    dispatch(createGameRequest());
    return createGame(gameCode, gameType)
      .then(game => {
        return dispatch(createGameSuccess(game));
      })
      .catch(error => {
        dispatch(createGameFailure(error));
        throw error;
      });
  };
}

export function fetch() {
  return dispatch => {
    dispatch(getGamesRequest());
    return fetchGames().on('value', snapshot => {
      const rooms = snapshot.val() || [];
      return dispatch(getGamesSuccess(rooms));
    });
  };
}

// Selectors
export function gameItemSelector(state) {
  return Object.values(state.data).map(game => game);
}
