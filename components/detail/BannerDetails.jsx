import React from 'react';
import {Image} from "@heroui/react";
const BannerDetails = () => {
    return(
        <>
        <div className='w-full relative flex gap-2'>
            <Image src="https://c.myholidays.com/giata/MH-00151158/l/0.jpeg" alt="banner"  className='h-[550px] object-cover rounded-[5px]' />
            <div className='grid grid-cols-1 gap-2'>
                 <Image src="https://c.myholidays.com/giata/MH-00151158/l/1.jpeg" alt="banner"  className='rounded-[5px] w-full h-[120px] object-cover' />
                  <Image src="https://c.myholidays.com/giata/MH-00151158/l/2.jpeg" alt="banner"  className='rounded-[5px] w-full h-[120px] object-cover' />
                   <Image src="https://c.myholidays.com/giata/MH-00151158/l/3.jpeg" alt="banner"  className='rounded-[5px] w-full h-[120px] object-cover' />
                    <Image src="https://c.myholidays.com/giata/MH-00151158/l/0.jpeg" alt="banner"  className='rounded-[5px] w-full h-[120px] object-cover' />
                 
            </div>
        </div>
        </>
    )
}
export default BannerDetails;