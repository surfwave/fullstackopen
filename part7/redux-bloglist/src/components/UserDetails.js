import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const UserDetails = () => {
  const users = useSelector((state) => state.users);
  const userId = useParams().id;
  const user = users.find((user) => user.id === userId);

  return (
    <div>
      <h3>{user.name}</h3>
      <ul>
        {user.blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              {"  "}
              <em>by {blog.author}</em>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserDetails;
