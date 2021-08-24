import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import firebase from '../api/firebase';
import unsplash from '../api/unsplash';
import seedData from '../seedData';

const App = () => {
  const visitorId = uuidv4();
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
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setFireBaseImages(items);
    });
  };

  const addFireBaseImage = (photosRef, doc, likes, comment) => {
    photosRef
      .set({
        id: doc,
        likes: likes,
        comments: comment ? [comment] : [],
        liked_by_user: comment ? [] : [uuid],
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

  const handleComment = (doc, likes, comment) => {
    const photosRef = firebase.firestore().collection('photos').doc(doc);
    photosRef.get().then((document) => {
      if (document.exists) {
        updateFireBaseImageComments(photosRef, comment);
      } else {
        addFireBaseImage(photosRef, doc, likes, comment);
      }
    });
  };

  const handleLike = (doc, likes, comment = '') => {
    const photosRef = firebase.firestore().collection('photos').doc(doc);
    photosRef.get().then((document) => {
      if (document.exists) {
        updateFireBaseImageLikes(photosRef, document, likes);
      } else {
        addFireBaseImage(photosRef, doc, likes, comment);
      }
    });
  };

  const addUuidToLocalStorage = () => {
    const uuid = localStorage.getItem('uuid');
    if (uuid) {
      setUuid(uuid);
    } else {
      setUuid(visitorId);
      localStorage.setItem('uuid', visitorId);
      addFireBaseUser(visitorId);
    }
  };

  useEffect(() => {
    addUuidToLocalStorage();
    //onSearchSubmit('coffee');
    onSearchSubmit(seedData[Math.floor(Math.random() * seedData.length + 1)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFireBaseImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <div className='ui container'>
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
    </div>
  );
};

export default App;
