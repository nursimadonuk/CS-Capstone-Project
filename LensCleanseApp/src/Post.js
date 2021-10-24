import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { collection, onSnapshot, doc, addDoc, serverTimestamp, FieldValue, orderBy, query, updateDoc } from 'firebase/firestore';
import { db, collectPosts } from './firebase'
import { Button, Input } from '@material-ui/core';
import CameraIcon from '@mui/icons-material/Camera';
import AddCommentIcon from '@mui/icons-material/AddComment';

function Post({ postId, username, user, caption, imageUrl, iso, cameraType, exposure, fStop, shutterSpeed, specifyFocus, verticalTilt, zoomFactor, captures}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

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
        setComment('');
    }

    const addCapture = (event) => {
        event.preventDefault();
        const current_post = doc(collectPosts, postId);
        updateDoc(current_post, {
            captures: captures+1
        });
    }

    return (
        <div className="post">
            <div className="post_header"> 
                <Avatar
                    className="post_avatar"
                    alt={username}
                    src={"/static/images/avatar/1.jpg"}
                />
                <h3> {username} </h3>
            </div>


            {/*<img className="post_image" src={imageUrl} alt="" />*/}

            <div id="1" className="flip-card">
                <div id="2" className="flip-card-inner">
                    <div id="3" className="flip-card-front">
                        <img id="img" className="post_image" src={imageUrl} alt="" />
                    </div>
                    <div id="4" className="flip-card-back">
                        <h4 className='info'><strong>Camera Type: </strong> {cameraType} </h4>
                        <h4 className='info'><strong>ISO:</strong> {iso} </h4>
                        <h4 className='info'><strong>Exposure: </strong> {exposure} </h4>
                        <h4 className='info'><strong>f-Stop:</strong> {fStop} </h4>
                        <h4 className='info'><strong>Shutter Speed:</strong> {shutterSpeed} </h4>
                        <h4 className='info'><strong>Specify Focus:</strong> {specifyFocus} </h4>
                        <h4 className='info'><strong>Vertical Tilt:</strong> {verticalTilt} </h4>
                        <h4 className='info'><strong>Zoom Factor:</strong> {zoomFactor} </h4>
                    </div>
                </div>
            </div>
            
            {/*document.getElementById("1").style.height = document.getElementById("img").style.height*/}

            <br></br>
            <div className='post_like_comment'>
                <Button onClick={addCapture}><CameraIcon /></Button>
                <Button className='b'><AddCommentIcon /></Button>
            </div>
            <br></br>
            <div>
                <h4 className="post_captures"><strong> {captures} captures </strong></h4>
            </div>

            <h4 className="post_text"> <strong>{ username }</strong> { caption }</h4>

            {/* 93728 comments... -> when clicked on opens a scrollable modal with the comments */}

            <div className='post_comments'>
                {comments.map((comment) => (
                    <h4 className='a_comment'> <strong>{comment.username}</strong> {comment.text} </h4>
                ))}
            </div>

            {user && (
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
            )}

        </div>
    )
}

export default Post