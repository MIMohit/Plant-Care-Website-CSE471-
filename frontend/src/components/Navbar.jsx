import React, { useState } from 'react'
import { Link } from "react-router-dom";
import ProfileInfo from './Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from './input/SearchBar';
import { toast } from 'react-toastify';

const Navbar = ({ userInfo, searchQuery, setSearchQuery, onSearchPlant, handleClearSearch }) => {

    const isToken = localStorage.getItem("token");
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleSearch = () => {
      if (searchQuery.trim()) {
        onSearchPlant(searchQuery);
      } else {
        toast.warn("Please enter a search term.");
      }
    };

    const onClearSearch = () => {
      setSearchQuery("");
      handleClearSearch();
    };
    
  return (
    <div className='flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
        {/* Page Title */}
        <h1
            className="text-2xl font-serif font-bold text-green-700 cursor-pointer"
            onClick={() => navigate('/dashboard')} // Redirect to homepage when clicked
        >
            Plant ME
        </h1>

        {isToken && (
          <>
            <SearchBar
              value = {searchQuery}
              onChange = {({ target }) => {
                setSearchQuery(target.value);
              }}
              handleSearch = {handleSearch}
              onClearSearch = {onClearSearch}
            />

            {/* Home Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mx-2"
              onClick={() => {
                navigate('/dashboard')
              }} // Navigate to the homepage
            >
              Home
            </button>

            {/* Plant button */}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={() => navigate('/plant')} // Navigate to the Plant page
            >
              Plant
            </button>

            {/* Blog Button */}
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 mx-2"
              onClick={() => navigate("/blog")} // Navigate to the Blog page
            >
              Blog
            </button>

            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />{" "}
          </>
        )}
    </div>
  );
};

export default Navbar;