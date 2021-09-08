import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!blog) {
    const blogId = useParams().id;
    blog = blogs.find((blog) => blog.id === blogId);
  }

  const addLikesHandler = (blog) => {
    dispatch(likeBlog(blog));
  };

  const removeBlogHandler = (blog) => {
    dispatch(removeBlog(blog));
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <strong>{blog.title}</strong> <em>by {blog.author}</em>{" "}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="details">
        <p>
          <strong>{blog.title}</strong> <em>by {blog.author}</em>{" "}
          <button onClick={toggleVisibility}>hide</button>
        </p>
        <p>
          visit{" "}
          <a className="blogUrl" href={blog.url} alt={blog.title}>
            {blog.url}
          </a>
        </p>
        <p>
          <span className="likeSpan">likes {blog.likes}</span>{" "}
          <button className="likeBtn" onClick={() => addLikesHandler(blog)}>
            like
          </button>
        </p>
        <p>creator {blog.user.name}</p>
        <p>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: 5,
            }}
            onClick={() => removeBlogHandler(blog)}
          >
            remove
          </button>
        </p>
      </div>
    </div>
  );
};

export default Blog;
