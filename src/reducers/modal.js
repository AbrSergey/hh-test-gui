import * as types from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
  case types.OPEN_MODAL:
    return {
      ...state,
      modalState: true,
      type: action.type
    };
  case types.CLOSE_MODAL:
    return {
      ...state,
      modalState: false,
      type: action.type
    };
  default:
    return state;
  }
};