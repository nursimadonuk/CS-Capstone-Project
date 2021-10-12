import React, { useState, useEffect } from 'react';
import { Button, Input } from '@material-ui/core';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'
import { useHistory } from 'react-router-dom';
import './Navbar.css'

function Login() {
    let history = useHistory();

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

    const signIn = (event) => {
        event.preventDefault();
    
        signInWithEmailAndPassword(auth, email, password)
          .catch((error) => alert(error.message))

        history.push('/')

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

    return (
        <div className='login_page'>
            <div className="app_header">
                <div className="drawer_and_logo">
                    <img
                    className="app_header_image"
                    src="LensCleanse.png"
                    alt="Lens Cleanse"
                    width='120'
                    height='80'
                    />
                    <h1 className="app_header_h1">Lens Cleanse</h1>     
                </div>
            </div>

            <div>
                <form className="app_signup">

                <Input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit" onClick={signUp}>Sign Up</Button>
                </form>
            </div>

            <div>
                <form className="app_signup">

                <Input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit" onClick={signIn}>Sign In</Button>
                </form>
            </div>
        </div>
        
    )
}

export default Login