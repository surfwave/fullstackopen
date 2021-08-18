import React, { useState } from "react";

const PersonForm = (props) => {
  const { persons, addPersonHandler, updatePersonHandler } = props;
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const found = persons.find((person) => person.name === newName);

    if (found) {
      if (
        window.confirm(
          `${found.name} is already added to phonebook, replace the old nunber with a new one?`
        )
      ) {
        const newPerson = { ...found, number: newNumber };
        setNewName("");
        setNewNumber("");
        updatePersonHandler(newPerson);
      }
    } else {
      let maxIdOfPerson = persons.reduce(
        (max, person) => {
          return person.id > max.id ? person : max;
        },
        { id: Number.MIN_SAFE_INTEGER }
      );
      const maxId = maxIdOfPerson.id;
      const newPerson = { name: newName, number: newNumber, id: maxId + 1 };
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
