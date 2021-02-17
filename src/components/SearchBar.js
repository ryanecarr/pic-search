import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.term, 'form');
  };
  render() {
    return (
      <div className='row'>
        <div className='column centered'>
          <form className='ui search' onSubmit={this.onFormSubmit}>
            <div className='field'>
              <div
                className={`ui fluid big icon input ${
                  this.props.loading ? 'loading' : ''
                }`}
              >
                <input
                  value={this.state.term}
                  className='prompt'
                  type='text'
                  autoComplete='off'
                  placeholder='Search...'
                  onChange={(e) => this.setState({ term: e.target.value })}
                />
                <i className='search icon'></i>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;
