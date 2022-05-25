import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import ImageList from './ImageList';
import UserLikes from './UserLikes';
import firebase from '../api/firebase';
import unsplash from '../api/unsplash';
import seedData from '../seedData';
import Navbar from './Navbar';

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
        console.log('Document likes successfully updateed');
      })
      .catch((error) => {
        console.error('Error updating document likes: ', error);
      });
  };

  const handleComment = (doc, likes, comment, image) => {
    const photosRef = firebase.firestore().collection('photos').doc(doc);
    const userRef = firebase.firestore().collection('users').doc(uuid);
    photosRef.get().then((document) => {
      if (document.exists) {
        updateFireBaseImageComments(photosRef, comment);
      } else {
        addFireBaseImage(photosRef, doc, likes, comment, image);
      }
    });
    userRef.update({
      comments: firebase.firestore.FieldValue.increment(1),
    });
  };

  const handleLike = (doc, likes, comment = '', image = '', liked) => {
    console.log('liked: ', liked);
    const photosRef = firebase.firestore().collection('photos').doc(doc);
    const userRef = firebase.firestore().collection('users').doc(uuid);
    photosRef.get().then((document) => {
      if (document.exists) {
        updateFireBaseImageLikes(photosRef, document, likes);
      } else {
        addFireBaseImage(photosRef, doc, likes, comment, image);
      }
      if (liked) {
        userRef.update({
          likes: firebase.firestore.FieldValue.increment(1),
        });
      } else {
        userRef.get().then((document) => {
          if (document.data().likes) {
            userRef.update({
              likes: firebase.firestore.FieldValue.increment(-1),
            });
          }
        });
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
    /* getFireBaseImages(); */
    const unsubscribe = firebase.firestore().collection('photos');
    unsubscribe.onSnapshot((item) => {
      const items = item.docs.map((doc) => doc.data());
      setFireBaseImages(items);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='ui container'>
      <Navbar onSearchSubmit={onSearchSubmit} loading={loading} />
      <Switch>
        <Route exact path='/'>
          <ImageList
            images={images}
            fireBaseImages={fireBaseImages}
            handleComment={handleComment}
            handleLike={handleLike}
            uuid={uuid}
          />
        </Route>
        <Route path='/likes'>
          <UserLikes
            fireBaseImages={fireBaseImages}
            handleLike={handleLike}
            uuid={uuid}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
