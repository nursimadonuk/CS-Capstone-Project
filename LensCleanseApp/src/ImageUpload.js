// import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { storage, collectPosts } from './firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { serverTimestamp, FieldValue, addDoc } from 'firebase/firestore';
import { TextField, Input, LinearProgress, Button, IconButton } from "@material-ui/core"
import { createTheme, ThemeProvider } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import "./Post.css"
import "./ImageUpload.css"

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');


  const fileInput = React.createRef()

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
   
    if (!image || !caption) {
      alert('PLEASE MAKE SURE YOU ENTERED BOTH IMAGE AND CAPTION')
    }
    else {

      const uploadTask = uploadBytesResumable(ref(storage, `images/${image.name}`), image);
      
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
          getDownloadURL(ref(storage, `images/${image.name}`))
            .then(url => {
              addDoc(collectPosts, {
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
    <ThemeProvider theme={theme} className="imageupload">
      <div>

        <progress className="imageupload_progress" value={progress} max="100" />
        <div className="uploadFileComponents">
            <TextField id="standard-basic" className="imageupload_caption" label="Enter a caption" defaultValue="Small" size="small" variant="filled" onChange={event => setCaption(event.target.value)} value={caption} />
        </div>
        
        <div className="uploadFileComponents">
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" type="file" onChange={handleChange}
              style={{ display: "none" }}
            />
            <Button variant="contained" component="span">
              Choose File
            </Button>
          </label>
        </div>

        <div className="uploadFileComponents">
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>
    </ThemeProvider>
  )
}

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


export default ImageUpload
