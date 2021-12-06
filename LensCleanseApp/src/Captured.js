import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { collectPosts, auth } from './firebase'

import './Newprofile.css'

import CapturedPhoto from './CapturedPhoto';

const splitTime = (date) => {
  if(!date) { return [] }
  date = date.toDate()
  const date_elements = [date.getDay(), date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes()]
  return date_elements
}

const containsCapture = (capList, capName) => {
    for(let i = 0; i < capList.length; i++) {
        if(capList[i] == capName) {
            return true;
        }
    }
    return false;
}

function Captured({ profileusername, profileuser }) {
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    onSnapshot(query(collectPosts), (snapshot) => {
      // when posts changes this code runs
      console.log("Snapshot", snapshot.docs)
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));

    })
  }, []);


  //! Replace p tags with information from Firebase
  return (
    <div>

      <div className="profile-wrapper">
        <Grid className="profile-posts-container"> {/* container spacing={0.5} */}
          {
            posts.map(({ id, post }) => (
              <Grid className="profile-posts" >
                {profileuser && post.captures.find(capturedNames => capturedNames === profileuser.displayName) ?
                <CapturedPhoto
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
              />            :
            <div></div>}

              </Grid>
            ))
          }
        </Grid>

      </div>

    </div>
  )
}

export default Captured