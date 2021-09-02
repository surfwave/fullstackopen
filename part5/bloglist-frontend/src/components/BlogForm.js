import React, { useState } from "react";

const BlogForm = (props) => {
  const { createBlog } = props;
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <p>
          Title:
          <input
            id="blogTitle"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </p>
        <p>
          Author:
          <input
            id="blogAuthor"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </p>
        <p>
          Url:
          <input
            id="blogUrl"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </p>
        <p>
          <button type="submit">create</button>
        </p>
      </form>
    </div>
  );
};

export default BlogForm;
