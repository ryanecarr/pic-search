import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchBar = ({ onSubmit, loading }) => {
  const [term, setTerm] = useState('');
  const location = useLocation();

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(term);
  };

  return (
    <>
      {location.pathname === '/' && (
        <form className='ui search' onSubmit={onFormSubmit}>
          <div className='ui category search item'>
            <div className={`ui icon input ${loading ? 'loading' : ''}`}>
              <input
                value={term}
                type='text'
                autoComplete='off'
                placeholder='Search...'
                onChange={(e) => setTerm(e.target.value)}
              />
              <i className='search icon'></i>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default SearchBar;
