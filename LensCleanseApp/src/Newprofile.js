import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { collectPosts, auth } from './firebase'
import Photo from './Photo';
import './Newprofile.css'

const splitTime = (date) => {
  if(!date) { return [] }
  date = date.toDate()
  const date_elements = [date.getDay(), date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes()]
  return date_elements
}

function NewProfile({ profileusername, profileuser }) {
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    onSnapshot(query(collectPosts, where('username', "==", profileusername)), (snapshot) => {
      // when posts changes this code runs
      console.log("Snapshot", snapshot.docs)
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));

    })
  }, []);

  const getEmail = () => {
    if (profileuser) {
      if(profileusername==profileuser.displayName) {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  //! Replace p tags with information from Firebase
  return (
    <div>
      <div className="info">

      {getEmail ? (
          <h3> Email: {profileusername.toLowerCase()}@gmail.com </h3>
        ) : (
          <h3> Email: {profileusername}@gmail.com </h3>
        )}
        
      </div>

      <div className="profile-wrapper">
        <Grid className="profile-posts-container" container spacing={0.5}>
          {
            posts.map(({ id, post }) => (
              <Grid className="profile-posts" >
                <Photo
                  className="profile-post"
                  key={id}
                  postId={id}
                  user={profileuser}
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
                  timePosted={splitTime(post.timestamp)}
                />
              </Grid>
            ))
          }
        </Grid>

      </div>

    </div>
  )
}

export default NewProfile