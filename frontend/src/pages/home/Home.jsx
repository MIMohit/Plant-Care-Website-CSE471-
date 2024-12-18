import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import PlantCard from '../../components/Cards/PlantCard';


const Home = () => { 
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [allPlants, setAllPlants] = useState([]);

  //get user info
  const getUserInfo = async() => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        //clear if unauthorized
        localStorage.clear();
        navigate("/login"); //redirect to login
      }
    }
  };

  //get all plants
  const getAllPlants = async () => {
    try {
      const response = await axiosInstance.get("/get-plant");
      if (response.data && response.data.plant) {
        setAllPlants(response.data.plant);
      }

    } catch(error){
      console.log("An unexpected error occoured. Please try again.");
    }
  };


  //handle plant description
  const handleViewDescription = (data) => {}

  // handle update favourite
  const updateIsFavourite = async (plantData) => {
    const descriptionId = descriptionData._id
    try {
      const response = await axiosInstance.put(
        "/update-is-favourite/" + descriptionId,
        {
          isFavourite: !descriptionData.isFavourite,
        }
      );

      if (response.data && response.data.description) {
        getAllPlants();
      }

    }catch(error){
      console.log("An unexpected error occoured. Please try again.");
    }
  }

  useEffect(() => {
    getAllPlants();
    getUserInfo();

    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className='container mx-auto py-10'>
        <div className='flex gap-7'>
          <div className='flex-l'>
            {allPlants.length > 0 ? (
              <div className='grid grid-cols-2 gap-4'>
                {allPlants.map((item) => {
                  return (
                    <PlantCard
                      key = {item._id}
                      imgUrl = {item.imageUrl}
                      title = {item.title}
                      description = {item.description}
                      isFavourite = {item.isFavourite}
                      price = {item.price}
                      onClick = {() => handleViewDescription(item)}
                      onFavouriteClick = {() => updateIsFavourite(item)}
                    />
                  );
                })}
              </div>
            ) : (
              <>Empty Card </>
            )}
          </div>
          
          <div className='w-[320px]'></div>
        </div>
      </div>

    </>
  );
};

export default Home