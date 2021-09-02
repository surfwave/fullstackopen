import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import "./App.css";

const Notification = ({ message }) => {
  if (message) {
    return <div className={message.type}>{message.content}</div>;
  } else {
    return null;
  }
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => {
        setBlogs(blogs.sort((a, b) => b.likes - a.likes));
      });
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (exception) {
      setErrorMessage({ content: "Wrong username or password", type: "error" });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("loggedBlogappUser");
      blogService.setToken(null);
      setUser(null);
      setUsername("");
      setPassword("");
      setErrorMessage({ content: "You've logged out.", type: "success" });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage({ content: "Something wrong happened", type: "error" });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (blogObj) => {
    try {
      blogFormRef.current.toggleVisibility();
      const savedBlog = await blogService.create(blogObj);
      setBlogs(blogs.concat(savedBlog).sort((a, b) => b.likes - a.likes));
      setErrorMessage({
        content: `a new blog [${savedBlog.title}] by ${savedBlog.author} added`,
        type: "success",
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage({ content: "Something wrong happened", type: "error" });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addLikesHandler = async (blog) => {
    try {
      const { title, author, id, likes, url, user } = blog;
      const newBlogObj = {
        title,
        author,
        likes: likes + 1,
        url,
        user: user.id,
      };
      const updatedBlog = await blogService.update(id, newBlogObj);
      if (updatedBlog) {
        const updatedBlogs = blogs.map((item) => {
          if (item.id === blog.id) {
            item.likes += 1;
            return item;
          } else {
            return item;
          }
        });
        setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
        setErrorMessage({
          content: `the blog [${blog.title}] by ${blog.author} updated`,
          type: "success",
        });
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    } catch (exception) {
      setErrorMessage({ content: "Something wrong happened", type: "error" });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const removeBlogHandler = async (blog) => {
    try {
      await blogService.remove(blog.id);
      setBlogs(
        blogs
          .filter((item) => item.id !== blog.id)
          .sort((a, b) => b.likes - a.likes)
      );
      setErrorMessage({
        content: `the blog [${blog.title}] by ${blog.author} removed`,
        type: "success",
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage({ content: "Something wrong happened", type: "error" });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      {user ? (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              addLikes={addLikesHandler}
              removeBlog={removeBlogHandler}
            />
          ))}
        </div>
      ) : (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}
    </div>
  );
};

export default App;
