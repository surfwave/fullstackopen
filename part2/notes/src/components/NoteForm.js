import React, { useState } from "react";

const NoteForm = (props) => {
  const { createNote } = props;
  const [newNote, setNewNote] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: false//Math.random() > 0.5,
    });

    setNewNote("");
  };

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
