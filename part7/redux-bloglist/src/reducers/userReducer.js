import userService from "../services/users";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ALL_USERS": {
      return action.data;
    }
    default:
      return state;
  }
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch({
        type: "GET_ALL_USERS",
        data: users,
      });
    } catch (exception) {
      console.log(exception);
      dispatch({
        type: "CREATE_NOTIFICATION",
        data: {
          content: "Something wrong happened when getting users",
          type: "error",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
          data: {},
        });
      }, 5 * 1000);
    }
  };
};

export default userReducer;
