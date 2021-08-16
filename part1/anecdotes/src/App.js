import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const initialArray = [0, 0, 0, 0, 0, 0, 0];
  const [voteArray, setVoteArray] = useState(initialArray);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const result = Math.floor(Math.random() * (max - min)) + min;
    // console.log(result);
    return result; //不含最大值，含最小值
  }

  const voteHandler = () => {
    const copy = [...voteArray];
    copy[selected] += 1;
    console.log(copy);
    setVoteArray(copy);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <div>
        <button onClick={voteHandler}>vote</button>&nbsp;&nbsp;
        <button onClick={() => setSelected(getRandomInt(0, anecdotes.length))}>
          next anecdote
        </button>
      </div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[voteArray.indexOf(Math.max(...voteArray))]}</p>
    </div>
  );
};

export default App;
