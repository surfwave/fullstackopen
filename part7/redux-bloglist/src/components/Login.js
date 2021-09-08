import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
import Togglable from "./Togglable";
import { signin } from "../reducers/loginReducer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      history.push("/blogs");
    }
  }, [currentUser]);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(signin({ username, password }));
    setUsername("");
    setPassword("");
  };

  return (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );
};

export default Login;
