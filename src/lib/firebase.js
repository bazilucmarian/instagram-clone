import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyCpksx1UnC5MpnijdZ-0Q-j6_KjSZ96Hxs',
  authDomain: 'instagram-clone-b50e1.firebaseapp.com',
  projectId: 'instagram-clone-b50e1',
  storageBucket: 'instagram-clone-b50e1.appspot.com',
  messagingSenderId: '402453199090',
  appId: '1:402453199090:web:cd0ecc18fa1a605ea9f86b',
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here we call seed file just once
// seedDatabase(firebase);

export { firebase, FieldValue };
