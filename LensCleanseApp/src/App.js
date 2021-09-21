import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { collectPosts, auth } from './firebase'
import { onSnapshot } from 'firebase/firestore';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { Button, Input, makeStyles, Modal } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, ${left}%)`,
  };
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


function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
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
    onSnapshot(collectPosts, (snapshot) => {
      // when posts changes this code runs
      setPosts(snapshot.docs.map(doc=> ({
        id: doc.id,
        post: doc.data()
      })));

    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
    .catch((error) => alert(error.message));
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="app_signup">
              <center>
                <img
                  className="app_header_image"
                  src=""
                  alt=""
                />

                <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  type="text"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit" onClick={signUp}>Sign Up</Button> 

              </center>
            </form>
          </div>
        </Modal>

      <div className="app_header">
        <img
          className="app_header_image"
          // get logo
          // src="../Logo/logo.jpeg"
          src="https://images.squarespace-cdn.com/content/v1/575a6067b654f9b902f452f4/1552683653140-0UUVQSSUEWVC73AWAEQG/300Logo.png" 
          alt=""
        />
        <h1>Welcome to Lens Cleanse!!</h1>
      </div>

      <Button onClick={() => setOpen(true)}>Sign Up</Button> 

      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      } 
      
    </div>
  );
}

export default App;
