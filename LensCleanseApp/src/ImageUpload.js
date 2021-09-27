import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { storage, collectPosts } from './firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { serverTimestamp, FieldValue } from 'firebase/firestore';
import { TextField, Input } from "@material-ui/core"

import "./Post.css"


function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    //************** NEEDS TO BE FIXED: put ***************/
    if (!image || !caption) {
      alert('PLEASE MAKE SURE YOU ENTERED BOTH IMAGE AND CAPTION')
    }
    else {
      const uploadTask = ref(storage, `images/${image.name}`).put(image);
      // const uploadTask = ref(storage, `images/${image.name}`);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          // complete function
          //************** NEEDS TO BE FIXED: child ***************/
          getDownloadURL(ref(storage, "images").child(image.name))
            .then(url => {
              collectPosts.add({
                timestamp: serverTimestamp(FieldValue),
                caption: caption,
                imageUrl: url,
                username: username
              });

              setProgress(0);
              setCaption("");
              setImage(null);

            })

        }

      )
    }
  };

  return (
    <div>
      <progress className="imageupload_progress" value={progress} max="100" />

      <TextField id="standard-basic" className="TextBox" label="Enter a caption" variant="standard" onChange={event => setCaption(event.target.value)} value={caption} />
      {/* <input type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)} value={caption} /> */}
      <Input type="file" onChange={handleChange} />
      {/* <input type="file" onChange={handleChange} /> */}
      <Button onClick={handleUpload}>
        Upload
      </Button>

    </div>
  )
}

export default ImageUpload
