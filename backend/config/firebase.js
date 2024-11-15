import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyARa3F2kIya8N9eEoYCqDW6PdVG70-1WXE',
  authDomain: 'netdokproject.firebaseapp.com',
  databaseURL: 'https://netdokproject-default-rtdb.firebaseio.com',
  projectId: 'netdokproject',
  storageBucket: 'netdokproject.appspot.com',
  messagingSenderId: '590796765954',
  appId: '1:590796765954:android:e9b4ae259978074b18e01b',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.database();

export default database;
