import React, { useState } from 'react'
import logo from './assets/chat-phone.png'
import { Button } from 'react-bootstrap'
import { Link, useNavigate  } from 'react-router-dom'
import './App.css'
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import app from './firebase'
import Cookies from 'universal-cookie';


function LoggedInUser() {
const [userSignin, setUserSignin] = useState({
    email : "",
    password : ""
})
const [user, setUser] = useState(false)
const navigate = useNavigate()
  const cookies = new Cookies();
  
  function handleLogin(event) {
        event.preventDefault()
        const auth = getAuth(app)
        signInWithEmailAndPassword(auth, userSignin.email, userSignin.password)
        .then((res)=>{
            cookies.set("authToken", res)
            setUser(true)
            navigate('/chat')
        })
        .catch((error)=>{
            const errorMessage = error.message;
            console.log(errorMessage);
        })
    }

    function handleLoginWithGoogle(event) {
        event.preventDefault()
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app)
        signInWithPopup(auth, provider)
        .then((result) => {
                console.log(result)
                cookies.set("authToken", result)
                setUser(true)
                navigate('/chat')
            
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            })
        }


    return (
        <div className='login-cont'>

            <section className='logo-animation'>
                <img src={logo} alt="logo" />
            </section>

            <section className='modal-cont' >
                <h1>Chattenger</h1>
                <div className="login-modal">
                    <form className='detail-form'>

                        <label htmlFor="email" >Email</label>
                        <input type="email" name="username" onChange={(e)=>setUserSignin({...userSignin, email:e.target.value})} spellCheck='false' required={true} />
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={(e)=>setUserSignin({...userSignin, password:e.target.value})} required={true} />
                        <Button variant="primary" size="lg" style={{ width: '500px', marginTop: '20px' }} type='submit' onClick={(e) => handleLogin(e)}>Login</Button>
                    </form>

                    <div className="google-login">
                        <p><b>OR</b></p>
                        <Button variant="success" onClick={(e)=>handleLoginWithGoogle(e)}>Login With Google</Button>
                        <p>If Don't Have Account ? <Link to='/signup' style={{ textDecoration: 'none', fontWeight: 'bold' }}>SignUp</Link> Now </p>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default LoggedInUser