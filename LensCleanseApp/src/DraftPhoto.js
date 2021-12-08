import React, { useState, useEffect } from 'react';

import { Dialog, DialogContent, Button, Input } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ImageUpload from './ImageUpload';

import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { collection, onSnapshot, doc, addDoc, Timestamp, serverTimestamp, FieldValue, orderBy, query, updateDoc, deleteDoc } from 'firebase/firestore';
import { collectPosts, auth, collectDrafts, db } from './firebase'
import './Photo.css'
import './DraftPhoto.css'

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

function DraftPhoto({ postId, username, user, caption, imageUrl, iso, cameraType, fStop, shutterSpeed, other,
                    focalLength,lensType, lighting, location}) {

    const [expanded, setExpanded] = useState(false); 
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

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

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleOpenEdit = () => {
      setOpenEdit(!openEdit);
    };

    const handleOpenDelete = () => {
      setOpenDelete(!openDelete);
    };

    const updateDraft = (event) => {
      event.preventDefault();
      const current_post = doc(collectDrafts, postId);
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
    }

    const deleteDraft = () => {
      const current_post = doc(collectDrafts, postId)
      deleteDoc(doc(db, 'drafts', postId))
    }

    const uploadDraft = () => {
      if (!imageUrl || !updateCaption) {
        alert('PLEASE MAKE SURE YOU ENTERED BOTH IMAGE AND CAPTION')
        return;
      }
      let time = serverTimestamp(FieldValue)
      addDoc(collectPosts, {
        timestamp: time,
        caption: updateCaption,
        imageUrl: imageUrl,
        username: username,
        captures: [],
        ISO: updateISO,
        cameraType: updateCameraType,
        lensType: updateLensType,
        fStop: updateFStop,
        shutterSpeed: updateShutterSpeed,
        lighting: updateLighting,
        location: updateLocation,
        focalLength: updateFocalLength,
        other: updateOther,
        numComments: 0

      });
      const current_post = doc(collectDrafts, postId)
      deleteDoc(doc(db, 'drafts', postId))
    }

    const descriptionElementRef = React.useRef(null);

    return (
        <div className="wrapper">
            <Dialog 
            open={openEdit} 
            onClose={handleOpenEdit}
            fullWidth={true}
            maxWidth={'md'}>

            <DialogTitle> <h1 className="app_header_h1">Lens Cleanse Draft Edit </h1> </DialogTitle>
            <DialogContent>

            
              <div className="editdraft">
                <TextField id="standard-basic" className="draft_caption" label="Enter a caption" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateCaption(event.target.value)} value={updateCaption} />
                <TextField className="draft_photoInfo" label="Enter Camera Type" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateCameraType(event.target.value)} value={updateCameraType} />
                <TextField className="draft_photoInfo" label="Enter ISO" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateISO(event.target.value)} value={updateISO} />
                <TextField className="draft_photoInfo" label="Enter Lens" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateLensType(event.target.value)} value={updateLensType} />
                <TextField className="draft_photoInfo" label="Enter fStop" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateFStop(event.target.value)} value={updateFStop} />
                <TextField className="draft_photoInfo" label="Enter Shutter Speed" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateShutterSpeed(event.target.value)} value={updateShutterSpeed} />
                <TextField className="draft_photoInfo" label="Enter Lighting Details" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateLighting(event.target.value)} value={updateLighting} />
                <TextField className="draft_photoInfo" label="Enter Location" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateLocation(event.target.value)} value={updateLocation} />
                <TextField className="draft_photoInfo" label="Enter Focal Length" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateFocalLength(event.target.value)} value={updateFocalLength} />
                <TextField className="draft_photoInfo_other" label="Enter Other Info" defaultValue="Small" size="small" variant="filled" onChange={event => setUpdateOther(event.target.value)} value={updateOther} />
              </div>

            </DialogContent>

            <DialogActions>
            <div className="draft-delete-button">
              <button className="bottom-buttons" variant="contained" color="primary" onClick={updateDraft}>
                Update
              </button>
              <button className="bottom-buttons" variant="contained" color="primary" onClick={uploadDraft}>
                Upload
              </button>
            </div>
            </DialogActions>
            </Dialog>

            <Dialog 
            open={openDelete} 
            onClose={handleOpenDelete}
            fullWidth={true}
            maxWidth={'md'}>

            <DialogTitle> <h1 className="app_header_h1">Lens Cleanse Delete Draft </h1> </DialogTitle>
            <DialogContent>

            <div className="uploadFileComponents">
            <h4> Are you sure you want to delete this draft? </h4>

            <div className='draft_delete_buttons'>
                <button className="bottom-buttons" onClick={deleteDraft}> YES </button>
                <button className="bottom-buttons" onClick={handleOpenDelete}> CANCEL </button>
            </div>
            </div>

            </DialogContent>
            </Dialog>


            <Card sx={{ maxWidth: 400 }}>
                <CardMedia
                    component="img"
                    height="220"
                    image={imageUrl}
                    alt="Paella dish"
                />
                <CardActions className="buttons" disableSpacing>
                  <div>
                    <Button disabled={!user} onClick={handleOpenEdit} aria-label="share">
                        Edit
                    </Button>

                    <Button disabled={!user} onClick={handleOpenDelete} aria-label="share">
                        Delete
                    </Button>

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

export default DraftPhoto