import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import "./App.css";
import { loadFromCache, signout } from "./reducers/loginReducer";
import { createBlog } from "./reducers/blogReducer";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import BlogDetails from "./components/BlogDetails";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signout());
  };

  return (
    <div>
      <Link style={padding} to="/blogs">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {currentUser ? (
        <span>
          {currentUser.name} logged in{" "}
          <button onClick={handleLogout}>logout</button>
        </span>
      ) : null}
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(loadFromCache());
  }, [dispatch]);

  const addBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObj));
  };

  return (
    <Router>
      <Menu />
      <h2>Blogs</h2>
      <Notification />
      {currentUser ? (
        <div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      ) : null}
      <Switch>
        <Route exact path="/">
          <Redirect to="/blogs" />
        </Route>
        <Route exact path="/blogs/:id">
          {currentUser ? <BlogDetails /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/blogs">
          {currentUser ? <BlogList /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/users">
          {currentUser ? <UserList /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/users/:id">
          {currentUser ? <UserDetails /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
