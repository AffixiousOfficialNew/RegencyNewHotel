import React from 'react';
import {Image , Button} from "@heroui/react";
import { Icon } from "@iconify/react";
const HotelDetailsResult=()=>{
    return(
        <>
         <div className='bg-white border-t-1 border-b-1 border-solid border-[#dddddd] p-5 mb-5'>
            <div className='container mx-auto px-2 xl:px-0'>
                <ul className='flex gap-5'>
                    <li className='font-bold text-[16px] cursor-pointer'>Room</li>
                    <li className='font-bold text-[16px] cursor-pointer'>Amenities</li>
                    <li className='font-bold text-[16px] cursor-pointer'>About this property</li>
                    <li className='font-bold text-[16px] cursor-pointer'>Policies</li>
                </ul>

              
            </div>

           
         </div>

         <div className='container mx-auto px-2 xl:px-0'>
           <div className='border-1 border-solid border-[#dddddd] mb-5'>
                <div className='grid grid-cols-3 gap-0 border-b border-solid border-[#dddddd] '>
                    <div className='border-r-1 border-solid border-[#dddddd] p-2'>
                    <Image src='https://c.myholidays.com/giata/MH-00151158/l/0.jpeg' className='rounded-none w-full' classNames={{
                        wrapper:"!max-w-full"
                    }}/>
                    <h5 className='my-2 text-[18px] font-semibold text-black'>Executive Room</h5>
                    </div>

                    <div className='border-r-1 border-solid border-[#dddddd]'>
                       <h4 className='bg-[#dddddd] text-[174982] text-[14px] font-semibold p-3'>Option 1</h4>    
                       <ul className='p-2 '>
                        <li className='flex gap-2 text-black mb-2 text-[16px]'><Icon icon="material-symbols-light:check-rounded" className='text-[#174982]' width="24" height="24" /> Room Only</li>
                        <li className='flex gap-2 text-black mb-2 text-[16px]'><Icon icon="material-symbols-light:check-rounded" className='text-[#174982]' width="24" height="24" /> Free Cancellation till Jun 5, 2025</li>
                       </ul> 
                    </div>

                    <div className='p-2'>
                        <div className='flex justify-between items-center mb-2'>
                        <h3 className='text-[24px] text-black font-semibold'><span className='text-[16px]'> INR </span> 3,915.3 <span className='block text-[12px] font-normal'>avg/night</span></h3>
                        <Button className='bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16]'>Book Nows</Button>
                        </div>
                        <p className='text-[#006837] text-[12px] flex gap-1 items-center mb-2'><Icon icon="icon-park-solid:check-one" width="20" height="20" /> Recommended for you</p>
                        <p className='text-danger text-[12px]'>Non-Refundable</p>
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-0 border-b border-solid border-[#dddddd] '>
                    <div className='border-r-1 border-solid border-[#dddddd] p-2'>
                    <Image src='https://c.myholidays.com/giata/MH-00151158/l/0.jpeg' className='rounded-none w-full' classNames={{
                        wrapper:"!max-w-full"
                    }}/>
                    <h5 className='my-2 text-[18px] font-semibold text-black'>Executive Room</h5>
                    </div>

                    <div className='border-r-1 border-solid border-[#dddddd]'>
                       <h4 className='bg-[#dddddd] text-[174982] text-[14px] font-semibold p-3'>Option 1</h4>    
                       <ul className='p-2 '>
                        <li className='flex gap-2 text-black mb-2 text-[16px]'><Icon icon="material-symbols-light:check-rounded" className='text-[#174982]' width="24" height="24" /> Room Only</li>
                        <li className='flex gap-2 text-black mb-2 text-[16px]'><Icon icon="material-symbols-light:check-rounded" className='text-[#174982]' width="24" height="24" /> Free Cancellation till Jun 5, 2025</li>
                       </ul> 
                    </div>

                    <div className='p-2'>
                        <div className='flex justify-between items-center mb-2'>
                        <h3 className='text-[24px] text-black font-semibold'><span className='text-[16px]'> INR </span> 3,915.3 <span className='block text-[12px] font-normal'>avg/night</span></h3>
                        <Button className='bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16]'>Book Nows</Button>
                        </div>
                        <p className='text-[#006837] text-[12px] flex gap-1 items-center mb-2'><Icon icon="icon-park-solid:check-one" width="20" height="20" /> Recommended for you</p>
                        <p className='text-danger text-[12px]'>Non-Refundable</p>
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-0 border-b border-solid border-[#dddddd] '>
                    <div className='border-r-1 border-solid border-[#dddddd] p-2'>
                    <Image src='https://c.myholidays.com/giata/MH-00151158/l/0.jpeg' className='rounded-none w-full' classNames={{
                        wrapper:"!max-w-full"
                    }}/>
                    <h5 className='my-2 text-[18px] font-semibold text-black'>Executive Room</h5>
                    </div>

                    <div className='border-r-1 border-solid border-[#dddddd]'>
                       <h4 className='bg-[#dddddd] text-[174982] text-[14px] font-semibold p-3'>Option 1</h4>    
                       <ul className='p-2 '>
                        <li className='flex gap-2 text-black mb-2 text-[16px]'><Icon icon="material-symbols-light:check-rounded" className='text-[#174982]' width="24" height="24" /> Room Only</li>
                        <li className='flex gap-2 text-black mb-2 text-[16px]'><Icon icon="material-symbols-light:check-rounded" className='text-[#174982]' width="24" height="24" /> Free Cancellation till Jun 5, 2025</li>
                       </ul> 
                    </div>

                    <div className='p-2'>
                        <div className='flex justify-between items-center mb-2'>
                        <h3 className='text-[24px] text-black font-semibold'><span className='text-[16px]'> INR </span> 3,915.3 <span className='block text-[12px] font-normal'>avg/night</span></h3>
                        <Button className='bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16]'>Book Nows</Button>
                        </div>
                        <p className='text-[#006837] text-[12px] flex gap-1 items-center mb-2'><Icon icon="icon-park-solid:check-one" width="20" height="20" /> Recommended for you</p>
                        <p className='text-danger text-[12px]'>Non-Refundable</p>
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-0 border-b border-solid border-[#dddddd] '>
                    <div className='border-r-1 border-solid border-[#dddddd] p-2'>
                    <Image src='https://c.myholidays.com/giata/MH-00151158/l/0.jpeg' className='rounded-none w-full' classNames={{
                        wrapper:"!max-w-full"
                    }}/>
                    <h5 className='my-2 text-[18px] font-semibold text-black'>Executive Room</h5>
                    </div>

                    <div className='border-r-1 border-solid border-[#dddddd]'>
                       <h4 className='bg-[#dddddd] text-[174982] text-[14px] font-semibold p-3'>Option 1</h4>    
                       <ul className='p-2 '>
                        <li className='flex gap-2 text-black mb-2 text-[16px]'><Icon icon="material-symbols-light:check-rounded" className='text-[#174982]' width="24" height="24" /> Room Only</li>
                        <li className='flex gap-2 text-black mb-2 text-[16px]'><Icon icon="material-symbols-light:check-rounded" className='text-[#174982]' width="24" height="24" /> Free Cancellation till Jun 5, 2025</li>
                       </ul> 
                    </div>

                    <div className='p-2'>
                        <div className='flex justify-between items-center mb-2'>
                        <h3 className='text-[24px] text-black font-semibold'><span className='text-[16px]'> INR </span> 3,915.3 <span className='block text-[12px] font-normal'>avg/night</span></h3>
                        <Button className='bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16]'>Book Nows</Button>
                        </div>
                        <p className='text-[#006837] text-[12px] flex gap-1 items-center mb-2'><Icon icon="icon-park-solid:check-one" width="20" height="20" /> Recommended for you</p>
                        <p className='text-danger text-[12px]'>Non-Refundable</p>
                    </div>
                </div>

                

                
           </div>

           <div className='mt-5 border-1 border-solid border-[#dddddd]'>
            <h3 className='text-[16px] font-semibold text-black bg-[#dddddd] p-2'>Hotel Services</h3>
            <ul className='grid grid-cols-4 gap-2 p-2'>
                    <li className='text-[16px] text-black'>No pets or service animals allowed</li>
                    <li className='text-[16px] text-black'>Pets not allowed</li>
                    <li className='text-[16px] text-black'>No alcohol allowed onsite</li>
                    <li className='text-[16px] text-black'>No alcohol served onsite</li>
                    <li className='text-[16px] text-black'>Coffee/tea in common areas</li>
                    <li className='text-[16px] text-black'>Shopping center shuttle (surcharge)</li>
                    <li className='text-[16px] text-black'>Elevator</li>
                    <li className='text-[16px] text-black'>Rooftop terrace</li>
                    <li className='text-[16px] text-black'>Fitness facilities</li>
                    <li className='text-[16px] text-black'>Full-service spa</li>
                    <li className='text-[16px] text-black'>24-hour front desk</li>
                    <li className='text-[16px] text-black'>Conference space</li>
            </ul>
           </div>

           <div className='my-5 border-1 border-solid border-[#dddddd]'>
            <h3 className='text-[16px] font-semibold text-black bg-[#dddddd] p-2'>Cards Accepted</h3>
                <div className='flex gap-5 p-2'>
                    <Icon icon="logos:mastercard" width="50" height="50" />
                    <Icon icon="logos:visa" width="50" height="50" />
                    <Icon icon="fontisto:american-express" width="50" height="50" />
                </div>
                <p className='text-danger text-right text-[14px] mb-2 mr-2'>(*) Some services shall be paid at the establishment.</p>
           </div>

           <div className='mt-5 border-1 border-solid border-[#dddddd]'>
            <h3 className='text-[16px] font-semibold text-black bg-[#dddddd] p-2'>Hotel Services</h3>
            <div className='p-2'>
            <p className='text-[16px] text-black leading-[24px]'>Relax at the full-service spa, where you can enjoy massages, body treatments, and facials. You're sure to appreciate the recreational amenities, including an outdoor pool, a spa tub, and a fitness center. This hotel also features complimentary wireless Internet access, concierge services, and babysitting/childcare (surcharge). Guests can catch a ride on the shuttle (surcharge), which operates within 10 km.</p>
           </div>
           </div>

           <div className='mt-5 border-1 border-solid border-[#dddddd]'>
            <h3 className='text-[16px] font-semibold text-black bg-[#dddddd] p-2'>Dining</h3>
            <div className='p-2'>
            <p className='text-[16px] text-black leading-[24px]'>Relax at the full-service spa, where you can enjoy massages, body treatments, and facials. You're sure to appreciate the recreational amenities, including an outdoor pool, a spa tub, and a fitness center. This hotel also features complimentary wireless Internet access, concierge services, and babysitting/childcare (surcharge). Guests can catch a ride on the shuttle (surcharge), which operates within 10 km.</p>
           </div>
           </div>


           <div className='mt-5 border-1 border-solid border-[#dddddd]'>
            <h3 className='text-[16px] font-semibold text-black bg-[#dddddd] p-2'>Business Amenities</h3>
            <div className='p-2'>
            <p className='text-[16px] text-black leading-[24px]'>Relax at the full-service spa, where you can enjoy massages, body treatments, and facials. You're sure to appreciate the recreational amenities, including an outdoor pool, a spa tub, and a fitness center. This hotel also features complimentary wireless Internet access, concierge services, and babysitting/childcare (surcharge). Guests can catch a ride on the shuttle (surcharge), which operates within 10 km.</p>
           </div>
           </div>


           <div className='mt-5 border-1 border-solid border-[#dddddd]'>
            <h3 className='text-[16px] font-semibold text-black bg-[#dddddd] p-2'>Rooms</h3>
            <div className='p-2'>
            <p className='text-[16px] text-black leading-[24px]'>Relax at the full-service spa, where you can enjoy massages, body treatments, and facials. You're sure to appreciate the recreational amenities, including an outdoor pool, a spa tub, and a fitness center. This hotel also features complimentary wireless Internet access, concierge services, and babysitting/childcare (surcharge). Guests can catch a ride on the shuttle (surcharge), which operates within 10 km.</p>
           </div>
           </div>

            <div className='mt-5 border-1 border-solid border-[#dddddd]'>
            <h3 className='text-[16px] font-semibold text-black bg-[#dddddd] p-2'>Attractions</h3>
            <div className='p-2'>
            <p className='text-[16px] text-black leading-[24px]'>Distances are displayed to the nearest 0.1 mile and kilometer.</p>

            <ul className='grid grid-cols-1 gap-2 p-2'>
                    <li className='text-[16px] text-black'>Doha Corniche - 0.5 km / 0.3 mi</li>
                    <li className='text-[16px] text-black'>MIA Park - 0.6 km / 0.4 mi</li>
                    <li className='text-[16px] text-black'>Museum of Islamic Art - 0.8 km / 0.5 mi</li>
            </ul>

             <p className='text-[16px] text-black leading-[24px]'>Distances are displayed to the nearest 0.1 mile and kilometer.</p>
           </div>
           </div>

           <div className='mt-5 border-1 border-solid border-[#dddddd]'>
            <h3 className='text-[16px] font-semibold text-black bg-[#dddddd] p-2'>Location</h3>
            <div className='p-2'>
            <p className='text-[16px] text-black leading-[24px]'>Relax at the full-service spa, where you can enjoy massages, body treatments, and facials. You're sure to appreciate the recreational amenities, including an outdoor pool, a spa tub, and a fitness center. This hotel also features complimentary wireless Internet access, concierge services, and babysitting/childcare (surcharge). Guests can catch a ride on the shuttle (surcharge), which operates within 10 km.</p>
           </div>
           </div>

              <div className='mt-5 border-1 border-solid border-[#dddddd]'>
            <h3 className='text-[16px] font-semibold text-black bg-[#dddddd] p-2'>Headline</h3>
            <div className='p-2'>
            <p className='text-[16px] text-black leading-[24px]'>Relax at the full-service spa, where you can enjoy massages, body treatments, and facials. You're sure to appreciate the recreational amenities, including an outdoor pool, a spa tub, and a fitness center. This hotel also features complimentary wireless Internet access, concierge services, and babysitting/childcare (surcharge). Guests can catch a ride on the shuttle (surcharge), which operates within 10 km.</p>
           </div>
           </div>

             <div className='mt-5 border-1 border-solid border-[#dddddd]'>
            <h3 className='text-[16px] font-semibold text-black bg-[#dddddd] p-2'>Policies</h3>
            <div className='p-2'>
            <h6 className='text-[16px] text-[#174982] font-semibold'>Check-In</h6>
            <p><strong>Begin Time</strong> 3:00PM</p>
            <p><strong>End  Time</strong> 2:30PM</p>
            <p><strong>Instructions </strong> Extra-person charges may apply and vary depending on property policy. Government-issued photo identification and a credit card are required at check-in for incidental charges. Special requests are subject to availability upon check-in and may incur additional charges. Special requests cannot be guaranteed.</p>
            <p>Minimum Spring Break check-in age is 21 years old.</p>
            <p>The name on the credit card used at check-in to pay for incidentals must be the primary name on the guestroom reservation.</p>
            <p>Please note that cultural norms and guest policies may differ by country and by property. The policies listed are provided by the property.</p>
            <p><strong>Special Instructions</strong> 24-hour airport shuttle service is available. Fees may apply. Contact the property in advance to get details.</p>
            <p><strong>Min Age</strong> 21</p>
            <h6 className='text-[16px] text-[#174982] font-semibold'>Check-In : <span className='font-normal'>12:00 PM</span></h6>
            <h6 className='text-[16px] text-[#174982] font-semibold'>Pets : <span className='font-normal'>Pets not allowed</span></h6>
            </div>
           </div>
        </div>
        </>
    )
}

export default HotelDetailsResult;