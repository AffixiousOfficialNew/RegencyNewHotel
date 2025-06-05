import React from 'react';
const HotelDetailsResult=()=>{
    return(
        <>
         <div className='bg-white border-t-1 border-b-1 border-solid border-[#dddddd] p-5'>
            <div className='container mx-auto px-2 xl:px-0'>
                <ul className='flex gap-5'>
                    <li className='font-bold text-[16px] cursor-pointer'>Room</li>
                    <li className='font-bold text-[16px] cursor-pointer'>Amenities</li>
                    <li className='font-bold text-[16px] cursor-pointer'>About this property</li>
                    <li className='font-bold text-[16px] cursor-pointer'>Policies</li>
                </ul>
            </div>
         </div>
        </>
    )
}

export default HotelDetailsResult;