import React, { useState } from 'react'

import LOGO from "../assets/images/logo.svg"
import ProfileInfo from './Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from './input/SearchBar';

const Navbar = ({ userInfo, searchQuery, setSearchQuery, onSearchPlant,handleClearSearch }) => {

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

    // const handleClearSearch = () => {
    //   setSearchQuery(""); 
    //   setFilterType(""); 
    //   getAllPlants(); 
    // };
    

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
        <img src={LOGO} alt="plant me" className='h-9' />

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
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />{" "}
          </>
        )}
    </div>
  );
};

export default Navbar;