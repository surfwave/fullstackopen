import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogId = useParams().id;
  const blog = blogs.find((blog) => blog.id === blogId);

  const addLikesHandler = (blog) => {
    dispatch(likeBlog(blog));
  };

  const removeBlogHandler = (blog) => {
    dispatch(removeBlog(blog));
  };

  return (
    <div style={blogStyle}>
      <div className="details">
        <p>
          <strong>{blog.title}</strong> <em>by {blog.author}</em>{" "}
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
        <p>created by {blog.user.name}</p>
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

export default BlogDetails;
