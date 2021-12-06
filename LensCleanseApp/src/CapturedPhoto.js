import React, { useState, useEffect } from 'react';

import { Dialog, DialogContent, Button, Input } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { collection, onSnapshot, doc, addDoc, Timestamp, serverTimestamp, FieldValue, orderBy, query, updateDoc } from 'firebase/firestore';
import { collectPosts, auth } from './firebase'
import './Photo.css'

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CameraIcon from '@mui/icons-material/Camera';
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';
import AddCommentIcon from '@mui/icons-material/AddComment';


  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

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

  const parseMonth = (month) => {
    if(month == 0) {
      return "January"
    }
    else if(month == 1) {
      return "Febuary"
    }
    else if(month == 2) {
      return "March"
    }
    else if(month == 3) {
      return "April"
    }
    else if(month == 4) {
      return "May"
    }
    else if(month == 5) {
      return "June"
    }
    else if(month == 6) {
      return "July"
    }
    else if(month == 7) {
        return "August"
    }
    else if(month == 8) {
        return "September"
    }
    else if(month == 9) {
        return "October"
    }
    else if(month == 10) {
        return "November"
    }
    else if(month == 11) {
        return "December"
    }
    else {
      return ""
    }
  }

  const parseTime = (timeArray) => {
    if(!timeArray) {return "No Time Stamp on Post"}

    const post_day = timeArray[0]
    const post_date = timeArray[1]
    const post_month = timeArray[2]
    const post_year = timeArray[3]
    const post_hour = timeArray[4]
    const post_minute = timeArray[5]

    let result = parseDay(post_day) + ", ";
    result += parseMonth(post_month)
    result += " "
    result += post_date
    result += ", "
    result += post_year
    result += " at "
    result += post_hour
    result += ":"
    if (post_minute < 10) {
      result += "0"
    }
    result += post_minute
    return result
}

const removeElement= (capList, item) => {
  const array = capList
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array
}

function CapturedPhoto({ postId, username, user, caption, imageUrl, iso, cameraType, fStop, shutterSpeed, other,
    captures, focalLength,lensType, lighting, location, numComments, timePosted}) {

    const [expanded, setExpanded] = useState(false); 
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const [openComment, setOpenComment] = useState(false);
    const [openViewComments, setOpenViewComments] = useState(false);
    const [openCommentPosted, setOpenCommentPosted] = useState(false);

    const handleCloseCommentPosted = () => {
        setOpenCommentPosted(!openCommentPosted)
    }

    const handleClickOpen = () => {
      setOpenComment(true);
    };
  
    const handleClose = () => {
      setOpenComment(false);
    };

    const handleViewComments = () => {
        setOpenViewComments(!openViewComments);
    }

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


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
        handleClose();
        handleCloseCommentPosted();

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

    const descriptionElementRef = React.useRef(null);
    useEffect(() => {
      if (openViewComments) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [openViewComments]);

    return (
        <div className="wrapper">

            <Dialog
                open={openCommentPosted}
                onClose={handleCloseCommentPosted}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Congrats!"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Your comment has been successfully uploaded under {username}'s "{caption}" post.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseCommentPosted}>OK</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                sx={{ width: 400 }}
                open={openViewComments}
                onClose={handleViewComments}
                scroll={'body'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Comments on {username}'s "{caption}" post</DialogTitle>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    <div className='post_comments'>
                        {comments.map((comment) => (
                        <h4 className='a_comment'> <strong>{comment.username}</strong> {comment.text} </h4>
                        ))}
                    </div>
                </DialogContentText>
                <DialogActions>
                <Button onClick={handleViewComments}>Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog className="photo-comment-dialog" open={openComment} onClose={handleClose}>
                <DialogTitle>Add a Comment on {username}'s "{caption}" post! </DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Comment"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button disabled={!comment || !user} onClick={postComment}>Comment</Button>
                </DialogActions>
            </Dialog>


            <Card sx={{ maxWidth: 400 }}>
                <CardHeader
                    title={username}
                    subheader={parseTime(timePosted)}
                />
                <CardMedia
                    component="img"
                    height="220"
                    image={imageUrl}
                    alt="Paella dish"
                />
                <CardContent>
                     <Typography variant="body2" color="text">
                        <p>{caption}</p>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <p>{captures.length} captures</p>
                        <a onClick={handleViewComments}>View all {numComments} comments</a>
                    </Typography>
                </CardContent>
                <CardActions className="buttons" disableSpacing>
                  <div>
                    {
                    user && captures.find(capturedNames => capturedNames === user.displayName)
                      ?
                      <IconButton className="likeandcomment" onClick={removeCapture} disabled={user == null}><CameraOutlinedIcon /></IconButton>
                      :
                      <IconButton className="likeandcomment" onClick={addCapture} disabled={user == null}><CameraIcon /></IconButton>
                    }
                    <IconButton disabled={!user} onClick={handleClickOpen} aria-label="share">
                        <AddCommentIcon />
                    </IconButton>

                  </div>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    <Typography paragraph>Details:</Typography>
                    <Typography paragraph>
                            <p className='info1'> <strong>Camera: </strong> {cameraType} </p>
                            <p className='info2'> <strong> Lens Type: </strong>  {lensType} </p>
                            <p className='info3'> <strong> ISO: </strong>  {iso} </p>
                            <p className='info4'> <strong> f-Stop: </strong>  {fStop} </p>
                            <p className='info5'> <strong> Shutter Speed: </strong>  {shutterSpeed} s </p>
                            <p className='info6'> <strong> Focal Length: </strong>  {focalLength} mm</p>
                            <p className='info7'> <strong> Lighting: </strong>  {lighting} </p>
                            <p className='info8'> <strong> Location: </strong>  {location} </p>
                            <p className='info9'> <strong> Other Info: </strong>  {other} </p>
                    </Typography>
                    </CardContent>
                </Collapse>
            </Card>

        </div>
    )
}

export default CapturedPhoto