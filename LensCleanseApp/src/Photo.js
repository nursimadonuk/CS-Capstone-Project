import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Button, Input, makeStyles, Modal } from '@material-ui/core';
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { collection, onSnapshot, doc, addDoc, Timestamp, serverTimestamp, FieldValue, orderBy, query, updateDoc } from 'firebase/firestore';
import { collectPosts, auth } from './firebase'
import './Photo.css'

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

function Photo({ postId, username, user, caption, imageUrl, iso, cameraType, fStop, shutterSpeed, other,
    captures,
    focalLength,
    lensType,
    lighting,
    location,
    numComments }) {
    
    const [comments, setComments] = useState([]);
    const [open, setOpen] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
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

    const commentView = () => {
    setOpen(true)
    } 

    const infoView = () => {
        setOpenInfo(true)
    } 

    return (
        <div className="wrapper">

            <Modal
                open={openInfo}
                onClose={() => setOpenInfo(false)}
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

                        <div className='photo-info'>
                            <h4 className='info1'> Camera: {cameraType} </h4>
                            <h4 className='info2'>Lens Type: {lensType} </h4>
                            <h4 className='info3'>ISO: {iso} </h4>
                            <h4 className='info4'>f-Stop: {fStop} </h4>
                            <h4 className='info5'>Shutter Speed: {shutterSpeed} s </h4>
                            <h4 className='info6'>Focal Length: {focalLength} mm</h4>
                            <h4 className='info7'>Lighting: {lighting} </h4>
                            <h4 className='info8'>Location: {location} </h4>
                            <h4 className='info9'>Other Info: {other} </h4>
                        </div>

                    </form>
                </div>
            </Modal>

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

            <div className="image-wrapper">
                <img id="img" className="profile-post-image" src={imageUrl} alt="" />
                <div className="content">
                    <a className="info_display" onClick={infoView}>View all photo information</a>
                    <p className="capture_display">{captures} captures</p>
                    <a className="comment_display" onClick={commentView}>View all {numComments} comments</a>
                    <p className="caption_display">Caption: {caption}</p>
                </div>
            </div>


        </div>
    )
}

export default Photo