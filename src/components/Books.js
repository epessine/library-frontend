import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [ filter, setFilter ] = useState('');
  const result = useQuery(ALL_BOOKS);
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
