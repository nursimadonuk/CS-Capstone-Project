// import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { storage, collectPosts } from './firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { serverTimestamp, FieldValue, addDoc } from 'firebase/firestore';
import { TextField, Input, LinearProgress, Button, IconButton, Modal, makeStyles } from "@material-ui/core"
import { createTheme, ThemeProvider } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import "./Post.css"
import "./imageUpload.css"

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 0;
  const left = 5;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, ${left}%)`,
  };
}

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
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

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

          getDownloadURL(ref(storage, `images/${image.name}`))
            .then(url => {
              addDoc(collectPosts, {
                timestamp: serverTimestamp(FieldValue),
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
  };

  return (
    <ThemeProvider theme={theme} className="imageupload">

      <Modal
          open={open}
          onClose={() => setOpen(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="app_signup">
              <center className='sign_up_heading'>
                <img
                  className="app_header_image"
                  src="LensCleanse.png"
                  alt="Lens Cleanse"
                  width='80'
                  height='auto'
                />
                <h1 className="app_header_h1">Lens Cleanse</h1>
              </center>

              <h4> Your image has been successfully uploaded to Lens Cleanse! </h4>

            </form>
          </div>
        </Modal>
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
            <button className="bottom-buttons" variant="contained" color="primary" onClick={handleUpload}>
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
