import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { collectPosts, auth } from './firebase'
import { onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import ImageUpload from './ImageUpload';
import AppDrawer from './components/AppDrawer';
// import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, ${left}%)`,
  };
}



function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
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
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));

    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        return updateProfile(authUser.user, {
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
  }

  const signIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <ThemeProvider theme={theme}>
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
              </center>

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
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit" onClick={signUp}>Sign Up</Button>
            </form>
          </div>
        </Modal>

        <Modal
          open={openSignIn}
          onClose={() => setOpenSignIn(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="app_signup">
              <center>
                <img
                  className="app_header_image"
                  src=""
                  alt=""
                />
              </center>

              <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit" onClick={signIn}>Sign In</Button>
            </form>
          </div>
        </Modal>


        <div className="app_header">
          <div className="drawer_and_logo">
            {user?.displayName ? (
              <AppDrawer />
            ) : (
              <img
              className="app_header_image"
              src="LensCleanse.png"
              alt="Lens Cleanse"
              width='120'
              height='auto'
              />
            )}
            <h1 className="app_header_h1">Lens Cleanse</h1>     
          </div>
          
          <div class="search-container">
            <form>
              <Input type="text" placeholder="Search.." name="search"/>
              <button type="submit"><i class="fa fa-search"></i></button>
            </form>
          </div>

          {user ? (
            <div className='app_logoutContainer'>
              <div className="SignUpButtons">
                <Button variant="contained" color="secondary" onClick={() => signOut(auth)}>Log Out</Button>
              </div>
              <div className="SignUpButtons">
                <Button variant="contained" color="primary" onClick={()=>signOut(auth)}>Upload Image</Button>
              </div>
            </div>
          ) : (
            <div className="app_loginContainer">
              <div className="SignUpButtons">
                <Button variant="contained" color="primary" onClick={() => setOpenSignIn(true)}>Sign in</Button>
              </div>
              <div className="SignUpButtons">
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Sign Up</Button>
              </div>
            </div>
          )}
        </div>

        {user?.displayName ? (
          <ImageUpload username={user.displayName} />
        ) : (
          <h3 className="upload-login-message">Login to upload an image...</h3>
        )}

        {
          posts.map(({ id, post }) => (
            <div className="posts" >
              <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
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
