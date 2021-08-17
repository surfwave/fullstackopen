import React, { useState } from "react";

const PersonForm = (props) => {
  const { persons, addPersonHandler } = props;
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const found = persons.find((person) => person.name === newName);

    if (found) {
      alert(`${newName} is already added to phonebook.`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setNewName("");
      setNewNumber("");
      addPersonHandler(newPerson);
    }
  };

  return (
    <div>
      <form>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
