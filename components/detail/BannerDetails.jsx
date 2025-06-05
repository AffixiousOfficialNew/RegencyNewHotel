import React, { useState } from 'react';
import {Image} from "@heroui/react";
import { useSelector } from 'react-redux';

const BannerDetails = () => {
    const {details} = useSelector((state)=>state);
    const Images = details?.detailResult[0]?.RoomImages?.Images || [];
    // console.log({details,Images});

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
   
        
      
        return (
          <div className='w-full relative flex gap-2'>
            <Image
              src={Images[0]?.URL}
              alt="banner"
              className='h-[550px] object-cover rounded-[5px]'
            />
      
            <div className='grid grid-cols-1 gap-2'>
            {(Images.slice(1, 5)).map((image, index) => (
                <div key={index}>
                  <Image
                    src={image?.URL}
                    alt={`image-${index}`}
                    className='rounded-[5px] w-full h-[120px] object-cover'
                  />
                </div>
              ))}
      
              {Images.length > 5 && (
                <div
                  className='cursor-pointer text-center text-blue-500 mt-2'
                  onClick={openModal}
                >
                  {Images.length}+
                </div>
              )}
            </div>

            {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-4xl">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="grid grid-cols-3 gap-2">
              {Images.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image?.URL}
                    alt={`full-image-${index}`}
                    className="rounded-[5px] w-full h-[200px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
          </div>
    // return(
    //     <>
    //     <div className='w-full relative flex gap-2'>
    //         <Image src="https://c.myholidays.com/giata/MH-00151158/l/0.jpeg" alt="banner"  className='h-[550px] object-cover rounded-[5px]' />
    //         <div className='grid grid-cols-1 gap-2'>
    //              <Image src="https://c.myholidays.com/giata/MH-00151158/l/1.jpeg" alt="banner"  className='rounded-[5px] w-full h-[120px] object-cover' />
    //               <Image src="https://c.myholidays.com/giata/MH-00151158/l/2.jpeg" alt="banner"  className='rounded-[5px] w-full h-[120px] object-cover' />
    //                <Image src="https://c.myholidays.com/giata/MH-00151158/l/3.jpeg" alt="banner"  className='rounded-[5px] w-full h-[120px] object-cover' />
    //                 <Image src="https://c.myholidays.com/giata/MH-00151158/l/0.jpeg" alt="banner"  className='rounded-[5px] w-full h-[120px] object-cover' />
    //              {Images.length}+
    //         </div>
    //     </div>
    //     </>
    )
}
export default BannerDetails;