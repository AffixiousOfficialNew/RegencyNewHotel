import React, { useState } from 'react';
import {Image , Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button , useDisclosure } from "@heroui/react";
import { useSelector } from 'react-redux';
import { Icon } from "@iconify/react";
const BannerDetails = () => {
    const {details} = useSelector((state)=>state);
    const Images = details?.detailResult[0]?.RoomImages?.Images || [];
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
   
        
      
        return (
          <div className='w-full relative flex  gap-0 md:gap-2 '>
            <Image
              src={Images[1]?.URL}
              alt="banner"
              className='md:h-[550px] w-full object-cover rounded-[5px] z-[8]'
              classNames={{wrapper: '!max-w-full'}}
            />
      
            <div className='grid grid-cols-1 gap-2'>
            {(Images.slice(2, 6)).map((image, index) => (
                <div key={index}>
                  <Image
                    src={image?.URL}
                    alt={`image-${index}`}
                    className='rounded-[5px] w-[200px] h-[132px] object-cover z-[8] hidden md:block '
                  />
                </div>
              ))}
      
             
            </div>

             {Images.length > 5 && (
                <div
                  className='bg-black  text-white  cursor-pointer text-center absolute bottom-[10px] z-[9] right-[10px] rounded-[10px] p-2 flex gap-1 items-center'
                  onClick={onOpen}
                >
                 <Icon icon="mdi-light:image" width="24" height="24" />  {Images.length}+
                </div>
              )}

           


<Drawer className=''   isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className='w-full max-w-full'>
         
            <>
             
              <DrawerBody>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {Images.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image?.URL}
                    alt={`full-image-${index}`}
                    className="rounded-[5px] min-w-[100%] md:min-w-[365px] h-[150px] md:h-[250px] object-cover"
                  />
                </div>
              ))}
            </div>
              </DrawerBody>
             
            </>
         
        </DrawerContent>
      </Drawer>


          </div>

    )
}
export default BannerDetails;