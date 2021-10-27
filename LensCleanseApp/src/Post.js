import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { collection, onSnapshot, doc, addDoc, serverTimestamp, FieldValue, orderBy, query, updateDoc } from 'firebase/firestore';
import { db, collectPosts } from './firebase'
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import CameraIcon from '@mui/icons-material/Camera';
import AddCommentIcon from '@mui/icons-material/AddComment';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { CameraIcon as Aperture } from '@mui/icons-material/Camera';
import { TimerIcon as ShutterSpeed } from '@mui/icons-material/Timer';
import { FlashOnIcon as Lighting } from '@mui/icons-material/FlashOn';
import { VisibilityIcon as FocalLength } from '@mui/icons-material/Visibility';
import { LocationOnIcon as Location } from '@mui/icons-material/LocationOn';

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
  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

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

  const commentView = () => {
    setOpen(true)
  } 

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

      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt={username}
          src={"/static/images/avatar/1.jpg"}
        />
        <h3> {username} </h3>
      </div>


      {/*<img className="post_image" src={imageUrl} alt="" />*/}

      <div className="inner-post">

        <img id="img" className="image" src={imageUrl} alt="" />

        < h4 className='info1'> Camera: {cameraType} </h4>
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
        <Button onClick={addCapture}><CameraIcon /></Button>
        <Button className='b'><AddCommentIcon /></Button>
      </div>
      <br></br>
      <div>
        <h4 className="post_captures"><strong> {captures} captures </strong></h4>
      </div>

      <h4 className="post_text"> <strong>{username}</strong> {caption}</h4>

      {/* 93728 comments... -> when clicked on opens a scrollable modal with the comments */}

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