const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "CREATE_NOTIFICATION": {
      return action.data.content;
    }
    case "REMOVE_NOTIFICATION": {
      return "";
    }
    default:
      return state;
  }
};

export const setNotification = (content, seconds) => {
  return (dispatch) => {
    dispatch({
      type: "CREATE_NOTIFICATION",
      data: {
        content,
      },
    });
    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
        data: {},
      });
    }, seconds * 1000);
  };
};

export default notificationReducer;
