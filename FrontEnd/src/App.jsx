import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login_Page from './components/LOGIN_PAGE';
import Signup_Page from './components/SIGNUP_PAGE';
import Home_Page from './components/HOME_PAGE';

function App() {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login_Page/>}/>
            <Route path="/signin" element={<Signup_Page/>}/>
            <Route path="/home" element={<Home_Page/>}/>
        </Routes>
    </Router>
  )
}

export default App
