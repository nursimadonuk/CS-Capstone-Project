import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Button, Input, makeStyles, Typography, IconButton, Grid, Card, CardHeader, CardContent } from '@material-ui/core';
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { collectPosts, auth } from './firebase'
import Navbar from './Navbar';
import Photo from './Photo';
import './Newprofile.css'

const sampleBackgroundImage = 'sampleProfilePicture.jpg'

function NewProfile({ profileusername, profileuser }) {
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // user logged in
        console.log(authUser);
        setUser(authUser);
        setUsername(authUser.displayName);
        setUserEmail(authUser.email)

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
  }, [user]);

  if(user) {
      onSnapshot(query(collectPosts, where('username', "==", user.displayName)), (snapshot) => {
        // when posts changes this code runs
        console.log("Snapshot", snapshot.docs)
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        })));
      })
  }


  //! Replace p tags with information from Firebase
  return (
    <div>
      {user?.displayName ? (
        <Navbar user={user} username={user.displayName} ></Navbar>
      ) : (
        <Navbar></Navbar>
      )}
      <div className="info">
        <h3>{username ? username : "Not Logged In"}</h3>
        <h3>{username ? "Email: " + userEmail : ""}</h3>
      </div>

      {
          posts.map(({ id, post }) => (
            <div className="profile-posts" >
              <Photo
                className="profile-post"
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
  )
}

export default NewProfile