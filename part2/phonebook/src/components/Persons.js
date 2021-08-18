const Persons = (props) => {
  const { filteredPersons, removePerson } = props;
  return (
    <ul>
      {filteredPersons.map((person) => {
        return (
          <li key={person.id}>
            {person.name}
            {"  "}
            {person.number}
            {"  "}
            <button onClick={() => removePerson(person.id)}>delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
