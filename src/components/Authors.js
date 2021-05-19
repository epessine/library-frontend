import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { ALL_AUTHORS, UPDATE_AUTHOR, BOOK_ADDED } from '../queries';
import useField from '../hooks/useField';

const Authors = (props) => {
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });
  const [getAllAuthors, authorsResult] = useLazyQuery(ALL_AUTHORS);
  const [name, setName] = useState('');
  const born = useField('text');

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      getAllAuthors();
    }
  });

  useEffect(() => {
    getAllAuthors();
  }, []);

  if (!props.show) {
    return null;
  }
  if (authorsResult.loading || !authorsResult.data) return (<p>loading...</p>);
  const authors = authorsResult.data.allAuthors;
  const submit = async (event) => {
    event.preventDefault();
    updateAuthor({
      variables: {
        name,
        born: Number(born.fields.value)
      }
    });
    setName('');
    born.reset();
    getAllAuthors();
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { props.token && (
        <form onSubmit={submit}>
          <h3>set birthyear</h3>
          <div>
            name
            <select 
              value={name} 
              onChange={({ target }) => setName(target.value)}
            >
              <option value=""></option>
              {authors.map((author) => (
                <option key={author.id} value={author.name}>{author.name}</option>
              ))}
            </select>
          </div>
          <div>
            born
            <input {...born.fields}/>
          </div>
          <button type='submit'>update author</button>
        </form>
      )}
    </div>
  );
};

export default Authors;
