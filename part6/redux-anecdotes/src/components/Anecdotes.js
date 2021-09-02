import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteById } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li key={anecdote.id}>
      <strong>{anecdote.content}</strong>
      {"  "}
      <em>has {anecdote.votes}</em>{" "}
      <button onClick={() => handleClick(anecdote.id)}>vote</button>
    </li>
  );
};

const Anecdates = () => {
  let anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  if (filter !== "" && filter.length > 2) {
    anecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  }
  const dispatch = useDispatch();
  const handleVoteClick = (id) => {
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(voteById(id, votedAnecdote));
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 5));
  };

  return (
    <div>
      <ul>
        {anecdotes.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={handleVoteClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default Anecdates;
