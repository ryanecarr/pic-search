import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.REACT_APP_UNSPLASH_BASEURL}`,
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_APIKEY}`,
  },
});
