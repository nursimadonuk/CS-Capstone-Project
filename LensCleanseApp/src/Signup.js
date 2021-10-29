import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import './Signup.css'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 10;
  const left = 10;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, ${left}%)`,
  };
}

function Signup() {
    let history = useHistory();

    const toSignIn = () => {
        history.push('/login')
    }

    const toMain = () => {
        history.push('/')
    } 

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
          if (authUser) {
            // user logged in
            console.log(authUser);
            setUser(authUser);
    
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
      }, [user, username]);


    const signUp = (event) => {
        event.preventDefault();
    
        createUserWithEmailAndPassword(auth, email, password)
          .then((authUser) => {
            return updateProfile(authUser.user, {
              displayName: username
            })
          })
          .catch((error) => alert(error.message));     
    }

    return(
      <div className="wrap" >
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

              <h4> You have successfully signed up for your Lens Cleanse account! Now you can sign in and start sharing your awesome work! </h4>

            </form>
          </div>
        </Modal>

        <Navbar></Navbar>
        <div className="login">
            <div className="sign-in" style={{ backgroundImage: "url(/bg.jpg)" }}>
                <form className="sign-in-form">
                    <div className="section">
                        <div className="heading">
                            <h4 className="begin">Sign up for </h4>
                            <h3 className="title"> Lens Cleanse </h3>
                        </div>
                    </div>
                    <br></br>
                    <div className="section">
                        <input id="user" type="text" className="section-input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} ></input>
                    </div>
                    <div className="section">
                        <input id="user" type="text" className="section-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} ></input>
                    </div>
                    <div className="section">
                        <input id="user" type="password" className="section-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                    </div>
                    <div className="section">
                        <button type="submit" className="section-button" onClick={signUp}> SIGN UP </button>
                    </div>

                    <br></br>
                    <br></br>
                    <div className="section">
                        <p className="textt">&mdash; Already Have an Account? &mdash;</p>
                    </div>
                    <div class="section">
                        <button className="bottom-buttons" onClick={toSignIn}>SIGN IN</button>
                        <button className="bottom-buttons" onClick={toMain}>MAIN PAGE</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    );
}

export default Signup;