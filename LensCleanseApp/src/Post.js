import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { collection, onSnapshot, doc, addDoc, serverTimestamp, FieldValue, orderBy, query } from 'firebase/firestore';
import { collectPosts } from './firebase'
import { Button, Input } from '@material-ui/core';
import CameraIcon from '@mui/icons-material/Camera';
import AddCommentIcon from '@mui/icons-material/AddComment';

function Post({ postId, username, user, caption, imageUrl }) {
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

            <img className="post_image" src={imageUrl} alt="" />

            <div className='post_like_comment'>
                <Button><CameraIcon /></Button>
                <Button><AddCommentIcon /></Button>
            </div>

            <h4 className="post_text"> <strong>{ username }</strong> { caption }</h4>

            {/* 93728 comments... -> when clicked on opens a scrollable modal with the comments */}

            <div className='post_comments'>
                {comments.map((comment) => (
                    <p className='a_comment'>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>

            {user && (
                <form className='post_commentbox'>
                    <Input
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