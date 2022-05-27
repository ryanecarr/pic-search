import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = ({ onSearchSubmit, loading }) => {
  return (
    <div className='ui stackable three column grid top-bar'>
      <div className='column logo'>
        <div className='left menu imagegram-logo'>imagegram</div>
      </div>
      <div className='center aligned column'>
        <SearchBar onSubmit={onSearchSubmit} loading={loading} />
      </div>
      <div className='column icons'>
        <Link to='/' className='item'>
          <i className='large home icon' id='home_icon'></i>
        </Link>
        <Link to='/likes' className='item'>
          <i className='large heart icon' id='likes_icon'></i>
        </Link>
        <Link to='/' className='item'>
          <i className='large user circle icon' id='user_icon'></i>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
