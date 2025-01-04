import React from 'react';
import { FaTimes } from "react-icons/fa";

const PlantModal = ({ plant, onClose }) => {
  if (!plant) return null; // Ensure plant data exists before rendering

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] md:w-[600px]">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {/* Plant Image */}
        <img
          src={plant.imageUrl}
          alt={plant.title}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />

        {/* Plant Details */}
        <h3 className="text-lg font-bold">{plant.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{plant.description}</p>
        <p className="text-lg font-semibold">Price: ${plant.price}</p>

        <div className="mt-4 flex justify-end">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantModal;