import * as firebase from 'firebase';
import config from './../constants/config';

const conf = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
};
firebase.initializeApp(conf);

export default firebase;
