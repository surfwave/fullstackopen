require("dotenv").config();
const express = require("express");
const app = express();
const Note = require("./models/note");

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(express.json());
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
  Note.find({})
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      console.log("Error:", err.message);
      res.status(500).end();
    });
});

app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(400).send({ error: "cannot find the note by id" });
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/notes/:id", (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

app.post("/api/notes", (req, res, next) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note
    .save()
    .then((savedNote) => savedNote.toJSON())
    .then((savedAndFormattedNote) => res.json(savedAndFormattedNote))
    .catch((err) => next(err));
});

app.put("/api/notes/:id", (req, res, next) => {
  const body = req.body;
  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
