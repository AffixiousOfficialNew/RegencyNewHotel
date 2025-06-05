"use client"
import React, { useState, useRef, useEffect } from 'react';
import {Slider , Checkbox, Button, dropdown} from "@heroui/react";
import { Icon } from "@iconify/react";
const FilterListing=()=>{
    const [value, setValue] = React.useState([100, 300])
    const [isDropdown, setIsDropdown]= useState('null')
    const dropdownRef = useRef(null);
    const handleFilterDropdown =(dropdownName)=>{
        setIsDropdown(prev => !prev === dropdownName ? null : dropdownName);
    } 

      useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    return(
        <section className='bg-[#f5f5f5] py-[30px]'>
        <div className='container mx-auto px-2 xl:px-0'>
            <div className='grid grid-cols-8 gap-0 relative' ref={dropdownRef}>
           <div className='px-2'>
            <Slider
        className="max-w-md"
        formatOptions={{style: "currency", currency: "INR"}}
        label={<span className='text-[14px] font-semibold text-black'>Price</span>}
        maxValue={1000}
        minValue={0}
        step={10}
        value={value}
        onChange={setValue}
        classNames={{
            filler:"bg-[#174982]",
            thumb:'border-1 border-solid border-[#174982] bg-white',
        }}
      />
      </div>
      <div onClick={()=>handleFilterDropdown('dropdown1')} className='flex flex-col px-2  relative cursor-pointer border-l-1 border-solid border-[#e0e0e0]'>
        <h5 className='text-[14px] font-semibold text-black'>Star Raitng</h5>
        <p className='text-[12px] font-normal text-black'>Select Raiting</p>
        <Icon icon="prime:angle-down" className="absolute top-0 right-0" width="24" height="24" />
        {isDropdown === 'dropdown1' && 
        <div className='absolute top-[50px] left-0 bg-white px-2 py-5 shadow w-[250px] z-[9] '>
            <div className='flex flex-col items-center gap-2'>
               <div className='flex justify-between w-full'>
               <Checkbox>5 Star </Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
               <div className='flex justify-between w-full'>
               <Checkbox>2 Star </Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
               <div className='flex justify-between w-full'>
               <Checkbox>3 Star </Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
               <div className='flex justify-between w-full'>
               <Checkbox>4 Star </Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
               <div className='flex justify-between w-full'>
               <Checkbox>1 Star </Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
               <div className='flex justify-between w-full'>
               <Checkbox>Unrated </Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
               <div className='flex justify-end w-full'>
                <Button className='bg-transparent text-danger justify-end border-1 p-0 border-none'>Reset</Button>
               </div>
               
            </div>
        </div>
        }
        </div>

         <div onClick={()=>handleFilterDropdown('dropdown2')} className='flex flex-col px-2  relative cursor-pointer border-l-1 border-solid border-[#e0e0e0]'>
        <h5 className='text-[14px] font-semibold text-black'>Meal</h5>
        <p className='text-[12px] font-normal text-black'>Select Meal</p>
        <Icon icon="prime:angle-down" className="absolute top-0 right-0" width="24" height="24" />
        {isDropdown === 'dropdown2' &&
        <div className='absolute top-[50px] left-0 bg-white px-2 py-5 shadow w-[250px] z-[9]'>
            <div className='flex flex-col items-center gap-2'>
               <div className='flex justify-between w-full'>
               <Checkbox>Room Only </Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
               <div className='flex justify-between w-full'>
               <Checkbox>Breakfast </Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
              
               <div className='flex justify-end w-full'>
                <Button className='bg-transparent text-danger justify-end border-1 p-0 border-none'>Reset</Button>
               </div>
               
            </div>
        </div>
        }
        </div>

         <div onClick={()=>handleFilterDropdown('dropdown3')} className='flex flex-col px-2  relative cursor-pointer border-l-1 border-solid border-[#e0e0e0]'>
        <h5 className='text-[14px] font-semibold text-black'>Amenities</h5>
        <p className='text-[12px] font-normal text-black'>Select Amenities</p>
        <Icon icon="prime:angle-down" className="absolute top-0 right-0" width="24" height="24" />
       { isDropdown === 'dropdown3' &&
         <div className='absolute top-[50px] left-0 bg-white px-2 py-5 shadow w-[250px] z-[9] '>
            <div className='flex flex-col items-center gap-2'>
               <div className='flex justify-between w-full'>
               <Checkbox>Wifi</Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
               <div className='flex justify-between w-full'>
               <Checkbox>Air Condition </Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
               <div className='flex justify-between w-full'>
               <Checkbox>BreakFast</Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
               <div className='flex justify-between w-full'>
               <Checkbox>SPA </Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
               <div className='flex justify-between w-full'>
               <Checkbox>Parking </Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
               <div className='flex justify-between w-full'>
               <Checkbox>Pool </Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
               <div className='flex justify-end w-full'>
                <Button className='bg-transparent text-danger justify-end border-1 p-0 border-none'>Reset</Button>
               </div>
               
            </div>
        </div>
}
        </div>

         <div onClick={()=>handleFilterDropdown('dropdown4')} className='flex flex-col px-2   cursor-pointer border-l-1 border-solid border-[#e0e0e0]'>
        <div className='relative'>
        <h5 className='text-[14px] font-semibold text-black'>Nearby</h5>
        <p className='text-[12px] font-normal text-black'>Select Near By Hotel</p>
        <Icon icon="prime:angle-down" className="absolute top-0 right-0" width="24" height="24" />
        </div>
        {isDropdown === 'dropdown4' &&
        <div className='absolute top-[50px] left-0 right-0 w-full  bg-white px-2 py-5 shadow  z-[99]'>
            <div className='grid grid-cols-4 items-center gap-5'>
               <div className='flex gap-2 w-full'>
               <Checkbox>Near Souq Waqif</Checkbox> <span className='text-[14px] text-[#666666]'>(1)</span>
               </div>

                <div className='flex gap-2 w-full'>
               <Checkbox>Near Qatar National Museum</Checkbox> <span className='text-[14px] text-[#666666]'>(1)</span>
               </div>

                <div className='flex gap-2 w-full'>
               <Checkbox>Diplomatic Area</Checkbox> <span className='text-[14px] text-[#666666]'>(1)</span>
               </div>

                <div className='flex gap-2 w-full'>
               <Checkbox>Near Grand Hamad Street</Checkbox> <span className='text-[14px] text-[#666666]'>(1)</span>
               </div>

                <div className='flex gap-2 w-full'>
               <Checkbox>Near City Centre Shopping Mall</Checkbox> <span className='text-[14px] text-[#666666]'>(1)</span>
               </div>

                <div className='flex gap-2 w-full'>
               <Checkbox>Near The Gate Mall</Checkbox> <span className='text-[14px] text-[#666666]'>(1)</span>
               </div>

                <div className='flex gap-2 w-full'>
               <Checkbox>Near Fire Station Art Gallery</Checkbox> <span className='text-[14px] text-[#666666]'>(1)</span>
               </div>

                <div className='flex gap-2 w-full'>
               <Checkbox>Hotel</Checkbox> <span className='text-[14px] text-[#666666]'>(1)</span>
               </div>

                <div className='flex gap-2 w-full'>
               <Checkbox>Near Falcon Souq</Checkbox> <span className='text-[14px] text-[#666666]'>(1)</span>
               </div>

                <div className='flex gap-2 w-full'>
               <Checkbox>Near Sports City</Checkbox> <span className='text-[14px] text-[#666666]'>(1)</span>
               </div>

                <div className='flex gap-2 w-full'>
               <Checkbox>Near Katara Cultural Village</Checkbox> <span className='text-[14px] text-[#666666]'>(1)</span>
               </div>

                <div className='flex gap-2 w-full'>
               <Checkbox>Near Katara Beach</Checkbox> <span className='text-[14px] text-[#666666]'>(1)</span>
               </div>
              
              
              
               
            </div>
             <div className='flex justify-end w-full'>
                <Button className='bg-transparent text-danger justify-end border-1 p-0 border-none'>Reset</Button>
               </div>
        </div>
}
        </div>

         <div onClick={()=>handleFilterDropdown('dropdown5')} className='flex flex-col px-2  relative cursor-pointer border-l-1 border-solid border-[#e0e0e0]'>
        <h5 className='text-[14px] font-semibold text-black'>Accomodation Type</h5>
        <p className='text-[12px] font-normal text-black'>Select Accomodation</p>
        <Icon icon="prime:angle-down" className="absolute top-0 right-0" width="24" height="24" />
        {isDropdown === 'dropdown5' &&
        <div className='absolute top-[50px] left-0 bg-white px-2 py-5 shadow w-[250px] z-[9] '>
            <div className='flex flex-col items-center gap-2'>
               <div className='flex justify-between w-full'>
               <Checkbox>Hotel</Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
               <div className='flex justify-between w-full'>
               <Checkbox>Apratment </Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
              
               <div className='flex justify-end w-full'>
                <Button className='bg-transparent text-danger justify-end border-1 p-0 border-none'>Reset</Button>
               </div>
               
            </div>
        </div>
}
        </div>

         <div onClick={()=>{handleFilterDropdown('dropdown6')}} className='flex flex-col px-2  relative cursor-pointer border-l-1 border-solid border-[#e0e0e0]'>
        <h5 className='text-[14px] font-semibold text-black'>Payment Type</h5>
        <p className='text-[12px] font-normal text-black'>Select Payment</p>
        <Icon icon="prime:angle-down" className="absolute top-0 right-0" width="24" height="24" />
        { isDropdown === 'dropdown6' &&
         <div className='absolute top-[50px] left-0 bg-white p-2 shadow w-[250px] z-[9]'>
            <div className='flex flex-col items-center gap-2'>
               <div className='flex justify-between w-full'>
               <Checkbox>Pay Now</Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
             
              
               <div className='flex justify-end w-full'>
                <Button className='bg-transparent text-danger justify-end border-1 p-0 border-none'>Reset</Button>
               </div>
               
            </div>
        </div>
}
        </div>

         <div onClick={()=>{handleFilterDropdown('dropdown7')}} className='flex flex-col px-2  relative cursor-pointer border-l-1 border-solid border-[#e0e0e0]'>
        <h5 className='text-[14px] font-semibold text-black'>More Option</h5>
        <p className='text-[12px] font-normal text-black'>All</p>
        <Icon icon="prime:angle-down" className="absolute top-0 right-0" width="24" height="24" />
        {isDropdown === 'dropdown7' &&
         <div className='absolute top-[50px] left-0 bg-white px-2 py-5 shadow w-[250px] z-[9] '>
            <div className='flex flex-col items-center gap-2'>
               <div className='flex justify-between w-full'>
               <Checkbox>Pet Friendly</Checkbox> <span className='text-[14px] text-[#666666]'>1</span>
               </div>
             
              
               <div className='flex justify-end w-full'>
                <Button className='bg-transparent text-danger justify-end border-1 p-0 border-none'>Reset</Button>
               </div>
               
            </div>
        </div>
}
        </div>
            </div>
        </div>
        </section>
    )
}

export default FilterListing