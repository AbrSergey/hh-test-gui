import {
  GET_USERS, GET_USERS_SUCCEED, GET_USERS_FAILED, ADD_USER,
} from '../constants/actionTypes';

const initialState = {
  data: [],
  status: '',
  loading: false,
  error: false,
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: [],
        loading: true,
        error: false,
      };
    case GET_USERS_SUCCEED:
      return {
        ...state,
        data: action.data,
        loading: false,
        error: false,
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case ADD_USER:
      return {
        ...state
      };
    default:
      return state;
  }
}
