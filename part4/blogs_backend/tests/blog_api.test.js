const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blog");

beforeEach(async () => {
  jest.setTimeout(10000);
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("quantity of blogs are right", async () => {
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("id is the unique attribute", async () => {
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].id).toBeDefined();
  });
});

describe("addition of a new blog", () => {
  // test("a valid blog can be added", async () => {
  //   const newBlog = {
  //     title: "async/await simplifies making async calls",
  //     author: "King Wesley",
  //     url: "http://www.unknownsite.com/articles/153",
  //     likes: 1,
  //   };
  //   await api
  //     .post("/api/blogs")
  //     .send(newBlog)
  //     .expect(201)
  //     .expect("Content-Type", /application\/json/);
  //   const blogsAtEnd = await helper.blogsInDb();
  //   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  //   const titles = blogsAtEnd.map((n) => n.title);
  //   expect(titles).toContain("async/await simplifies making async calls");
  // });

  // test("a valid blog without likes can be added", async () => {
  //   const newBlog = {
  //     title: "async/await simplifies making async calls",
  //     author: "King Wesley",
  //     url: "http://www.unknownsite.com/articles/153",
  //   };
  //   await api
  //     .post("/api/blogs")
  //     .send(newBlog)
  //     .expect(201)
  //     .expect("Content-Type", /application\/json/);
  //   const blogsAtEnd = await helper.blogsInDb();
  //   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  //   const titles = blogsAtEnd.filter(
  //     (blog) => blog.title === "async/await simplifies making async calls"
  //   );
  //   expect(titles).toHaveLength(1);
  //   expect(titles[0].likes).toBe(0);
  // });

  // test("an invalid blog cannot be added", async () => {
  //   const newBlog = {
  //     author: "King Wesley",
  //   };
  //   await api.post("/api/blogs").send(newBlog).expect(400);
  // });

  test("an blog cannot be added without token", async () => {
    const newUser = {
      blogs: [],
      username: "surfwave",
      name: "Rennie Crown",
      password: "xixihaha",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const loginInfo = {
      username: "surfwave",
      password: "xixihaha",
    };

    const loginResult = await api
      .post("/api/login")
      .send(loginInfo)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // expect(loginResult.body.token).toBeDefined();

    const { token } = loginResult.body;

    const newBlog = {
      title: "The Afghan Army Collapsed In Days",
      author: "Tom Bowman",
      url: "https://www.npr.org/2021/08/20/1029451594/the-afghan-army-collapsed-in-days-here-are-the-reasons-why",
      likes: 0,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("update of a blog", () => {
  test("succeeds with valid data", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    blogToUpdate.title = "updated title";

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("updated title");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
