const Persons = (props) => {
  const { filteredPersons } = props;

  return (
    <ul>
      {filteredPersons.map((person) => {
        return (
          <li key={person.name}>
            {person.name}
            {"  "}
            {person.number}
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
