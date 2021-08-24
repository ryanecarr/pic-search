import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FB_APIKEY}`,
  authDomain: `${process.env.REACT_APP_FB_AUTHDOMAIN}`,
  projectId: `${process.env.REACT_APP_FB_PROJECTID}`,
  storageBucket: `${process.env.REACT_APP_FB_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FB_MESSAGINGSENDERID}`,
  appId: `${process.env.REACT_APP_FB_APPID}`,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
