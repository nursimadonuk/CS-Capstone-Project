import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { collectPosts, auth } from './firebase'
import { onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import ImageUpload from './ImageUpload';
import Navbar from './Navbar';
import { popoverClasses } from '@mui/material';

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // user logged in
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // do not update username
        } else {
          // NEW USER
          return updateProfile(authUser, {
            displayName: username,
          });
        }

      } else {
        // user logged out
        setUser(null);
      }
    })
    return () => {
      // some cleanup action
      unsubscribe();
    }
  }, [user, username]);

  // runs piece of code on specific condition
  useEffect(() => {
    onSnapshot(query(collectPosts, orderBy('timestamp', 'desc')), (snapshot) => {
      // when posts changes this code runs
      console.log("Snapshot", snapshot.docs)
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));

    })
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">

        {user?.displayName ? (
          <Navbar user={user} username={user.displayName} ></Navbar>
        ) : (
          <Navbar></Navbar>
        )}

        <br></br>
        <br></br>

        {/*user?.displayName ? (           
          <ImageUpload username={user.displayName} />

        ) : (
          <h3 className="upload-login-message">Login to upload an image...</h3>
        )*/}

        {
          posts.map(({ id, post }) => (
            <div className="posts" >
              <Post
                key={id}
                postId={id}
                user={user}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
                iso={post.ISO}
                cameraType={post.cameraType}
                fStop={post.fStop}
                shutterSpeed={post.shutterSpeed}
                captures={post.captures}
                focalLength={post.focalLength}
                lensType={post.lensType}
                lighting={post.lighting}
                location={post.location}
                other={post.other}
                numComments={post.numComments}
              />
            </div>
          ))
        }

      </div>
    </ThemeProvider>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blue[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: red[500],
    },
  },
});

export default App;
