// Services
import firebase from './../../services/firebase';

// Actions
const CREATE_GAME_REQUEST = 'app/rooms/CREATE_GAME_REQUEST';
const CREATE_GAME_SUCCESS = 'app/rooms/CREATE_GAME_SUCCESS';
const CREATE_GAME_FAILURE = 'app/rooms/CREATE_GAME_FAILURE';

const initialState = {
  items: {},
  isReady: false,
  apiError: false,
  errorMessage: '',
};

const games = firebase.database().ref('games');

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
export function CreateGameRequest() {
  return { type: CREATE_GAME_REQUEST };
}

export function CreateGameSuccess(game) {
  return { type: CREATE_GAME_SUCCESS, game };
}

export function CreateGameFailure(error) {
  return { type: CREATE_GAME_FAILURE, error };
}

// Thunks
export function createGame(gameData) {
  return function() {
    games.push(gameData);
  };
}
