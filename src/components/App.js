import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SuggestedTerms from './SuggestedTerms';
import ImageList from './ImageList';
import unsplash from '../api/unsplash';
import seedData from '../seedData';
import '../App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const onSearchSubmit = async (term, src) => {
    setLoading(true);
    const response = await unsplash.get('/search/photos', {
      params: {
        query: term,
      },
    });
    setImages(response.data.results);
    setLoading(false);
  };
  useEffect(() => {
    onSearchSubmit(seedData[Math.floor(Math.random() * seedData.length + 1)]);
  }, []);
  return (
    <div className='ui container'>
      <div className='ui stackable three column padded relaxed grid'>
        <SearchBar
          onSubmit={onSearchSubmit}
          loading={loading}
        />
        <SuggestedTerms onClick={onSearchSubmit} terms={seedData} />
        <ImageList images={images} />
      </div>
    </div>
  );
};

export default App;
