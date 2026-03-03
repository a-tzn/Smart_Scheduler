import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProtectedRoute from './components/Protection';
import Login_Page from './components/LOGIN_PAGE';
import Signup_Page from './components/SIGNUP_PAGE';
import Dashboard_Page from './components/HOME_PAGE';
import Dashboard from './components/Main_Output/Dashboard';
import Calendar from './components/Main_Output/Calendar';
import Tasks from './components/Main_Output/Tasks';

function App() {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login_Page/>}/>
            <Route path="/Signin" element={<Signup_Page/>}/>
            <Route path="/Home" element={
                                  <ProtectedRoute>
                                      <Dashboard_Page />
                                  </ProtectedRoute>
                                }>
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Calendar" element={<Calendar />} />
              <Route path="Tasks" element={<Tasks />} />
            </Route>
        </Routes>
    </Router>
  )
}

export default App
