import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = ({ onSearchSubmit, loading }) => {
  return (
    <div className='ui grid top-bar'>
      <div className='three column row'>
        <div className='left aligned column'>
          <div className='left menu imagegram-logo'>Imagegram</div>
        </div>
        <div className='center aligned column'>
          <div className='center menu'>
            <SearchBar onSubmit={onSearchSubmit} loading={loading} />
          </div>
        </div>
        <div className='right aligned column'>
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
    </div>
  );
};

export default Navbar;
