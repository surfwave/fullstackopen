import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const useNotes = (url) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setNotes(response.data);
    });
  }, [url]);
  return notes;
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const notes = useNotes(BACKEND_URL);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div className="container">
      <p>Hello webpack {counter} clicks</p>
      <button onClick={handleClick}>press</button>
      <div>{notes.length} notes on the server {BACKEND_URL}</div>
    </div>
  );
};

export default App;
