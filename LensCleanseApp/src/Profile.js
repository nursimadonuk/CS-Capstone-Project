import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Button, Input, makeStyles, Typography, IconButton, Grid, Card, CardHeader, CardContent } from '@material-ui/core';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraIcon from '@mui/icons-material/Camera';
import TimerIcon from '@mui/icons-material/Timer';
import IsoIcon from '@mui/icons-material/Iso';
import VisibilityIcon from '@mui/icons-material/Visibility';

const sampleBackgroundImage = 'sampleProfilePicture.jpg'

function Profile({ user, username }) {
  const classes = useStyles();
  //! Replace p tags with information from Firebase
  return (
    <>
      <Grid container spacing={2} className={classes.grid} >
        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center">
            <Card className={classes.root}>
              <CardHeader className={classes.header} title={username ? username : "UserName"}
                action={
                  <IconButton aria-label="settings" clasName={classes.iconColor}>
                    <CameraAltIcon />
                  </IconButton>
                }
              />
              <CardContent className={classes.cardHover}>
                <Typography variant="body2" gutterBottom className={classes.displayText}>
                  <div className="showText">
                    <div className={classes.cameraInfo}>
                      <CameraIcon />
                      <p> f/4</p>
                    </div>
                    <div className={classes.cameraInfo}>
                      <TimerIcon />
                      <p> 1/125 sec</p>
                    </div>
                    <div className={classes.cameraInfo}>
                      <IsoIcon />
                      <p> 300 </p>
                    </div>
                    <div className={classes.cameraInfo}>
                      <VisibilityIcon />
                      <p> 97.0 mm</p>
                    </div>
                  </div>

                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}


const useStyles = makeStyles((theme) => ({

  root: {
    width: 256,
    height: 256,
    marginTop: "100px",
    borderRadius: "20px",
    background: `url(${sampleBackgroundImage})`,
    backgroundSize: "100%",
    color: "rgba(255, 255, 255, 1) !important",
    "& p, span": {
      display: "none"
    },
    "&:hover": {
      "& p, span": {
        display: "block",
      }
    }
  },

  header: {
    color: "rgba(0, 0, 0, 1) !important",
  },

  iconColor: {
    color: "rgba(255,255, 255, 1) !important"
  },

  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  grid: {
    background: "#afeeee",
    height: "100vh",
  },
  displayText: {
    visiblilty: 'hidden',
  },
  cardHover: {
    position: 'relative',
    overflow: 'hidden',
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.3)",
      color: "rgba(137, 196, 244, 1)",
      "& p": {
        visibility: "visible",
      }
    }
  },

  cameraInfo: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "5px",
    "& p": {
      paddingLeft: "6px",
      fontSize: "13px",
      fontWeight: "bolder",
      // backgroundColor: "red"
    }
  }

  // // "*:after": {
  // //   boxSizing: "border-box",
  // //   margin: 0,
  // //   padding: 0,
  // // },

  // container: {
  //   width: "85vw",
  //   margin: "1rem auto"

  // },
  // overlay: {
  //   textAlign: "center",

  // },
  // // backDrop: {
  // //   "&:hover": {
  // //     filter: "blur(3px)",
  // //     webkitFilter: "blur(3px)",
  // //     transition: ".3s all"
  // //     // backgroundColor: "rgba(0,0,30, 0.4)",
  // //   }
  // // },

  // bg: {
  //   textAlign: "center",
  //   float: "left",
  //   maxWidth: "31%",
  //   position: "relative",
  //   margin: ".5%",
  //   "& img": {
  //     width: "100%",
  //     height: "100%",
  //     marginBottom: "-4px",
  //   },
  //   overlay: {
  //     position: "absolute",
  //     top: 0,
  //     left: 0,
  //     bottom: 0,
  //     width: "100%",
  //     background: "$bg",
  //     color: "#fff",
  //     opacity: 0,
  //     "&:hover": {
  //       opacity: 1,
  //     },
  //     "& h2": {
  //       paddingTop: "20%",
  //     },
  //     "& p": {
  //     }
  //   },
  //   "&:hover": {
  //     "& img": {
  //       webkitFilter: "{blur(2px)}",
  //       filter: "blur(2px)",
  //     }
  //   }
  // }


}));


export default Profile