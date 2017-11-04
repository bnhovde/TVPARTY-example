// Services
import { addPlayerToGame } from './../../services/firebase';

// Helpers
import { checkObjEmpty } from './../../utilities/helpers';

// Actions
const ADD_PLAYER_REQUEST = 'app/games/ADD_PLAYER_REQUEST';
const ADD_PLAYER_SUCCESS = 'app/games/ADD_PLAYER_SUCCESS';
const ADD_PLAYER_FAILURE = 'app/games/ADD_PLAYER_FAILURE';

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

// Add player thunk
export function addPlayer(gameCode, playerData) {
  return dispatch => {
    dispatch(addPlayerRequest(playerData));
    return addPlayerToGame(gameCode, playerData)
      .then(() => dispatch(addPlayerSuccess(playerData)))
      .catch(error => {
        dispatch(addPlayerFailure(error));
        throw error;
      });
  };
}

// Selectors
export function playerDataLoaded(state) {
  return !checkObjEmpty(state.currentPlayer);
}

export function currentPlayer(state) {
  return state.currentPlayer;
}
