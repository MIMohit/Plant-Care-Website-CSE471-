import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import PlantCard from "../components/Cards/PlantCard";
import PlantModal from "../components/Cards/PlantModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
//import {query} from "mongoose";

const Plant = ({ searchTerm }) => {
  
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allPlants, setAllPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");


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

  // Handle modal open
  const handleViewDescription = (plant) => {
    setSelectedPlant(plant);
  };

  // Handle modal close
  const closeModal = () => {
    setSelectedPlant(null);
  };


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
      //console.log("Making search request with query:", query);
      const response = await axiosInstance.get("/search", {
        params: { query },
      });

      //console.log("Response from search API:", response.data);

      if (response.data && response.data.Plants) {
        setFilterType("search");
        setAllPlants(response.data.Plants);
      } else {
        //console.log("No plants found in response.");
        toast.warn("No plants found.");
      }  
    } catch (error) {
      console.log("An unexpected error occured. Please try again.");
      toast.error("An error occurred while searching. Please try again.");
    }

  };

  //price filtering
  const filterPlantsByPrice = async () => {
    if (!startPrice || !endPrice) {
      toast.warn("Please enter both start and end prices.");
      return;
    }
  
    try {
      const response = await axiosInstance.get("/plant-filter", {
        params: {
          startPrice: parseFloat(startPrice),
          endPrice: parseFloat(endPrice),
        },
      });
  
      if (response.data && response.data.plants) {
        setFilterType("price");
        setAllPlants(response.data.plants);
        toast.success("Plants filtered successfully!");
      } else {
        toast.warn("No plants found within the selected price range.");
      }
    } catch (error) {
      console.error("An error occurred while filtering plants:", error);
      toast.error("An error occurred. Please try again.");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the search request
        const response = await axiosInstance.get("/search", {
          params: { searchTerm },
        });
  
        if (response.data && response.data.Plants) {
          // Example: Process the data or update state
          console.log("Search results:", response.data.Plants);
          setFilterType("search");
          setAllPlants(response.data.Plants);
        } else {
          console.log("No plants found in response.");
          toast.warn("No plants found.");
        }
      } catch (error) {
        console.error("Error making search request:", error);
        toast.error("An error occurred while searching for plants.");
      }
    };
  
    if (searchTerm) {
      fetchData(); // Call the async function
    }
  }, [searchTerm]);

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
          {/* Plant Cards Section */}
          <div className="flex-1">
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
                      onClick={() => handleViewDescription(item)}
                      onFavouriteClick={() => updateIsFavourite(item)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No plants available at the moment.
              </div>
            )}
          </div>
  
          {/* Filter Box */}
          <div className="w-[320px] bg-gray-100 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Filter by Price</h3>
  
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Start Price</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter start price"
                value={startPrice}
                onChange={(e) => setStartPrice(e.target.value)}
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">End Price</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter end price"
                value={endPrice}
                onChange={(e) => setEndPrice(e.target.value)}
              />
            </div>
  
            <button
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
              onClick={filterPlantsByPrice}
            >
              Apply Filter
            </button>
  
            <button
              className="w-full mt-3 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
              onClick={handleClearSearch}
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>
  
      {/* Render the PlantModal */}
      {selectedPlant && <PlantModal plant={selectedPlant} onClose={closeModal} />}
  
      <ToastContainer />
    </>
  );
  
};

export default Plant;
