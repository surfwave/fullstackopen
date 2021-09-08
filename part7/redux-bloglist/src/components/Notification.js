import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    color: notification.type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    display: notification.content === "" ? "none" : "",
  };

  return <div style={style}>{notification.content}</div>;
};

export default Notification;
