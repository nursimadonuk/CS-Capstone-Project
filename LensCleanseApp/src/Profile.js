import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Button, Input, makeStyles, Typography, IconButton, Grid, Card, CardHeader, CardContent } from '@material-ui/core';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraIcon from '@mui/icons-material/Camera';
import TimerIcon from '@mui/icons-material/Timer';
import IsoIcon from '@mui/icons-material/Iso';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { collectPosts, auth } from './firebase'
import Navbar from './Navbar';

const sampleBackgroundImage = 'sampleProfilePicture.jpg'

function Profile() {
  const classes = useStyles();


  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // user logged in
        console.log(authUser);
        setUser(authUser);
        setUsername(authUser.displayName);
        setUserEmail(authUser.email)

        if (authUser.displayName) {
          // do not update username
        } else {
          // NEW USER
          return updateProfile(authUser, {
            displayName: username,
          });
        }

      } else {
        // user logged out
        setUser(null);
      }
    })
    return () => {
      // some cleanup action
      unsubscribe();
    }
  }, [user]);

  //! Replace p tags with information from Firebase
  return (
    <>

      {user?.displayName ? (
        <Navbar user={user} username={user.displayName} ></Navbar>
      ) : (
        <Navbar></Navbar>
      )}
      <Grid container spacing={2} className={classes.grid} >
        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center">
            <div>
              <Card className={classes.root}>
                <CardHeader className={classes.header} title={username ? username : "UserName"}
                  action={
                    <IconButton aria-label="settings" clasName={classes.iconColor}>
                      <CameraAltIcon />
                    </IconButton>
                  }
                />
              </Card>
              <div className={classes.info}>
                <h3>{username ? username : "Not Logged In"}</h3>
                <h3>{username ? "Email: " + userEmail : ""}</h3>
              </div>
            </div>
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
  },

  info: {
    paddingTop: "20px"
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