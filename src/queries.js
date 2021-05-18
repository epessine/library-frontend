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
      author
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