import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { storage, collectDrafts } from './firebase';

import DraftPhoto from './DraftPhoto';

function Drafts({ user, username }) {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    onSnapshot(query(collectDrafts, where('username', "==", username)), (snapshot) => {
      // when posts changes this code runs
      console.log("Snapshot", snapshot.docs)
      setDrafts(snapshot.docs.map(doc => ({
        id: doc.id,
        draft: doc.data()
      })));

    })
  }, []);

  return (
    <div>
        <Grid className="profile-posts-container" container spacing={0.5}>
          {
            drafts.map(({ id, draft }) => (
              <Grid className="profile-posts" >
                <DraftPhoto
                  className="profile-post"
                  key={id}
                  postId={id}
                  user={user}
                  username={draft.username}
                  caption={draft.caption}
                  imageUrl={draft.imageUrl}
                  iso={draft.ISO}
                  cameraType={draft.cameraType}
                  fStop={draft.fStop}
                  shutterSpeed={draft.shutterSpeed}
                  focalLength={draft.focalLength}
                  lensType={draft.lensType}
                  lighting={draft.lighting}
                  location={draft.location}
                  other={draft.other}
                />
              </Grid>
            ))
          }
        </Grid>
    </div>
  )
}



export default Drafts
