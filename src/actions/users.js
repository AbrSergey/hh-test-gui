import * as types from '../constants/actionTypes';
import { getUsers, createUser } from '../services/management/users';

export const getAllUsers = () => async (dispatch) => {
  dispatch({
    type: types.GET_USERS,
  });

  try {
    const { data } = await getUsers();

    return dispatch({
      type: types.GET_USERS_SUCCEED,
      data: data ? data.data : null,
    });
  } catch (error) {
    return dispatch({
      type: types.GET_USERS_FAILED,
    });
  }
};

export const addUser = (data) => async (dispatch) => {
  try {
    await createUser(data);
    return dispatch(getAllUsers());
  } catch (error) {
    throw(error)
  }
};
