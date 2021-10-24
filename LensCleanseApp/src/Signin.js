import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
import './Signin.css'

function Signin() {
    let history = useHistory();

    const toSignUp = () => {
        history.push('/signup')
    }

    const toMain = () => {
        history.push('/')
    } 

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);
    const [signinpassword, setSigninPassword] = useState('');
    const [signinemail, setSigninEmail] = useState('');

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

    const signIn = (event) => {
        event.preventDefault();
    
        signInWithEmailAndPassword(auth, signinemail, signinpassword)
          .catch((error) => alert(error.message))

        if(user) {
            history.push('/');
        } 
        
        else {
            // not sure if this is a good idea
            setSigninPassword('');
            setSigninEmail('');
        } 
    }

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
                                <h4 className="begin">Log In to </h4>
                                <h3 className="title"> Lens Cleanse </h3>
                            </div>
                        </div>
                        <br></br>
                        <div className="section">
                            <input id="user" type="text" className="section-input" placeholder="Email" value={signinemail} onChange={(e) => setSigninEmail(e.target.value)} ></input>
                        </div>
                        <div className="section">
                            <input id="user" type="password" className="section-input" placeholder="Password" value={signinpassword} onChange={(e) => setSigninPassword(e.target.value)} ></input>
                        </div>
                        <div className="section">
                            <button type="submit" className="section-button" onClick={signIn}> SIGN IN </button>
                        </div>
                        <div className="section">
                            <div className="bottom">
                                <div className="remember">
                                    <input className="remember-check" type="checkbox" id="remember" name="remember" value="remember"/>
                                    <label className="remember-me" for="remember"> Remember Me</label>
                                </div>
                                <div className="forgot">
                                    <a href="#forgot">Forgot Password</a>
                                </div>
                            </div>
	                    </div>
                        <br></br>
                        <br></br>
                        <div className="section">
                            <p class="text">&mdash; Don't Have an Account &mdash;</p>
                        </div>
                        <div class="section">
                            <button className="bottom-buttons" onClick={toSignUp}>SIGN UP</button>
                            <button className="bottom-buttons" onClick={toMain}>MAIN PAGE</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Signin;