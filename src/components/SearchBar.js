import React, { useState } from 'react';

const SearchBar = ({ onSubmit, loading }) => {
  const [term, setTerm] = useState('');
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(term);
  };
  return (
    <div className='row'>
      <div className='column centered'>
        <form className='ui search' onSubmit={onFormSubmit}>
          <div className='field'>
            <div
              className={`ui fluid big icon input ${loading ? 'loading' : ''}`}
            >
              <input
                value={term}
                className='prompt'
                type='text'
                autoComplete='off'
                placeholder='Search...'
                onChange={(e) => setTerm(e.target.value)}
              />
              <i className='search icon'></i>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
