import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import "./App.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterStr, SetFilterStr] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [errMessage, setErrMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFilteredPersons(initialPersons);
    });
  }, []);

  const addPersonHandler = (newPerson) => {
    personService
      .create(newPerson)
      .then((returnedPerson) => {
        SetFilterStr("");
        setFilteredPersons(persons.concat(returnedPerson));
        setPersons(persons.concat(returnedPerson));
        setErrMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setErrMessage(null);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePersonHandler = (newPerson) => {
    personService
      .update(newPerson.id, newPerson)
      .then((returnedPerson) => {
        SetFilterStr("");
        setFilteredPersons(
          persons.map((person) =>
            person.id !== newPerson.id ? person : returnedPerson
          )
        );
        setPersons(
          persons.map((person) =>
            person.id !== newPerson.id ? person : returnedPerson
          )
        );
        setErrMessage(`Updated ${returnedPerson.name}`);
        setTimeout(() => {
          setErrMessage(null);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const removePersonOf = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
        .remove(id)
        .then((result) => {
          console.log(result);
          setFilteredPersons(
            filteredPersons.filter((person) => person.id !== id)
          );
          setPersons(persons.filter((person) => person.id !== id));
          setErrMessage(`${person.name} has been deleted`);
          setTimeout(() => {
            setErrMessage(null);
          }, 5000);
        })
        .catch((err) => {
          setErrMessage(
            `Information of ${person.name} has already been removde from server. Please refresh the page.`
          );
          setTimeout(() => {
            setErrMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <Notification message={errMessage} />
      <h2>Phonebook</h2>
      <Filter
        tip="filter shown with"
        displayFilter={displayFilter}
        filterStr={filterStr}
      />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        addPersonHandler={addPersonHandler}
        updatePersonHandler={updatePersonHandler}
      />
      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        removePerson={removePersonOf}
      />
    </div>
  );
};

export default App;
