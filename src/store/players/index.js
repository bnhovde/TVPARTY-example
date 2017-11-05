// Services
import {
  addPlayerToGame,
  addPlaterDataToGame,
} from './../../services/firebase';

// Helpers
import { checkObjEmpty } from './../../utilities/helpers';

// Actions
const ADD_PLAYER_REQUEST = 'app/games/ADD_PLAYER_REQUEST';
const ADD_PLAYER_SUCCESS = 'app/games/ADD_PLAYER_SUCCESS';
const ADD_PLAYER_FAILURE = 'app/games/ADD_PLAYER_FAILURE';
const ADD_PLAYER_DATA_REQUEST = 'app/games/ADD_PLAYER_DATA_REQUEST';
const ADD_PLAYER_DATA_SUCCESS = 'app/games/ADD_PLAYER_DATA_SUCCESS';
const ADD_PLAYER_DATA_FAILURE = 'app/games/ADD_PLAYER_DATA_FAILURE';

const initialState = {
  allPlayers: [],
  currentPlayer: {},
  lastFetched: null,
  isFetching: false,
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYER_REQUEST:
      return Object.assign({}, state, {
        isReady: false,
        errorMessage: '',
      });
    case ADD_PLAYER_SUCCESS:
      return Object.assign({}, state, {
        isReady: true,
        apiError: false,
        currentPlayer: action.playerData,
      });
    case ADD_PLAYER_FAILURE:
      return Object.assign({}, state, {
        isReady: false,
        apiError: true,
      });
    case ADD_PLAYER_DATA_REQUEST:
      return Object.assign({}, state, {
        isReady: false,
        errorMessage: '',
      });
    case ADD_PLAYER_DATA_SUCCESS:
      return Object.assign({}, state, {
        isReady: true,
        apiError: false,
      });
    case ADD_PLAYER_DATA_FAILURE:
      return Object.assign({}, state, {
        isReady: false,
        apiError: true,
      });
    default:
      return state;
  }
}

// Action Creators
export function addPlayerRequest(playerData) {
  return { type: ADD_PLAYER_REQUEST, playerData };
}

export function addPlayerSuccess(playerData) {
  return { type: ADD_PLAYER_SUCCESS, playerData };
}

export function addPlayerFailure(error) {
  return { type: ADD_PLAYER_FAILURE, error };
}

export function addPlayerDataRequest(playerData) {
  return { type: ADD_PLAYER_DATA_REQUEST, playerData };
}

export function addPlayerDataSuccess() {
  return { type: ADD_PLAYER_DATA_SUCCESS };
}

export function addPlayerDataFailure(error) {
  return { type: ADD_PLAYER_DATA_FAILURE, error };
}

// Add player thunk
export function addPlayer(gameCode, playerData) {
  return dispatch => {
    dispatch(addPlayerRequest(playerData));
    return addPlayerToGame(gameCode, playerData)
      .then(response => dispatch(addPlayerSuccess(response.key)))
      .catch(error => {
        dispatch(addPlayerFailure(error));
        throw error;
      });
  };
}

// Add player data thunk
export function addPlayerData(gameCode, playerId, playerData) {
  return dispatch => {
    dispatch(addPlayerDataRequest(gameCode, playerId, playerData));
    return addPlaterDataToGame(gameCode, playerId, playerData)
      .then(() => dispatch(addPlayerDataSuccess()))
      .catch(error => {
        dispatch(addPlayerDataFailure(error));
        throw error;
      });
  };
}

// Selectors
export function playerDataLoaded(state) {
  return !checkObjEmpty(state.currentPlayer);
}

export function currentPlayer(game, playerId) {
  return game.players && game.players[playerId];
}
