import React, { useState } from "react";
const Blog = ({ blog, addLikes, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

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
          <button className="likeBtn" onClick={() => addLikes(blog)}>like</button>
        </p>
        <p>creator {blog.user.name}</p>
        <p>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: 5,
            }}
            onClick={() => removeBlog(blog)}
          >
            remove
          </button>
        </p>
      </div>
    </div>
  );
};

export default Blog;
