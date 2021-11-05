import React, { useState, useEffect, useRef } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { collection, onSnapshot, doc, addDoc, serverTimestamp, FieldValue, orderBy, query, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, collectPosts } from './firebase'
import { Button, Input, makeStyles, Modal, TextField } from '@material-ui/core';
import CameraIcon from '@mui/icons-material/Camera';
import AddCommentIcon from '@mui/icons-material/AddComment';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { CameraIcon as Aperture } from '@mui/icons-material/Camera';
import { TimerIcon as ShutterSpeed } from '@mui/icons-material/Timer';
import { FlashOnIcon as Lighting } from '@mui/icons-material/FlashOn';
import { VisibilityIcon as FocalLength } from '@mui/icons-material/Visibility';
import { LocationOnIcon as Location } from '@mui/icons-material/LocationOn';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NewProfile from './Newprofile';

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
  const left = 10;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, ${left}%)`,
  };
}

function Post({ postId, username, user, caption, imageUrl, iso, cameraType, fStop, shutterSpeed, other,
  captures,
  focalLength,
  lensType,
  lighting,
  location,
  numComments }) {

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [commentLimit, setCommentLimit] = useState(null);
  const [ownPost, setOwnPost] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openUpdateMessage, setOpenUpdateMessage] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const [updateCaption, setUpdateCaption] = useState(caption);
  const [updateCameraType, setUpdateCameraType] = useState(cameraType);
  const [updateISO, setUpdateISO] = useState(iso);
  const [updateLensType, setUpdateLensType] = useState(lensType);
  const [updateFStop, setUpdateFStop] = useState(fStop);
  const [updateShutterSpeed, setUpdateShutterSpeed] = useState(shutterSpeed);
  const [updateLighting, setUpdateLighting] = useState(lighting);
  const [updateLocation, setUpdateLocation] = useState(location);
  const [updateFocalLength, setUpdateFocalLength] = useState(focalLength);
  const [updateOther, setUpdateOther] = useState(other);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = onSnapshot(query(collection(doc(collectPosts, postId), 'comments'), orderBy('timestamp', 'desc')), (snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }
    return () => {
      unsubscribe();
    };
  }, [postId])

  const postComment = (event) => {
    event.preventDefault();
    addDoc(collection(doc(collectPosts, postId), 'comments'), {
      text: comment,
      username: user.displayName,
      timestamp: serverTimestamp(FieldValue)
    });
    const current_post = doc(collectPosts, postId);
    updateDoc(current_post, {
      numComments: numComments+1
    });
    setComment('');
  }

  const addCapture = (event) => {
    event.preventDefault();
    const current_post = doc(collectPosts, postId);
    updateDoc(current_post, {
      captures: captures + 1
    });
  }

  useEffect(() => { 
    if (numComments > 2) {
      setCommentLimit("true");
    }
  }, [numComments])

  useEffect(() => {
    if(!user) {
      setOwnPost(null);
    }
    else if(user.displayName != username) {
      setOwnPost(null);
    }
    else {
      setOwnPost('true');
    }
  }, [])

  const commentView = () => {
    setOpen(true)
  } 

  const deleteView = () => {
    if(openDelete) {
      setOpenDelete(false)
    }
    else {
      setOpenDelete(true)
    }
    
  }

  const deletePost = () => {
    deleteDoc(doc(db, 'posts', postId))
  }

  const editView = () => {
    if(openEdit) {
      setOpenEdit(false)
    }
    else {
      setOpenEdit(true)
    }
    
  }

  const updatePost = (event) => {
    event.preventDefault();
    const current_post = doc(collectPosts, postId);
    updateDoc(current_post, {
      caption: updateCaption,
      cameraType: updateCameraType,
      iso: updateISO,
      lensType: updateLensType,
      fStop: updateFStop,
      shutterSpeed: updateShutterSpeed,
      lighting: updateLighting,
      location: updateLocation,
      focalLength: updateFocalLength
    });

    setOpenEdit(false);
    setOpenUpdateMessage(true);

  }

  const profileView = () => {
    if(openProfile) {
      setOpenProfile(false)
    }
    else {
      setOpenProfile(true)
    }
  }

  const commentBoxRef = useRef();

  return (
    <div className="post">

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

            <div className='post_comments'>
            {comments.map((comment) => (
              <h4 className='a_comment'> <strong>{comment.username}</strong> {comment.text} </h4>
            ))}
          </div>

          </form>
        </div>
      </Modal>

      <Modal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
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

            <h4> Are you sure you want to delete this post? </h4>

            <div className='post_delete_buttons'>
                <button onClick={deletePost}> YES </button>
                <button onClick={deleteView}> CANCEL </button>
            </div>

          </form>
        </div>
      </Modal>

      <Modal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
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

            <div className="uploadFileComponents">

              <div className="uploadFile">
                <TextField id="standard-basic" className="imageupload_caption" label="Enter a caption" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateCaption(event.target.value)} value={updateCaption} />
                <TextField className="imageupload_photoInfo" label="Enter Camera Type" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateCameraType(event.target.value)} value={updateCameraType} />
                <TextField className="imageupload_photoInfo" label="Enter ISO" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateISO(event.target.value)} value={updateISO} />
                <TextField className="imageupload_photoInfo" label="Enter Lens" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateLensType(event.target.value)} value={updateLensType} />
                <TextField className="imageupload_photoInfo" label="Enter fStop" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateFStop(event.target.value)} value={updateFStop} />
                <TextField className="imageupload_photoInfo" label="Enter Shutter Speed" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateShutterSpeed(event.target.value)} value={updateShutterSpeed} />
                <TextField className="imageupload_photoInfo" label="Enter Lighting Details" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateLighting(event.target.value)} value={updateLighting} />
                <TextField className="imageupload_photoInfo" label="Enter Location" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateLocation(event.target.value)} value={updateLocation} />
                <TextField className="imageupload_photoInfo" label="Enter Focal Length" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateFocalLength(event.target.value)} value={updateFocalLength} />
                <TextField className="imageupload_photoInfo_other" label="Enter Other Info" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateOther(event.target.value)} value={updateOther} />
              </div>

              <Button variant="contained" color="primary" onClick={updatePost}>
                Update
              </Button>

            </div>

          </form>
        </div>
      </Modal>

      <Modal
        open={openUpdateMessage}
        onClose={() => setOpenUpdateMessage(false)}
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

            <h3> Your post has been updated successfully! </h3>

          </form>
        </div>
      </Modal>

      <Modal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      >
        <div>
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

          <NewProfile profileuser={user} profileusername={username}></NewProfile>
        </div>
      </Modal>

      <div className="post_header">
        <div className="post_header_left">
          <Avatar
            className="post_avatar"
            alt={username}
            src={"/static/images/avatar/1.jpg"}
          />
          <h3> {username} </h3>

        </div>


        {ownPost ? (
          <div>
            <Button className="post_header_editbutton" onClick={editView}><EditIcon/></Button>
            <Button className="post_header_editbutton" onClick={deleteView}><DeleteIcon/></Button>
          </div>
        ) : (
          <div>
            <Button className="post_header_button" onclick={profileView}>View Profile</Button>
          </div>

        )}
        
      </div>

      <div className="inner-post">

        <img id="img" className="image" src={imageUrl} alt="" />

        <h4 className='info1'>Camera: {cameraType} </h4>
        <h4 className='info2'>Lens Type: {lensType} </h4>
        <h4 className='info3'>ISO: {iso} </h4>
        <h4 className='info4'>f-Stop: {fStop} </h4>
        <h4 className='info5'>Shutter Speed: {shutterSpeed} s </h4>
        <h4 className='info6'>Focal Length: {focalLength} mm</h4>
        <h4 className='info7'>Lighting: {lighting} </h4>
        <h4 className='info8'>Location: {location} </h4>
        <h4 className='info9'>Other Info: {other} </h4>

      </div>

      <br></br>
      <div className='post_like_comment'>
        <Button onClick={addCapture} disabled={user==null}><CameraIcon /></Button>
        <Button onClick={() => {
          commentBoxRef.current.focus();
        }}
        className='b' disabled={user==null} ><AddCommentIcon /></Button>
      </div>
      <br></br>
      <div>
        <h4 className="post_captures"><strong> {captures} captures </strong></h4>
      </div>

      <h4 className="post_text"> <strong>{username}</strong> {caption}</h4>

      {commentLimit ? (
        <div className="comment_container">
          <a className="comment_number" onClick={commentView}>View all {numComments} comments</a>
        </div>

        ) : (
          <div className='post_comments'>
            {comments.map((comment) => (
              <h4 className='a_comment'> <strong>{comment.username}</strong> {comment.text} </h4>
            ))}
          </div>
        )}


      {
        user && (
          <form className='post_commentbox'>
            <Input
              id='t'
              ref={commentBoxRef}
              className='post_input'
              type='text'
              placeholder='Add a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              className="post_button"
              disabled={!comment}
              type='submit'
              onClick={postComment}
            >Post</Button>
          </form>
        )
      }

    </div >
  )
}

export default Post