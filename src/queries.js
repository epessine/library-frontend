import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      _id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      _id
      title
      published
      author {
        _id
        name
        born
        bookCount
      }
      genres
    }
  }
`;

export const FIND_BOOKS_BY_GENRE = gql`
  query findBooksByGenre($genre: String!) {
    allBooks (genre: $genre) {
      _id
      title
      published
      author {
        _id
        name
        born
        bookCount
      }
      genres
    }
  }
`;

export const CURRENT_USER = gql`
  query {
    currentUser {
      _id
      username
      favoriteGenre
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      _id
      title
      published
      author {
        _id
        name
        born
        bookCount
      }
      genres
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor(
    $name: String!,
    $born: Int!
  ) {
    editAuthor(
      name: $name,
      born: $born
    ) {
      _id
      name
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation login(
    $username: String!, 
    $password: String!
  ) {
    login(
      username: $username, 
      password: $password
    ) {
      value
    }
  }
`;