import React, { useState } from 'react';
import { storage, collectPosts } from './firebase';


function Drafts({ username }) {

  return (
    <div>
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
  )
}



export default Drafts
