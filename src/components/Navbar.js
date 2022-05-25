import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = ({ onSearchSubmit, loading }) => {
  return (
    <div class='ui stackable three column grid top-bar'>
      <div class='column logo'>
        <div className='left menu imagegram-logo'>imagegram</div>
      </div>
      <div class='center aligned column'>
        <SearchBar onSubmit={onSearchSubmit} loading={loading} />
      </div>
      <div class='column icons'>
        <Link to='/' className='item'>
          <i className='large home icon'></i>
        </Link>
        <Link to='/likes' className='item'>
          <i className='large heart icon'></i>
        </Link>
        <Link to='/' className='item'>
          <i className='large user circle icon'></i>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
