import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../reducers/userReducer";
import { Link } from "react-router-dom";

const UserList = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllUsers());
    }
  }, [currentUser]);

  return (
    <>
      {users && users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>blog created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>none of users</div>
      )}
    </>
  );
};

export default UserList;
