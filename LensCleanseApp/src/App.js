import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { collectPosts } from './firebase'
import { doc, onSnapshot } from 'firebase/firestore';

function App() {
  const [posts, setPosts] = useState([]);

  // runs piece of code on specific condition
  useEffect(() => {
    onSnapshot(collectPosts, (snapshot) => {
      // when posts changes this code runs
      setPosts(snapshot.docs.map(doc=>doc.data()));
    })
  }, []);

  return (
    <div className="app">

      <div className="app_header">
        <img
          className="app_header_image"
          // get logo
          src="../Logo/logo.jpeg" 
          alt=""
        />
        <h1>Welcome to Lens Cleanse!!</h1>
      </div>  
      
    </div>
  );
}

export default App;
