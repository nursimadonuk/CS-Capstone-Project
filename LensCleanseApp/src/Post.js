import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { collection, onSnapshot, doc, addDoc, serverTimestamp, FieldValue, orderBy, query } from 'firebase/firestore';
import { collectPosts } from './firebase'
import { Button, Input } from '@material-ui/core';

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

            <h4 className="post_text"> <strong>{ username }</strong> { caption }</h4>

            <div className='post_comments'>
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>

        {user?.displayName ? (
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
        ) : (
                <Input
                    className='post_input_logout'
                    type='text'
                    placeholder='Login to add a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
        )}


        </div>
    )
}

export default Post