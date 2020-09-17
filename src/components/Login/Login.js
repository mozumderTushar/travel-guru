import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { Card, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import './Login.css'

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

    const handleFbSignIn = () => {
        //fb sing in
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
        <div>
            
        
<Card style={{ width: '25rem', margin:'0 auto',marginTop:'100px' }}>
  <Card.Body>
      {newUser ? <h3>Create an account</h3> : <h3>Login</h3>}
  <Form onSubmit={handleSubmit}>
  {newUser && <Form.Group controlId="formBasicText">
    <Form.Control onBlur={handleBlur} type="text" name="name" placeholder="First Name" />
  </Form.Group>}
  {newUser && <Form.Group controlId="formBasicText">
    <Form.Control onBlur={handleBlur} type="text" name="name" placeholder="Last Name" />
  </Form.Group>}


  <Form.Group controlId="formBasicEmail">
    <Form.Control onBlur={handleBlur} type="text" name="email" placeholder="Enter email" required/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Control  onBlur={handleBlur} type="password" name="password" placeholder="Password" required/>
  </Form.Group>

  {newUser && <Form.Group controlId="formBasicText">
    <Form.Control onBlur={handleBlur} type="password" name="name" placeholder="Confirm Password" />
  </Form.Group>}
  {!newUser && <Form.Group controlId="formBasicCheckbox" className="d-flex ">
    <Form.Check type="checkbox" label="Remember Me" /> <p className="forgetPassword">Forget Password</p>
    
  </Form.Group>}
  <input className="BtnDesign" type="submit"  value={newUser ? 'Create an account' : 'Login'}/>
  {newUser ? <p>Already have an account?<span className="commonColor"  onClick={() => setNewUser(!newUser)}>Login</span></p> :
  <p>Don't have account?<span className="commonColor" onClick={() => setNewUser(!newUser)}>Create a account</span></p>}
</Form>
  </Card.Body>
</Card>

{/* fb */}
<button  className="facebook-button" onClick={handleFbSignIn}>Continue with Facebook</button>

{/* google */}
{
                user.isSignedIn ? <button onClick={handleGoogleSignOut}>Sign out</button> :
                <button  className="google-button" onClick={handleGoogleSignIn}>Continue with Google</button>
            }
            {
                user.isSignedIn && <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your email: {user.email}</p>
                    <img src={user.photo} alt=""/>
                </div>
            }




        <p style={{color:'red'}}>{user.error}</p>
        {user.success &&   <p style={{color:'green'}}>user {newUser ? 'created' : 'Logged In'} successfully</p>}
        </div>
    );
};

export default Login;