import React from 'react';
import { Icon } from "@iconify/react";
import {Image , Button} from "@heroui/react";
import { useSelector } from 'react-redux';
const BannerContentDetails = () => {
  const {details} = useSelector((state)=>state);
 
  const res = details?.roomResult[0]?.ListOfRooms[0]?.ListOfRoom[0]?.RoomRates[0]
  const info = details?.detailResult[0]?.Info;
    return(
        <div className=''>
          <h1 className='text-[24px] font-semibold text-black'>{info?.HotelName}</h1>  
           <div className='flex gap-1'>
           {[...Array(5)].map((_, index) => (
              <Icon
                key={`${info?.MYHHotelCode}-star-${index}`}
                className={`text-[#feba02] ${index < info?.StarRating ? '' : 'opacity-20'}`}
                icon="material-symbols-light:star-rounded"
                width="30"
                height="30"
              />
            ))}
                </div>
          <p className='text-[14px] text-black mt-2'>{info?.HotelAddress}</p>
          <h5><strong>{info?.AmenityType}</strong></h5>

          <div className='w-full mt-2'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14011.555266475312!2d77.3668853!3d28.6031121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1749118719524!5m2!1sen!2sin" className='w-full h-[150px] border-2 border-solid border-[#dddddd]'  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className='flex justify-between my-5'>
            <h5 className='text-[24px] text-black font-semibold'><span>{res?.Currency}</span> {res?.TotalRoomPrice}</h5>
            <Button className='bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16]'>Select Room</Button>
          </div>

          <p className='bg-[#e1f5fe] text-[#03a9f4] px-2 py-3 text-[14px]'>Hurry! Last few rooms remaining for your dates</p>
           
        </div>
    )
}
export default BannerContentDetails;