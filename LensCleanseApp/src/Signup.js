import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
import './Signup.css'

function Signup() {
    let history = useHistory();

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
        <div>
            <Navbar></Navbar>
            <div className="login-wrap">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" checked/><label for="tab-1" class="tab">Sign In</label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up"/><label for="tab-2" class="tab">Sign Up</label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                            <div className="group">
                                <label for="user" className="label">Email</label>
                                <input id="user" type="text" className="input" value={signinemail} onChange={(e) => setSigninEmail(e.target.value)} ></input>
                            </div>
                            <div className="group">
                                <label for="pass" className="label">Password</label>
                                <input id="pass" type="password" className="input" data-type="password" value={signinpassword} onChange={(e) => setSigninPassword(e.target.value)}></input>
                            </div>
                            <div className="group">
                                <input id="check" type="checkbox" className="check" checked></input>
                                <label for="check"><span className="icon"></span> Keep me Signed in</label>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign In" onClick={signIn}></input>
                            </div>
                            <div className="hr"></div>
                            <div className="foot-lnk">
                                <a href="#forgot">Forgot Password?</a>
                            </div>
                        </div>
                        <div className="sign-up-htm">
                            <div className="group">
                                <label for="user" className="label">Username</label>
                                <input id="user" type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                            </div>
                            <div className="group">
                                <label for="pass" className="label">Password</label>
                                <input id="pass" type="password" className="input" data-type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                            {/*
                            <div className="group">
                                <label for="pass" className="label">Repeat Password</label>
                                <input id="pass" type="password" className="input" data-type="password"></input>
                            </div>
                            */}
                            <div className="group">
                                <label for="pass" className="label">Email Address</label>
                                <input id="pass" type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign Up" onClick={signUp}></input>
                            </div>
                            <div className="hr"></div>
                            <div className="foot-lnk">
                                <label for="tab-1">Already Member?</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;