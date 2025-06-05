import React from 'react';
import { Icon } from "@iconify/react";
import {Image , Button} from "@heroui/react";
const BannerContentDetails = () => {
    return(
        <div className=''>
          <h1 className='text-[24px] font-semibold text-black'>The Royal Riviera Hotel</h1>  
           <div className='flex gap-1'>
                <Icon icon="material-symbols-light:star" width="24" height="24" />
                <Icon icon="material-symbols-light:star" width="24" height="24" />
                <Icon icon="material-symbols-light:star" width="24" height="24" />
                <Icon icon="material-symbols-light:star" width="24" height="24" />
                <Icon icon="material-symbols-light:star" width="24" height="24" />
                </div>
          <p className='text-[14px] text-black mt-2'>Al Safilia Street, Old Salata Corniche, Doha, Qatar - 29444</p>
          <div className='w-full mt-2'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14011.555266475312!2d77.3668853!3d28.6031121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1749118719524!5m2!1sen!2sin" className='w-full h-[150px] border-2 border-solid border-[#dddddd]'  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className='flex justify-between my-5'>
            <h5 className='text-[24px] text-black font-semibold'><span>INR</span> 3,915.3</h5>
            <Button className='bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16]'>Select Room</Button>
          </div>

          <p className='bg-[#e1f5fe] text-[#03a9f4] px-2 py-3 text-[14px]'>Hurry! Last few rooms remaining for your dates</p>
           
        </div>
    )
}
export default BannerContentDetails;