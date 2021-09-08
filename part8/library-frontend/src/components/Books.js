import React, { useState, useEffect } from 'react';
import { useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, FIND_BOOKS_BY_GENRE } from '../queries';

const Books = ({show}) => {
  const [genre, setGenre] = useState(null);
  const [books, setBooks] = useState([]);
  const [uniqueGenres, setUniqueGenres] = useState([]);

  const [getAllBooks, allBooksResult] = useLazyQuery(ALL_BOOKS);
  const [getBooksByGenre, booksByGenreResult] = useLazyQuery(FIND_BOOKS_BY_GENRE);

  useEffect(() => {
    getAllBooks();
  }, [])  // eslint-disable-line

  useEffect(() => {
    if (allBooksResult.data){
      const allBooks = allBooksResult.data.allBooks;
      const allGenres = allBooks.map(book => book.genres);
      const uniqueSet = new Set(allGenres.flat());
      const uniqueGenres = [...uniqueSet];
      setBooks(allBooks);
      setUniqueGenres(uniqueGenres);
    }
  }, [allBooksResult.data]); // eslint-disable-line

  useEffect(() => {
    if (booksByGenreResult.data) {
      setBooks(booksByGenreResult.data.allBooks);
    }
  }, [booksByGenreResult.data]); // eslint-disable-line

  if (allBooksResult.loading) {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  const changeGenres = (genre) => {
    setGenre(genre);
    getBooksByGenre({ variables: {genreToSearch: genre}});
  }

  return (
    <div>
      <h2>books</h2>
      { !genre ? <h3>All genres</h3> : <h3>Genre: {genre}</h3> }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {
          uniqueGenres.map(g => <span key={g}><button onClick={() => changeGenres(g)}>{g}</button></span> )
        }
      </div>
    </div>
  )
}

export default Books