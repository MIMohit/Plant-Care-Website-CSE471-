import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import PlantCard from "../components/Cards/PlantCard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
//import {query} from "mongoose";

const Plant = () => {
  
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allPlants, setAllPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

  // Get all plants
  const getAllPlants = async () => {
    try {
      const response = await axiosInstance.get("/get-plant");
      if (response.data && response.data.plant) {
        setAllPlants(response.data.plant);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  //handle plant description
  const handleViewDescription = (data) => {}

  //Update favorite
  const updateIsFavourite = async (plantData) => {
    const plantId = plantData._id;
    try {
      const response = await axiosInstance.put(`/update-is-favourite/${plantId}`, {
        isFavourite: !plantData.isFavourite,
      });

      if (response.data && response.data.plant) {
        toast.success("Updated Successfully");
        getAllPlants();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  //search plant
  const onSearchPlant = async (query) => {
    try {
      console.log("Making search request with query:", query);
      const response = await axiosInstance.get("/search", {
        params: { query },
      });

      console.log("Response from search API:", response.data);

      if (response.data && response.data.Plants) {
        setFilterType("search");
        setAllPlants(response.data.Plants);
      } else {
        console.log("No plants found in response.");
        toast.warn("No plants found.");
      }  
    } catch (error) {
      console.log("An unexpected error occured. Please try again.");
      toast.error("An error occurred while searching. Please try again.");
    }

  };

  const handleClearSearch = () => {
    setFilterType("");
    setSearchQuery("");
    getAllPlants();
  };

  useEffect(() => {
    getAllPlants();
  }, []);

  return (
    <>
      {/* <Navbar
        userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchPlant={onSearchPlant}
        handleClearSearch={handleClearSearch}
      /> */}

      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-l">
            {allPlants.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allPlants.map((item) => {
                  return (
                    <PlantCard
                      key={item._id}
                      imgUrl={item.imageUrl}
                      title={item.title}
                      description={item.description}
                      isFavourite={item.isFavourite}
                      price={item.price}
                      onClick = {() => handleViewDescription(item)}
                      onFavouriteClick={() => updateIsFavourite(item)}
                    />
                  );
                })}
              </div>
            ) : (
              <>Empty Card</>
            )}
          </div>

          <div className="w-[320px]"></div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Plant;
