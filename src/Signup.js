import React, { useState } from 'react'
import logo from './assets/chat-phone.png'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import app from './firebase'
import Cookies from 'universal-cookie';


function Signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const cookies = new Cookies();

    function handleSignup(event) {
        event.preventDefault()
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                let userData = userCredential.user;
                alert("You are Register SuccessFully")

                updateProfile(auth.currentUser, {
                    displayName: user.name,
                }).then(() => {
                    cookies.set("authToken", userData)
                }).catch((error) => {
                    console.log(error)
                });
                navigate('/chat')
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }
    return (
        <div className='login-cont'>

            <section className='logo-animation'>
                <img src={logo} alt="logo" />
            </section>

            <section >
                <h1>Sign up</h1>
                <div className="login-modal">
                    <form className='detail-form'>

                        <label htmlFor="name" > Full Name</label>
                        <input type="text" name="username" onChange={(e) => setUser({ ...user, name: e.target.value })} required={true} spellCheck='false' />
                        <label htmlFor="Email" >Email</label>
                        <input type="email" name="useremail" onChange={(e) => setUser({ ...user, email: e.target.value })} required={true} spellCheck='false' />
                        <label htmlFor="password">Create Password</label>
                        <input type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} required={true} spellCheck='false' />
                        <Button variant="primary" size="lg" style={{ width: '500px', marginTop: '20px' }} type='submit' onClick={(e) => handleSignup(e)}>Register</Button>
                    </form>

                    <div className="google-login">
                        <p>If Already Register ? <Link to='/' style={{ textDecoration: 'none', fontWeight: 'bold' }}>Login</Link> Now </p>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Signup