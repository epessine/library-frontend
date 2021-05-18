import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { CURRENT_USER, FIND_BOOKS_BY_GENRE } from '../queries';

const Favorite = ({ show, token }) => {
  const [ user, setUser ] = useState(null);
  const [ getUser, userResult ] = useLazyQuery(CURRENT_USER, {
    fetchPolicy: 'no-cache'
  });
  const [ getBooks, booksResult ] = useLazyQuery(FIND_BOOKS_BY_GENRE, {
    fetchPolicy: 'no-cache'
  });
  
  useEffect(() => {
    if (token) getUser();
  }, [token]); // eslint-disable-line
  
  useEffect(() => {
    if (userResult.data) {
      setUser(userResult.data.currentUser);
    }
  }, [userResult]);

  useEffect(() => {
    if (user) {
      getBooks({ variables: { genre: user.favoriteGenre } });
    }
  }, [user, show]); // eslint-disable-line

  if (!show) {
    return null;
  }

  if (booksResult.loading || !booksResult.data || !user) return (<p>loading...</p>);

  return (
    <div>
      <h2>recommendations</h2>
      { user.favoriteGenre && <p>books in your favorite genre <b>{ user.favoriteGenre }</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksResult.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Favorite;