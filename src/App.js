import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoggedInUser from './LoggedInUser'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Chat from './Chat';

function App() {

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path="/" element={<LoggedInUser />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
