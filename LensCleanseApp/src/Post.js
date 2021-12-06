import React, { useState, useEffect, useRef } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { collection, onSnapshot, doc, addDoc, serverTimestamp, FieldValue, orderBy, query, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, collectPosts } from './firebase'
import { Button, Input, makeStyles, Modal, TextField } from '@material-ui/core';

import CameraIcon from '@mui/icons-material/Camera';
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';
import AddCommentIcon from '@mui/icons-material/AddComment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const parseDay = (day) => {
  if(day == 0) {
    return "Mon"
  }
  else if(day == 1) {
    return "Tue"
  }
  else if(day == 2) {
    return "Wed"
  }
  else if(day == 3) {
    return "Thu"
  }
  else if(day == 4) {
    return "Fri"
  }
  else if(day == 5) {
    return "Sat"
  }
  else if(day == 6) {
    return "Sun"
  }
  else {
    return ""
  }
}

const parseTime = (datePosted) => {
    const now = new Date();

    if(!datePosted) { return "No Time Stamp on Post" }

    try {
      let miliSecs = datePosted.getTime();
    }
    catch(err) {
      return "Posted seconds ago"
    }

    const secDifference = (now.getTime() - datePosted.getTime()) / 1000;

    if(secDifference < 10) {
      return "Posted a few seconds ago"
    }
    else if (secDifference < 60) {
      let result = "Posted " + secDifference;
      if (secDifference == 1) {
        result += " second ago";
      }
      else {
        result += " seconds ago";
      }
      return result;
    }
    else if (secDifference < 3600) {
      let result = "Posted " + Math.floor(secDifference/60);
      if (Math.floor(secDifference/60) == 1) {
        result += " minute ago";
      }
      else {
        result += " minutes ago";
      }
      return result;
    }
    else if (secDifference < 86400) {
      let result = "Posted " + Math.floor(secDifference/3600);
      if (Math.floor(secDifference/3600) == 1) {
        result += " hour ago";
      }
      else {
        result += " hours ago";
      }
      return result;
    }
    else if (secDifference < 1296000) {
      let result = "Posted " + Math.floor(secDifference/86400);
      if (Math.floor(secDifference/3600) == 1) {
        result += " day ago";
      }
      else {
        result += " days ago";
      }
      return result;
    }
    else {
      let result = "Posted " + (datePosted.getMonth()+1)
      result += "/"
      result += datePosted.getDate()
      result += "/"
      result += datePosted.getFullYear()
      result += ", "
      result += parseDay(datePosted.getDay())
      result += " at "
      result += datePosted.getHours()
      result += ":"
      if (datePosted.getMinutes() < 10) {
        result += "0"
      }
      result += datePosted.getMinutes()
      return result
    }
}

const removeElement= (capList, item) => {
  const array = capList
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array
}

function Post({ postId, username, user, caption, imageUrl, iso, cameraType, fStop, shutterSpeed, other,
  captures,
  focalLength,
  lensType,
  lighting,
  location,
  numComments,
  timePosted }) {

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

  const [userCaptured, setUserCaptured] = useState("")

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = onSnapshot(query(collection(doc(collectPosts, postId), 'comments'), orderBy('timestamp', 'desc')), (snapshot) => {
        setComments(snapshot.docs.map((doc) => ({
          id: doc.id,
          comment: doc.data()
        })));
      });
    }
    return () => {
      unsubscribe();
    };
  }, [postId, comment])


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
    const current_post = doc(collectPosts, postId)
    updateDoc(current_post, {
      captures: [...captures, user.displayName]
    });
  }

  const removeCapture = (event) => {
    event.preventDefault();
    const current_post = doc(collectPosts, postId)
    updateDoc(current_post, {
      captures: removeElement(captures, user.displayName)
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
    const current_post = doc(collectPosts, postId)
    updateDoc(current_post, {
      captures: []
    })
    comments.map(({ id, comment }) => (
      deleteDoc(doc(collection(doc(collectPosts, postId), 'comments'), id))
    ))
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
      ISO: updateISO,
      lensType: updateLensType,
      fStop: updateFStop,
      shutterSpeed: updateShutterSpeed,
      lighting: updateLighting,
      location: updateLocation,
      focalLength: updateFocalLength,
      other: updateOther
    });

    setOpenEdit(false);
    setOpenUpdateMessage(true);

  }

  const profileView = () => {
    if(openProfile) {
      setOpenProfile(false)
    } else {
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
            {comments.map(({ id, comment }) => (
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
                <button className="bottom-buttons" onClick={deletePost}> YES </button>
                <button className="bottom-buttons" onClick={deleteView}> CANCEL </button>
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

              <div className="post-edit-button">
                <button className="bottom-buttons" variant="contained" color="primary" onClick={updatePost}>
                  Update
                </button>
              </div>
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

      <Dialog
        fullScreen
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        TransitionComponent={Transition}
        className="profile-dialog"
      >
        <center className='profile-nav-heading'>

          <div className="profile-nav">
            <div className="profile-nav-left">
              <img
                className="app_header_image"
                src="LensCleanse.png"
                alt="Lens Cleanse"
                width='80'
                height='auto'
              />
              <h1 className="app_header_h1">{username}</h1>
            </div>

            <IconButton
                className="x-button"
                color="inherit"
                onClick={profileView}
                aria-label="close"
              >
                <CloseIcon />
            </IconButton>
          </div>

        </center>

        <NewProfile profileusername={username} profileuser={user}></NewProfile>

      </Dialog>

      <div className="post_header">
        <div className="post_header_left">
          <Avatar
            className="post_avatar"
            alt={username}
            src={"/static/images/avatar/1.jpg"}
          />
          <h3 onClick={profileView}> {username} </h3>

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
        {
          user && captures.find(capturedNames => capturedNames === user.displayName)
            ?
            <Button onClick={removeCapture} disabled={user == null}><CameraOutlinedIcon /></Button>
            :
            <Button onClick={addCapture} disabled={user == null}><CameraIcon /></Button>
          }
        <Button onClick={() => {
          commentBoxRef.current.focus();
        }}
        className='b' disabled={user==null} ><AddCommentIcon /></Button>
      </div>
      <br></br>
      <div>
        {/* {} */}
        <h4 className="post_captures"><strong> {captures.length} captures </strong></h4>
      </div>

      <h4 className="post_text"> <strong>{username}</strong> {caption}</h4>

      {commentLimit ? (
        <div className="comment_container">
          <a className="comment_number" onClick={commentView}>View all {numComments} comments</a>
        </div>

        ) : (
          <div className='post_comments'>
            {comments.map(({ id, comment }) => (
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

      <p className='time'> {parseTime(timePosted)} </p>

    </div >
  )
}

export default Post