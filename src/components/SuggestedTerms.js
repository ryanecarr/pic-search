import React from 'react';

const SuggestedTerms = ({ onClick, terms }) => {
  const onButtonClick = (e) => {
    onClick(e.target.value, 'btn');
  };
  for (let i = terms.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [terms[i], terms[j]] = [terms[j], terms[i]];
  }
  const set = terms.slice(0, Math.floor(Math.random() * terms.length + 1));
  return (
    <div className='row'>
      {set.map((term) => (
        <button
          key={term}
          style={{ marginBottom: '5px' }}
          className='ui button'
          value={term}
          onClick={onButtonClick}
        >
          {`#${term}`}
        </button>
      ))}
    </div>
  );
};

export default SuggestedTerms;
