const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("notes", { content: 1, date: 1 });
  res.json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

usersRouter.post("/", async (req, res) => {
  const body = req.body;
  if (!body.username) {
    return res.status(400).json({
      error: "username missing",
    });
  }
  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }
  if (!body.password) {
    return res.status(400).json({
      error: "password missing",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

module.exports = usersRouter;
