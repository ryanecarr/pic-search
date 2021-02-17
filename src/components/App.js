import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SuggestedTerms from './SuggestedTerms';
import ImageList from './ImageList';
import unsplash from '../api/unsplash';
import seedData from '../seedData';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      loading: false,
    };
  }
  onSearchSubmit = async (term, src) => {
    this.setState({ loading: true });

    const response = await unsplash.get('/search/photos', {
      params: {
        query: term,
      },
    });

    this.setState({
      images: response.data.results,
      loading: false,
    });

    console.log(response.data.results, this.state.term);
  };
  componentDidMount() {
    console.log('inside component did mount');
    this.onSearchSubmit(
      seedData[Math.floor(Math.random() * seedData.length + 1)]
    );
  }
  render() {
    return (
      <div className='ui container'>
        <div className='ui stackable three column padded relaxed grid'>
          <SearchBar
            onSubmit={this.onSearchSubmit}
            loading={this.state.loading}
          />
          <SuggestedTerms onClick={this.onSearchSubmit} terms={seedData} />
          <ImageList images={this.state.images} />
        </div>
      </div>
    );
  }
}

export default App;
