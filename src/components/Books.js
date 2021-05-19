import React, { useState, useEffect } from 'react';
import { useLazyQuery, useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from '../queries';

const Books = (props) => {
  const [ filter, setFilter ] = useState('');
  const [ getAllBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    getAllBooks();
  },[filter]); // eslint-disable-line

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      getAllBooks();
    }
  });

  let books = [];
  if (!props.show) {
    return null;
  }
  if (result.loading) return (<p>loading...</p>);
  const genres = result.data.allBooks.reduce((res, book) => {
    book.genres.forEach(genre => res.push(genre));
    return [ ...new Set(res) ];
  }, []);
  if (filter) {
    books = result.data.allBooks.filter((book) => 
      book.genres.includes(filter)
    );
  } else {
    books = result.data.allBooks;
  }

  return (
    <div>
      <h2>books</h2>
      { filter && <p>in genre <b>{ filter }</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(g => (
        <button
          onClick={() => setFilter(g)}
          key={g} 
          type='button'
        >{ g }</button>
      ))}
      <button
        onClick={() => setFilter('')}
        type='button'
      >all genres</button>
    </div>
  );
};

export default Books;
