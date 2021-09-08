import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BIRTH_YEAR_OF_AUTHOR } from "../queries";
import Select from "react-select";

const BirthForm = ({ authors, setError }) => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [editBirthYearOfAuthor, result] = useMutation(
    EDIT_BIRTH_YEAR_OF_AUTHOR,
    {
      refetchQueries: [{ query: ALL_AUTHORS }],
      onError: (error) => {
        setError(error.graphQLErrors[0].message);
      },
    }
  );

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log("author not found");
    }
  }, [result.data]); // eslint-disable-line

  const submit = (event) => {
    event.preventDefault();
    editBirthYearOfAuthor({ variables: { name, born: parseInt(birthYear) } });
    setName("");
    setBirthYear("");
  };

  const options = authors.map((author) => {
    return { value: author.name, label: author.name };
  });

  const onChangeSelect = (item) => {
    setName(item.value);
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 5 }}>
          <Select
            defaultValue={options[0]}
            options={options}
            onChange={onChangeSelect}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          born:{" "}
          <input
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthForm;
