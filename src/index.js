import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { firebase, FieldValue } from './lib/firebase';
import FirebaseContext from '../src/context/firebaseContext';
import './styles/app.css';
import './wdyr';
ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,

  document.getElementById('root')
);
