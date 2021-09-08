import loginService from "../services/login";
import blogService from "../services/blogs";

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "SIGNIN": {
      return action.data;
    }
    case "SIGNOUT": {
      return null;
    }
    default:
      return state;
  }
};

export const signin = (user) => {
  return async (dispatch) => {
    try {
      const loggedInUser = await loginService.login(user);
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(loggedInUser)
      );
      blogService.setToken(loggedInUser.token);
      dispatch({
        type: "SIGNIN",
        data: loggedInUser,
      });
      dispatch({
        type: "CREATE_NOTIFICATION",
        data: {
          content: `${loggedInUser.name} has signed in`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
          data: {},
        });
      }, 5 * 1000);
    } catch (exception) {
      console.log(exception);
      dispatch({
        type: "CREATE_NOTIFICATION",
        data: {
          content: "Something wrong happened when signing in",
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

export const loadFromCache = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch({
        type: "SIGNIN",
        data: user,
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    try {
      window.localStorage.removeItem("loggedBlogappUser");
      blogService.setToken(null);
      dispatch({
        type: "SIGNOUT",
        data: {},
      });
      dispatch({
        type: "CREATE_NOTIFICATION",
        data: {
          content: "You've signed out. bye-bye!",
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
          data: {},
        });
      }, 5 * 1000);
    } catch (exception) {
      console.log(exception);
      dispatch({
        type: "CREATE_NOTIFICATION",
        data: {
          content: "Something wrong happened when signing out",
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

export default loginReducer;
