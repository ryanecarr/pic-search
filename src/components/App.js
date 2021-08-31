import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import UserLikes from './UserLikes';
import firebase from '../api/firebase';
import unsplash from '../api/unsplash';
import seedData from '../seedData';

const App = () => {
  const [images, setImages] = useState([]);
  const [fireBaseImages, setFireBaseImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uuid, setUuid] = useState('');

  const onSearchSubmit = async (term) => {
    setLoading(true);
    const response = await unsplash.get('/search/photos', {
      params: {
        query: term,
      },
    });
    setImages(response.data.results);
    setLoading(false);
  };

  const getFireBaseImages = () => {
    const ref = firebase.firestore().collection('photos');
    ref.onSnapshot((item) => {
      const items = item.docs.map((doc) => doc.data());
      setFireBaseImages(items);
    });
  };

  const addFireBaseImage = (photosRef, doc, likes, comment, image) => {
    photosRef
      .set({
        id: doc,
        likes: likes,
        comments: comment ? [comment] : [],
        liked_by_user: comment ? [] : [uuid],
        image: image,
      })
      .then(() => {
        console.log('Document successfully added');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  const addFireBaseUser = (id) => {
    const ref = firebase.firestore().collection('users');
    ref
      .doc(id)
      .set({
        created: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        console.log('User successfully added');
      })
      .catch((error) => {
        console.error('Error adding user: ', error);
      });
  };

  const updateFireBaseImageComments = (ref, comment) => {
    ref
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(comment),
      })
      .then(() => {
        console.log('Document comments successfully updated');
      })
      .catch((error) => {
        console.error('Error updating document comments: ', error);
      });
  };

  const updateFireBaseImageLikes = (photosRef, document, likes) => {
    const liked = document.data().liked_by_user.some((id) => id === uuid);
    photosRef
      .update({
        likes: likes,
        liked_by_user: liked
          ? firebase.firestore.FieldValue.arrayRemove(uuid)
          : firebase.firestore.FieldValue.arrayUnion(uuid),
      })
      .then(() => {
        console.log('Document likes successfully updated');
      })
      .catch((error) => {
        console.error('Error updating document likes: ', error);
      });
  };

  const handleComment = (doc, likes, comment, image) => {
    const photosRef = firebase.firestore().collection('photos').doc(doc);
    photosRef.get().then((document) => {
      if (document.exists) {
        updateFireBaseImageComments(photosRef, comment);
      } else {
        addFireBaseImage(photosRef, doc, likes, comment, image);
      }
    });
  };

  const handleLike = (doc, likes, comment = '', image = '') => {
    const photosRef = firebase.firestore().collection('photos').doc(doc);
    photosRef.get().then((document) => {
      if (document.exists) {
        updateFireBaseImageLikes(photosRef, document, likes);
      } else {
        addFireBaseImage(photosRef, doc, likes, comment, image);
      }
    });
  };

  const addUuidToLocalStorage = (anonId) => {
    const uid = localStorage.getItem('uid');
    if (uid) {
      setUuid(uid);
    } else {
      setUuid(anonId);
      localStorage.setItem('uid', anonId);
      addFireBaseUser(anonId);
    }
  };

  const anonSignIn = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then((response) => {
        addUuidToLocalStorage(response.user.uid);
      })
      .catch((error) => {
        console.log('Authentication failed:', error);
      });
  };

  useEffect(() => {
    anonSignIn();
    onSearchSubmit(seedData[Math.floor(Math.random() * seedData.length + 1)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFireBaseImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <>
        <div className='ui container'>
          <div className='ui large secondary pointing menu'>
            <Link to='/' className='item'>
              Home
            </Link>
            <Link to='/likes' className='item'>
              Likes
            </Link>
          </div>
        </div>
        <Switch>
          <div className='ui container'>
            <Route exact path='/'>
              <div className='ui stackable three column padded relaxed grid'>
                <SearchBar onSubmit={onSearchSubmit} loading={loading} />
                <ImageList
                  images={images}
                  fireBaseImages={fireBaseImages}
                  handleComment={handleComment}
                  handleLike={handleLike}
                  uuid={uuid}
                />
              </div>
            </Route>
            <Route path='/likes'>
              <UserLikes
                fireBaseImages={fireBaseImages}
                handleLike={handleLike}
                uuid={uuid}
              />
            </Route>
          </div>
        </Switch>
      </>
    </Router>
  );
};

export default withRouter(App);
