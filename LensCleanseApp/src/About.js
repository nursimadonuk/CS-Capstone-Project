import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Navbar from './Navbar';
import { auth } from './firebase'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import { onAuthStateChanged, updateProfile } from "firebase/auth";

function About() {
  const classes = useStyles();
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
  return (
    <div>
      <div>
        {user?.displayName ? (
          <Navbar user={user} username={user.displayName} ></Navbar>
        ) : (
          <Navbar></Navbar>
        )}
      </div>
      <div className={classes.wrapper}>
        <div className={classes.secondWrappers}>
          <div className={classes.aboutInfo}>
            <p>
              As photographers we long for an app that is dedicated to just us and our professional work where we can share our photos with other photographers. Photographers want to know what goes into other photographers' work and how they create them. Lens cleanse will allow us to learn just that.
            </p>
          </div>

          <div>
            <br />
            <br />
            <h2>Contact Us</h2>
            <br />
            <p> 63-10 Something Ave, Rego Park, </p>
            <p> NY 11429</p>
            <p>info@lenscleanse.com</p>
            <p>(347) 500- 4000</p>

            <p>(646) 200- 9999</p>
            <div className={classes.icons}>
              <button className={classes.icons}>
                <FacebookIcon />
              </button>
              <button className={classes.icons}>
                <TwitterIcon />
              </button>
              <button className={classes.icons}>
                <InstagramIcon />
              </button>
            </div>
          </div>



        </div>
        <div className={classes.secondWrappers}>

          {/* <img src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" alt="photo" /> */}
        </div>
      </div>
    </div>
  )
}


const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: "0 auto",
    width: "100%",
    height: "800px",
    display: "flex",
    flexDirection: "row",
    // border: "2px solid red",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(https://images.unsplash.com/photo-1612144788280-c9096c34486a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    fontWeight: "500",
    fontSize: 12
  },
  secondWrappers: {
    flex: 1,
    width: "500px",
    padding: "20px"
  },
  icons: {
    border: "none",
    backgroundColor: "transparent"
  },
  aboutInfo: {
    fontSize: 16,
    padding: "25px",

  },

}));

export default About