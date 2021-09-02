import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE": {
      const changedAnecdotes = state.map((anecdote) =>
        anecdote.id === action.data.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
      return changedAnecdotes.sort((a, b) => b.votes - a.votes);
    }
    case "NEW": {
      const changedAnecdotes = [...state, action.data];
      return changedAnecdotes.sort((a, b) => b.votes - a.votes);
    }
    case "INIT": {
      return action.data;
    }
    default:
      return state;
  }
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW",
      data: newAnecdote,
    });
  };
};

export const voteById = (id, updatedObj) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updatebyId(id, {
      ...updatedObj,
      votes: updatedObj.votes + 1,
    });
    dispatch({
      type: "VOTE",
      data: updatedAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT",
      data: anecdotes,
    });
  };
};

export default anecdoteReducer;
