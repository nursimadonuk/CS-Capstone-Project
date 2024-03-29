// import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { storage, collectPosts, collectDrafts } from './firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { serverTimestamp, FieldValue, addDoc } from 'firebase/firestore';
import { TextField, Input, LinearProgress, Button, IconButton, Modal, makeStyles } from "@material-ui/core"
import { createTheme, ThemeProvider } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import "./Post.css"
import "./imageUpload.css"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');
  const [cameraType, setCameraType] = useState('');
  const [ISO, setISO] = useState(0);
  const [lensType, setLensType] = useState('');
  const [fStop, setFStop] = useState(0);
  const [shutterSpeed, setShutterSpeed] = useState("");
  const [lighting, setLighting] = useState("");
  const [location, setLocation] = useState("");
  const [focalLength, setFocalLength] = useState(0);
  const [other, setOther] = useState("");
  const [open, setOpen] = useState(false);


  const fileInput = React.createRef()

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }
  
  const handleDraftUpload = () => {
    if (!image) {
      alert('PLEASE MAKE SURE YOU ENTERED AN IMAGE');
      return;
    }
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
            getDownloadURL(ref(storage, `images/${image.name}`))
            .then(url => {
              addDoc(collectDrafts, {
                caption: caption,
                imageUrl: url,
                username: username,
                ISO: ISO,
                cameraType: cameraType,
                lensType: lensType,
                fStop: fStop,
                shutterSpeed: shutterSpeed,
                lighting: lighting,
                location: location,
                focalLength: focalLength,
                other: other

              });

              setProgress(0);
              setCaption("");
              setImage(null);
              setCameraType("");
              setISO(0);
              setLensType("");
              setFStop(0);
              setShutterSpeed("");
              setLighting("");
              setLocation("");
              setFocalLength(0);
              setOther("");
              setOpen(true);

            })
          }

      )

  }

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
          let time = serverTimestamp(FieldValue)
          setTimeout(() => {
            getDownloadURL(ref(storage, `images/${image.name}`))
            .then(url => {
              addDoc(collectPosts, {
                timestamp: time,
                caption: caption,
                imageUrl: url,
                username: username,
                captures: [],
                ISO: ISO,
                cameraType: cameraType,
                lensType: lensType,
                fStop: fStop,
                shutterSpeed: shutterSpeed,
                lighting: lighting,
                location: location,
                focalLength: focalLength,
                other: other,
                numComments: 0

              });

              setProgress(0);
              setCaption("");
              setImage("https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg");
              setCameraType("");
              setISO(0);
              setLensType("");
              setFStop(0);
              setShutterSpeed("");
              setLighting("");
              setLocation("");
              setFocalLength(0);
              setOther("");
              setOpen(true);

            })

          }, 500)
          }

      )
    }
  };

  return (
    <ThemeProvider theme={theme} className="imageupload">

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
              <img
                  className="app_header_image"
                  src="LensCleanse.png"
                  alt="Lens Cleanse"
                  width='80'
                  height='auto'
                />
                <h1 className="app_header_h1">Lens Cleanse</h1>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Your image has been successfully uploaded to Lens Cleanse! 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>OK</Button>
          </DialogActions>
        </Dialog>
      <div>

        <progress className="imageupload_progress" value={progress} max="100" />
        <div className="uploadFileComponents">
          <TextField id="standard-basic" className="imageupload_caption" label="Enter a caption" defaultValue="Small" size="small" variant="filled" onChange={event => setCaption(event.target.value)} value={caption} />
        </div>

        <div className="uploadFileComponents">
          <label htmlFor="contained-button-file">
            <Input className="file-input" accept="image/*" id="contained-button-file" type="file" onChange={handleChange} />
          </label>

          <div className="uploadFile">
            <TextField className="imageupload_photoInfo" label="Enter Camera Type" defaultValue="Small" size="small" variant="filled" onChange={event => setCameraType(event.target.value)} value={cameraType} />
            <TextField className="imageupload_photoInfo" label="Enter ISO" defaultValue="Small" size="small" variant="filled" onChange={event => setISO(event.target.value)} value={ISO} />
            <TextField className="imageupload_photoInfo" label="Enter Lens" defaultValue="Small" size="small" variant="filled" onChange={event => setLensType(event.target.value)} value={lensType} />
            <TextField className="imageupload_photoInfo" label="Enter fStop" defaultValue="Small" size="small" variant="filled" onChange={event => setFStop(event.target.value)} value={fStop} />
            <TextField className="imageupload_photoInfo" label="Enter Shutter Speed" defaultValue="Small" size="small" variant="filled" onChange={event => setShutterSpeed(event.target.value)} value={shutterSpeed} />
            <TextField className="imageupload_photoInfo" label="Enter Lighting Details" defaultValue="Small" size="small" variant="filled" onChange={event => setLighting(event.target.value)} value={lighting} />
            <TextField className="imageupload_photoInfo" label="Enter Location" defaultValue="Small" size="small" variant="filled" onChange={event => setLocation(event.target.value)} value={location} />
            <TextField className="imageupload_photoInfo" label="Enter Focal Length" defaultValue="Small" size="small" variant="filled" onChange={event => setFocalLength(event.target.value)} value={focalLength} />
            <TextField className="imageupload_photoInfo_other" label="Enter Other Info" defaultValue="Small" size="small" variant="filled" onChange={event => setOther(event.target.value)} value={other} />

          </div>

          <div className="image-upload-buttons">
            <button className="bottom-buttons" variant="contained" color="primary" onClick={handleDraftUpload}>
              Save As Draft
            </button>
            <button className="bottom-buttons" variant="contained" color="primary" onClick={handleUpload}>
              Upload
            </button>
          </div>
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
