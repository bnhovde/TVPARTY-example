// Actions
const GET_USERS_REQUEST = 'app/users/GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'app/users/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'app/users/GET_USERS_FAILURE';
const CREATE_USER_REQUEST = 'app/users/CREATE_USER_REQUEST';
const CREATE_USER_SUCCESS = 'app/users/CREATE_USER_SUCCESS';
const CREATE_USER_FAILURE = 'app/users/CREATE_USER_FAILURE';

const initialState = {
  items: {},
  isReady: false,
  apiError: false,
  errorMessage: '',
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return Object.assign({}, state, {
        isReady: false,
        errorMessage: '',
      });
    case GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        isReady: true,
        apiError: false,
        items: action.users,
      });
    case GET_USERS_FAILURE:
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
export function getUsersRequest() {
  return { type: GET_USERS_REQUEST };
}

export function getUsersSuccess(users) {
  return { type: GET_USERS_SUCCESS, users };
}

export function getUsersFailure(error) {
  return { type: GET_USERS_FAILURE, error };
}

// Thunks
// export function getWidget() {
//   return dispatch =>
//     get('/widget').then(widget => dispatch(updateWidget(widget)));
// }
