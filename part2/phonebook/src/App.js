import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [filterStr, SetFilterStr] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const addPersonHandler = (newPerson) => {
    SetFilterStr("");
    setFilteredPersons(persons.concat(newPerson));
    setPersons(persons.concat(newPerson));
  };

  const displayFilter = (event) => {
    SetFilterStr(event.target.value);
    if (event.target.value.length < 2) {
      setFilteredPersons(persons);
    } else {
      const newFilteredPersons = filteredPersons.filter((person) =>
        person.name.toLowerCase().includes(filterStr.toLowerCase())
      );
      setFilteredPersons(newFilteredPersons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        tip="filter shown with"
        displayFilter={displayFilter}
        filterStr={filterStr}
      />
      <h2>add a new</h2>
      <PersonForm persons={persons} addPersonHandler={addPersonHandler} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
