import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { collectPosts, auth } from './firebase'
import Photo from './Photo';
import './Newprofile.css'


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


  //! Replace p tags with information from Firebase
  return (
    <div>
      <div className="info">
        <h3> {profileusername} </h3>
        <h3>{username ? "Email: "  : "" }</h3>
      </div>

      <Grid className="profile-posts-container" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {
          posts.map(({ id, post }) => (
            <Grid xs={2} sm={4} md={4} className="profile-posts" >
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
            </Grid>
          ))
        }
      </Grid>

    </div>
  )
}

export default NewProfile