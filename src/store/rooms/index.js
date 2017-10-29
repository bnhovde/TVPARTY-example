// Actions
const GET_ROOMS_REQUEST = 'app/rooms/GET_ROOMS_REQUEST';
const GET_ROOMS_SUCCESS = 'app/rooms/GET_ROOMS_SUCCESS';
const GET_ROOMS_FAILURE = 'app/rooms/GET_ROOMS_FAILURE';
const CREATE_ROOM_REQUEST = 'app/rooms/CREATE_ROOM_REQUEST';
const CREATE_ROOM_SUCCESS = 'app/rooms/CREATE_ROOM_SUCCESS';
const CREATE_ROOM_FAILURE = 'app/rooms/CREATE_ROOM_FAILURE';

const initialState = {
  items: {},
  isReady: false,
  apiError: false,
  errorMessage: '',
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROOMS_REQUEST:
      return Object.assign({}, state, {
        isReady: false,
        errorMessage: '',
      });
    case GET_ROOMS_SUCCESS:
      return Object.assign({}, state, {
        isReady: true,
        apiError: false,
        items: action.items,
      });
    case GET_ROOMS_FAILURE:
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
export function getRoomsRequest() {
  return { type: GET_ROOMS_REQUEST };
}

export function getRoomsSuccess(rooms) {
  return { type: GET_ROOMS_SUCCESS, rooms };
}

export function getRoomsFailure(error) {
  return { type: GET_ROOMS_FAILURE, error };
}

// Thunks
// export function getWidget() {
//   return dispatch =>
//     get('/widget').then(widget => dispatch(updateWidget(widget)));
// }
