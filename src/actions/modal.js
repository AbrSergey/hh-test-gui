import * as types from '../constants/actionTypes';

export const openModal = () => async (dispatch) => {
  dispatch({
    type: types.OPEN_MODAL
  });
};

export const closeModal = () => async (dispatch) => {
  dispatch({
    type: types.CLOSE_MODAL
  });
};
