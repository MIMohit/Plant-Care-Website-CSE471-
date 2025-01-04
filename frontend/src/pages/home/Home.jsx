import React from 'react';
import Navbar from '../../components/Navbar';
import { data, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';

const Home = () => {
  const navigate = useNavigate();
  
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100vh',
    backgroundImage: 'url("http://localhost:8000/uploads/1735542867921.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const contentStyle = {
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '10px',
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const descriptionStyle = {
    fontSize: '1.2rem',
    lineHeight: '1.6',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>PLANT ME</h1>
        <p style={descriptionStyle}>
          Welcome to Plant ME, your ultimate destination for plant care and sales. 
          Explore a variety of lush, green companions to brighten your home and soul. 
          We make plant care simple and accessible for everyone. 
          Let nature thrive in your space with our curated selection of greenery. 
          Plant joy, plant love—welcome to your green haven.
        </p>
      </div>
    </div>
  );
};

export default Home;
