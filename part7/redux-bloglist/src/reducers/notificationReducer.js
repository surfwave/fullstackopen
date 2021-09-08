const notificationReducer = (
  state = { content: "", type: "green" },
  action
) => {
  switch (action.type) {
    case "CREATE_NOTIFICATION": {
      return action.data;
    }
    case "REMOVE_NOTIFICATION": {
      return { content: "", type: "green" };
    }
    default:
      return state;
  }
};

export default notificationReducer;
