import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import './App.css';

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errMessage, setErrMessage] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    noteService.create(noteObj).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    // console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    // console.log(`importance of ${id} needs to be toggled`);
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important};

    noteService.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote));
    }).catch(err => {
      setErrMessage(`the note '${note.content}' was already deleted from server`)
      setNotes(notes.filter(n => n.id !== id));
      setTimeout(() => {
        setErrMessage(null);
      }, 5000);
    })
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
