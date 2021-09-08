import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const currentUser = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllBlogs());
    }
  }, [currentUser]);

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>{" "}
          <em>by {blog.author}</em>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
