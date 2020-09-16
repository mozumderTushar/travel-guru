import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { Card, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

firebase.initializeApp(firebaseConfig);
const Login = () => {
    
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn:false,
        name:'',
        email:'',
        password:'',
        photo:''
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    let history = useHistory();
    let location = useLocation();
  
    let { from } = location.state || { from: { pathname: "/" } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () =>{
        firebase.auth().signInWithPopup(googleProvider)
        .then (res =>{
            const {displayName, photoURL, email} = res.user
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(signedInUser)
            console.log(displayName, email, photoURL)
        })
        .catch(err =>{
            console.log(err);
            console.log(err.message)
        })
    }

    const handleGoogleSignOut = () => {
        firebase.auth().signOut()
        .then( res => {
            const signedOutUser = {
                isSignedIn:false,
                name:'',
                photo:'',
                email:'',
                error:'',
                success:false
            }
            setUser(signedOutUser)
        })
        .catch(err => {
            
        })
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid =  /\S+@\S+\.\S+/.test(e.target.value)
        }
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length >= 6;
            //12345678@aA
            const passwordHasNumber = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber
        }
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }
    const handleSubmit = (e) => {
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user}
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo)
                updateProfile(user.name)
            })
            .catch(error => {
                // Handle Errors here.
                const newUserInfo = {...user}
                newUserInfo.error = error.message;
                newUserInfo.success = false
                setUser(newUserInfo)
                // ...
              });
        }
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user}
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo)
                setLoggedInUser(newUserInfo)
                history.replace(from);
                console.log('sign in user', res.user);
            })
            .catch(error => {
                // Handle Errors here.
                const newUserInfo = {...user}
                newUserInfo.error = error.message;
                newUserInfo.success = false
                setUser(newUserInfo)
                // ...
              });
        }
        e.preventDefault();
    }

    const updateProfile = name => {
        const user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName: name
        }).then(function() {
         console.log("user name updated successfully");
        }).catch(function(error) {
          console.log(error);
        });
      }
    return (
        <div style={{textAlign:'center'}}>
            
            {
                user.isSignedIn ? <button onClick={handleGoogleSignOut}>Sign out</button> :
                <button onClick={handleGoogleSignIn}>Sign in</button>
            }
            {
                user.isSignedIn && <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your email: {user.email}</p>
                    <img src={user.photo} alt=""/>
                </div>
            }


<h1>Authentication</h1>
<Card style={{ width: '18rem', margin:'0 auto' }}>
  <Card.Body>
  <Form onSubmit={handleSubmit}>
  {newUser && <Form.Group controlId="formBasicText">
    <Form.Label>Name address</Form.Label>
    <Form.Control onBlur={handleBlur} type="text" name="name" placeholder="Enter name" />
  </Form.Group>}
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control onBlur={handleBlur} type="text" name="email" placeholder="Enter email" required/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control  onBlur={handleBlur} type="password" name="password" placeholder="Password" required/>
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Remember Me" />
  </Form.Group>
  <input type="submit"  value={newUser ? 'Sign Up' : 'Sign In'}/>
  <p>don't have account?<span style={{color:'green'}} onClick={() => setNewUser(!newUser)}>Create a account</span></p>
</Form>
  </Card.Body>
</Card>
        <p style={{color:'red'}}>{user.error}</p>
        {user.success &&   <p style={{color:'green'}}>user {newUser ? 'created' : 'Logged In'} successfully</p>}
        </div>
    );
};

export default Login;