import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBszu7M2wnNsnre_DbJhTjDCgpBlCDJEUE",
    authDomain: "lens-cleanse.firebaseapp.com",
    databaseURL: "https://lens-cleanse-default-rtdb.firebaseio.com",
    projectId: "lens-cleanse",
    storageBucket: "lens-cleanse.appspot.com",
    messagingSenderId: "116210973241",
    appId: "1:116210973241:web:f68db9479f1b5fe0602be8",
    measurementId: "G-JJQGPGW33F"
});

const auth = getAuth(firebaseApp); // login sign up
const db = getFirestore(firebaseApp); // database
const collectPosts = collection(db, 'posts');
const storage = getStorage(firebaseApp); // upload pics


export { auth, collectPosts, db, storage };