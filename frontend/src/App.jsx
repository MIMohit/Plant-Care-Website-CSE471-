import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react'

import Login from './pages/Auth/Login'; 
import SignUp from './pages/Auth/SignUp';
import Home from './pages/home/Home';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element= {<Root />} />
          <Route path="/dashboard" exact element= {<Home />} />
          <Route path="/login" exact element= {<Login />} />
          <Route path="/signup" exact element= {<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}

//root component to handle redirect
const Root = () => {
  //check token's existance
  const isAuthenticated = !!localStorage.getItem("token");

  //redirect to dashboard,or login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default App