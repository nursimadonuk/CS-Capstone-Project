import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
import './Signup.css'

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