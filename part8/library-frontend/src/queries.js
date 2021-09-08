import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query {
      allBooks {
          title
          published
          genres
          author {
            name
          }
      }
  }
`;

export const ALL_AUTHORS = gql`
  query {
      allAuthors {
          name
          born
          bookCount
      }
  }
`;

export const FIND_BOOKS_BY_AUTHOR = gql`
  query findBooksByAuthor($nameToSearch: String!) {
      allBooks(author: $nameToSearch) {
          title
          author {
            name
          }
          published
      }
  }
`;

export const FIND_BOOKS_BY_GENRE = gql`
  query findBooksByGenre($genreToSearch: String!) {
      allBooks(genre: $genreToSearch) {
          title
          author {
            name
          }
          published
      }
  }
`;

export const FIND_BOOKS_BY_AUTHOR_AND_GENRE = gql`
  query findBooksByAuthorAndGenre($nameToSearch: String!, $genreToSearch: String!) {
      allBooks(author: $nameToSearch, genre: $genreToSearch) {
          title
          author {
            name
          }
          published
      }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
        title
        author {
          name
        }
        published
        genres
    }
  }
`
export const EDIT_BIRTH_YEAR_OF_AUTHOR = gql`
  mutation editBirthYearOfAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`