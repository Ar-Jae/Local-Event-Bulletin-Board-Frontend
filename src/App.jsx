import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react'
import './App.css'
import Auth from './auth-admin/Auth'
import AdminAuth from './auth-admin/AdminAuth';
import Events from './eventControl/ScheduledEvents'
import Navigation from './components/NavBar'
import Footer from './components/Footer'
import BackDrop from './components/BackDrop'


function App() {
  
  const [sessionToken, setSessionToken] = useState(undefined)
  console.log("Value of our session token", sessionToken)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  }, [])

  const updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken)
  }

  const MainView = () => {
    if (!sessionToken) {
      return (
        <Router>
          <Routes>
            
            <Route path="/" element={<Auth updateLocalStorage={updateLocalStorage} />} />
            <Route path="/admin" element={<AdminAuth updateLocalStorage={updateLocalStorage} />} />
            <Route path="/events" element={<Events sessionToken={sessionToken} />} />
          </Routes>
        </Router>
      );
    } else {
      return <Events sessionToken={sessionToken} />;
    }
  };
  // MainView function determines what to render based on sessionToken
  // If sessionToken is undefined, it renders the Auth component
  // If sessionToken is defined, it renders the Events component
  // The Auth component is responsible for handling user authentication
  // The AdminAuth component is responsible for handling admin authentication
  // The Events component displays scheduled events for the user

  
  
  return (
    <>
    <Navigation />
    <BackDrop />
    {MainView()}
    <Footer />
    </>
  )
}

export default App

// MainView function determines what to render based on sessionToken
  // If sessionToken is undefined, it renders the Auth component
  // If sessionToken is defined, it renders the Events component
  // The Auth component is responsible for handling user authentication
  // The AdminAuth component is responsible for handling admin authentication
  // The Events component displays scheduled events for the user
  // The updateLocalStorage function updates the session token in local storage and state
  // The sessionToken state is initialized to undefined and updated based on local storage
  // The useEffect hook is used to check for the session token in local storage when the component mounts
  // The Navigation component provides navigation links for the application
  // The LogOut component handles user logout functionality
  // The Footer component displays the footer of the application
