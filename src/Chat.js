import React, { useEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userAvtar from './assets/user.png'
import send from './assets/send.svg'
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, onChildAdded, push, ref, set } from "firebase/database";
import app from './firebase';
import moment from 'moment/moment';

function Chat() {
  const [userName, setUserName] = useState("")
  const [chats, setChats] = useState([])
  const navigate = useNavigate()
  const inputRef = useRef()
  const chatContainerRef = useRef();


  const db = getDatabase();
  const chatListRef = ref(db, 'chats')
  
  useEffect(() => {     
    const auth = getAuth(app);
    const user = auth.currentUser;
    setUserName(user)
   const chatAppend =  onChildAdded(chatListRef, (data) => {
    setChats(chats => [...chats, data.val()]);
     })

   return () => {
    chatAppend();
  }
  }, [])

  
  function handleSignout() {
    const auth = getAuth(app);
    signOut(auth).then(() => {
      navigate('/')
    }).catch((error) => {
      console.log(error)
    })
  }

  const renderChat = () => {
    const newChatRef = push(chatListRef)
    if(inputRef.current.value !== ""){
      set(newChatRef, {
      name: userName?.displayName,
      msg: inputRef.current.value,
      time:moment().format('LT'),
      date: new Date().toDateString().slice(4)
    })
    }
    inputRef.current.value = ""
  }
    return (
    <div className='chat-page'>
      <Navbar bg="light" variant="light" className='header'>
        <Container>
          <Navbar.Brand href="#home" >
            <img
              alt=""
              src="https://www.macworld.com/wp-content/uploads/2023/01/messages-app-icon-1.png"
              height="50"
              className="d-inline-block align-top"
            />{' '}
            <span style={{ fontSize: '2rem' }}>Chattenger</span>
          </Navbar.Brand>
          <div className="user">
            <img src={userName?.photoURL ?? userAvtar} alt="img" height={40} style={{ borderRadius: '50%' }} />
            <span style={{ fontSize: "1.5rem" }}>{userName?.displayName}</span>
            <Button onClick={handleSignout}> Signout</Button>
          </div>
        </Container>
      </Navbar>

      {
        userName.displayName ? <div className="chat-container" id='chat-container' ref={chatContainerRef}>

          {
            chats.map((chat, index) => {
              return (
                <div className={`chat-cont ${chat.name === userName?.displayName ? 'me' : ''}`} key={index}>
                  <div className="single-chat">
                    <table>
                      <tr>
                      <td rowSpan={3}><img src={chat.name === userName?.displayName ? userName?.photoURL || userAvtar : userAvtar} alt="img" height={40} style={{ borderRadius: '50%', textAlign:"center" }} />&nbsp;&nbsp;&nbsp;</td>
                     <td style={{fontSize:'1rem', color:"", fontWeight:"500"}}>{chat.name} </td>
                      </tr>
                      <tr>
                      {/* <td></td> */}
                        <td style={{fontSize:'0.8rem',}}>{chat.msg.toUpperCase()}</td>
                      </tr>
                      <tr>
                        {/* <td></td> */}
                        <td  style={{fontSize:'0.7rem', color:"gray"}}>{chat.date} &nbsp; &nbsp; {chat.time}</td>
                      </tr>
                    </table>
                  </div>
                </div>

              )
            })
          }

        </div> : null
      }

      <div className="input-chat-cont">
        <input type="text" placeholder='Enter your chat...' ref={inputRef} spellCheck='false' />
       
          <img src={send} alt="" onClick={e => renderChat()}/>
       
      </div>

    </div>
  )
}

export default Chat