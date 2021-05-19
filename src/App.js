import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Favorite from './components/Favorite';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const savedToken = localStorage.getItem('library-user-token');
    if (savedToken) setToken(savedToken);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('login');
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { !token && <button onClick={() => setPage('login')}>login</button>}
        { token && <button onClick={() => setPage('add')}>add book</button>}
        { token && <button onClick={() => setPage('favorite')}>recommend</button>}
        { token && <button onClick={logout}>logout</button>}
      </div>
      <Authors 
        token={token}
        show={page === 'authors'}
      />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginForm 
        setToken={setToken}
        setPage={setPage}
        show={page === 'login'}
      />
      <Favorite
        token={token}
        show={page === 'favorite'}
      />
    </div>
  );
};

export default App;
