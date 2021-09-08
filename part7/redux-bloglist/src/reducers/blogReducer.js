import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_BLOGS": {
      return action.data;
    }
    case "NEW_BLOG": {
      const changedBlogs = [...state, action.data];
      return changedBlogs.sort((a, b) => b.likes - a.likes);
    }
    case "LIKE": {
      const changedBlogs = state.map((blog) =>
        blog.id === action.data.id ? { ...blog, likes: blog.likes + 1 } : blog
      );
      return changedBlogs.sort((a, b) => b.likes - a.likes);
    }
    case "REMOVE": {
      const changedBlogs = state.filter((blog) => blog.id !== action.data.id);
      return changedBlogs.sort((a, b) => b.likes - a.likes);
    }
    default:
      return state;
  }
};

export const getAllBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch({
        type: "GET_ALL_BLOGS",
        data: blogs.sort((a, b) => b.likes - a.likes),
      });
    } catch (exception) {
      console.log(exception);
      dispatch({
        type: "CREATE_NOTIFICATION",
        data: {
          content: "Something wrong happened when signing out",
          type: "error",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
          data: {},
        });
      }, 5 * 1000);
    }
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      dispatch({
        type: "NEW_BLOG",
        data: createdBlog,
      });
      dispatch({
        type: "CREATE_NOTIFICATION",
        data: {
          content: `a new blog [${createdBlog.title}] by ${createdBlog.author} created`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
          data: {},
        });
      }, 5 * 1000);
    } catch (exception) {
      console.log(exception);
      dispatch({
        type: "CREATE_NOTIFICATION",
        data: {
          content: "Something wrong happened when creating a new blog",
          type: "error",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
          data: {},
        });
      }, 5 * 1000);
    }
  };
};

export const likeBlog = (likedBlog) => {
  return async (dispatch) => {
    try {
      const willUpdateBlog = {
        ...likedBlog,
        likes: likedBlog.likes + 1,
        user: likedBlog.user.id,
      };
      const updatedBlog = await blogService.update(
        likedBlog.id,
        willUpdateBlog
      );
      dispatch({
        type: "LIKE",
        data: updatedBlog,
      });
      dispatch({
        type: "CREATE_NOTIFICATION",
        data: {
          content: `the blog [${updatedBlog.title}] updated`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
          data: {},
        });
      }, 5 * 1000);
    } catch (exception) {
      console.log(exception);
      dispatch({
        type: "CREATE_NOTIFICATION",
        data: {
          content: "Something wrong happened when updating the blog",
          type: "error",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
          data: {},
        });
      }, 5 * 1000);
    }
  };
};

export const removeBlog = (removedBlog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(removedBlog.id);
      dispatch({
        type: "REMOVE",
        data: removedBlog,
      });
      dispatch({
        type: "CREATE_NOTIFICATION",
        data: {
          content: `the blog [${removedBlog.title}] by ${removedBlog.author} removed`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
          data: {},
        });
      }, 5 * 1000);
    } catch (exception) {
      console.log(exception);
      dispatch({
        type: "CREATE_NOTIFICATION",
        data: {
          content: "Something wrong happened when removing the blog",
          type: "error",
        },
      });
      setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
          data: {},
        });
      }, 5 * 1000);
    }
  };
};

export default blogReducer;
