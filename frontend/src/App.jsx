import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
//import React from 'react';
import Login from './pages/Auth/Login'; 
import SignUp from './pages/Auth/SignUp';
import Home from './pages/home/Home';
import Plant from './pages/Plant';
import Navbar from './components/Navbar';
import axiosInstance from './utils/axiosInstance';
import StartPage from './pages/Auth/GetStart';
import Blog from './pages/Blog';



const App = () => {  
  const [userInfo, setUserInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const isToken = localStorage.getItem("token");

  const handleClearSearch = ()=> {
    setFilterType("");
    setSearchQuery("");
  };
  


  //get user info
  const getUserInfo = async() => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        //console.log("called")
      }
    } catch (error) {
      if (error.response?.status === 401) {
        //clear if unauthorized
        localStorage.clear();
        window.location.href = '/getstart';
      }
    }
  };

  useEffect(() => {
    if (isToken) {
      getUserInfo();
    }
  }, [isToken]);

  return (
    <Router>
      <AppContent 
        userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleClearSearch={handleClearSearch}
        isToken={isToken}
      />
    </Router>
    
  );
};

const AppContent = ({ userInfo, searchQuery, setSearchQuery, handleClearSearch, isToken }) => {
  const location = useLocation(); // Get current route
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      {/* Conditionally render Navbar */}
      {!isAuthPage && isToken && (
        <Navbar
          userInfo={userInfo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleClearSearch={handleClearSearch}
        />
      )}
      {/* Add a key to Routes to force re-render */}
      <Routes key={location.pathname}>
        <Route 
          index
          exact
          element={
          <StartPage/>
          }
        />
        {!isAuthPage && isToken && (
        <Route
            index
            exact
            element={
              <Home
                userInfo={userInfo}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleClearSearch={handleClearSearch}
              />
            }
          />
        )}
        <Route
          path="/dashboard"
          exact
          element={
            <Home
              userInfo={userInfo}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleClearSearch={handleClearSearch}
            />
          }
        />
        <Route
          path="/plant"
          exact
          element={
            <Plant
              userInfo={userInfo}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleClearSearch={handleClearSearch}
            />
          }
        />
        <Route path="/plant" element={<Plant />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
      </Routes>
    </div>
  );
};


//root component to handle redirect
// const Root = () => {
//   //check token's existance
//   const isAuthenticated = !!localStorage.getItem("token");

//   //redirect to dashboard,or login
//   return isAuthenticated ? (
//     <Navigate to="/" />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

export default App