const Note = require("../models/note");
const User = require("../models/user");

const initialNotes = [
  {
    content: "Typescript is awesome",
    date: new Date(),
    important: true,
  },
  {
    content: "Florida is a state of sunshine",
    date: new Date(),
    important: false,
  },
  {
    content: "Jerry is a mouse",
    date: new Date(),
    important: false,
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: "will remove this soon", date: new Date() });
  await note.save();
  await note.remove();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
};
