// Import necessary functions from Firebase SDK
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyARa3F2kIya8N9eEoYCqDW6PdVG70-1WXE',
  authDomain: 'netdokproject.firebaseapp.com',
  databaseURL: 'https://netdokproject-default-rtdb.firebaseio.com',
  projectId: 'netdokproject',
  storageBucket: 'netdokproject.appspot.com',
  messagingSenderId: '590796765954',
  appId: '1:590796765954:android:e9b4ae259978074b18e01b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

// Export as a named export
export { database };
