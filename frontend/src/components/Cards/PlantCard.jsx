import React from 'react';
import { FaHeart } from 'react-icons/fa6';

const PlantCard = ({
    imgUrl,
    title,
    price,
    description,
    isFavourite,
    onFavouriteClick,
    onClick, 
}) => {
    return (
    <div 
        className='border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer'
        onClick={onClick}
    >
        <img
            src= {imgUrl}  
            alt= {title}
            className='w-full h-56 object-cover rounded-lg'
            onClick={onClick}
        />

        <button
            className='w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border-white/30 absolute top-4 right-4'
            onClick={onFavouriteClick}
        >
            <FaHeart
                className={`icon-btn ${isFavourite ? "text-red-500" : "text-white"}`}
            />
        </button>

        <div className='p-4' onClick={onClick}>
            <div className='flex items-center gap-3'>
                <div className='flex-1'>
                    <h6 className='text-sm font-medium'>{title}</h6>
                    <span className='text-xs text-slate-500'>
                        ${price}
                        
                    </span>
                </div>
            </div>


        </div>
        
    </div>
  )
}

export default PlantCard