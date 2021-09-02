const collection = require("lodash/collection");

const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => {
    return max.likes < item.likes ? item : max;
  };

  return blogs.reduce(reducer, { title: "", author: "", url: "", likes: 0 });
};

const mostBlogs = (blogs) => {
  let result = [];
  for (let blog of blogs) {
    if (!result) {
      result.push({ author: blog.author, blogs: 1 });
    } else if (result.find((element) => element.author === blog.author)) {
      const existed = result.find((element) => element.author === blog.author);
      existed.blogs += 1;
    } else {
      result.push({ author: blog.author, blogs: 1 });
    }
  }

  const reducer = (max, item) => {
    return max.blogs < item.blogs ? item : max;
  };

  return result.reduce(reducer, { author: "", blogs: 0 });
};

const mostLikes = (blogs) => {
  let result = [];
  for (let blog of blogs) {
    if (!result) {
      result.push({ author: blog.author, likes: blog.likes });
    } else if (result.find((element) => element.author === blog.author)) {
      const existed = result.find((element) => element.author === blog.author);
      existed.likes += blog.likes;
    } else {
      result.push({ author: blog.author, likes: blog.likes });
    }
  }

  const sortedLikes = collection.orderBy(result, ["likes"], ["asc"]);

  return sortedLikes[sortedLikes.length - 1];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
