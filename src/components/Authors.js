import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';
import useField from '../hooks/useField';

const Authors = (props) => {
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });
  const result = useQuery(ALL_AUTHORS);
  const [name, setName] = useState('');
  const born = useField('text');
  if (!props.show) {
    return null;
  }
  if (result.loading) return (<p>loading...</p>);
  const authors = result.data.allAuthors;
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
    </div>
  );
};

export default Authors;
