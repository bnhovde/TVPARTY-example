// Services
import { createGame } from './../../services/firebase';

// Actions
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
        items: {},
        apiError: true,
        errorMessage: action.message,
      });
    default:
      return state;
  }
}

// Action Creators
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
export function newGame(gameCode, gameType) {
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
