import React, { useEffect, useState } from 'react';
import {Image , Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, TableHeader, TableBody, TableRow, TableCell, ModalFooter, Table, TableColumn} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useRouter } from 'next/navigation';

const HotelDetailsResult=()=>{
    const {details} = useSelector((state)=>state);
    const AllImages = details?.detailResult[0]?.RoomImages?.Images?.filter(
        (i) => i?.Caption?.toLowerCase() === "room"
      );
      const { isOpen, onOpen, onOpenChange } = useDisclosure();
      const info = details?.detailResult[0];
      const amenities = info?.Amenities?.AmenitiesDetails;
      console.log({info , amenities});
    // console.log({aa:details?.detailResult[0]?.Info,aanch:details?.roomResult[0]?.ListOfRooms[0]?.ListOfRoom[0]?.RoomRates[0],AllImages});
    const roomRes = details?.roomResult[0]?.RoomDetails[0] || [];
    const date =(cncldd)=>{
        const formattedDate = moment(cncldd).format('MMM D, YYYY');
        // console.log(formattedDate); 
        return formattedDate;
    }
    if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "detailResp",
          JSON.stringify(details?.detailResult[0])
        );
      }
    const searchKey = details?.roomResult[0]?.SearchKey;
    const router = useRouter();
    const handleBookNow = (room) => {
          const rateId = room?.ListOfRoom[0]?.RoomRates[0]?.RateCode;
          const roomId = room?.ListOfRoom[0]?.RoomId;
          const hotelID = details?.detailResult[0]?.Info?.MYHHotelCode;
          
            router.push(`/hotelpayment?searchKey=${searchKey}&roomID=${roomId}&hotelID=${hotelID}&rateID=${rateId}&culture=en-GB`);
      };


       const globalCurrency = useSelector((state) => state.listing.currency);

  const [prevCurrency, setPrevCurrency] = useState(globalCurrency);

  useEffect(() => {
    if (prevCurrency !== globalCurrency) {
      setPrevCurrency(globalCurrency);
      window.location.reload();
    }
  }, [globalCurrency]);

  const parsedAmenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities;
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
               
                {roomRes?.map((room, index) => (
                     <div className='grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-solid border-[#dddddd] ' key={index}>
                      <div // key={index}
                        className='border-r-1 border-solid border-[#dddddd] p-2'>
                        <Image src={
                            AllImages?.length &&
                            AllImages[index % AllImages?.length]
                            ? AllImages[index % AllImages?.length].URL
                            : "/hotels/static/images/image-not-avail.png"
                          } 
                          className='rounded-none w-full opacity-1 h-[350px] object-cover' classNames={{
                            wrapper: "!max-w-full"
                        }} />
                        <h5 className='my-2 text-[18px] font-semibold text-black'>{room?.ListOfRoom[0]?.RoomType}</h5>
                    </div><div className='border-r-1 border-solid border-[#dddddd]'>
                            <h4 className='bg-[#dddddd] text-[174982] text-[14px] font-semibold p-3'>Option 1</h4>
                            <ul className='p-2 '>
                                <li className='flex gap-2 text-black mb-2 text-[16px]'><Icon icon="material-symbols-light:check-rounded" className='text-[#174982]' width="24" height="24" /> {room?.ListOfRoom[0]?.RoomRates[0]?.MealType}</li>
                                <li className='flex gap-2 text-black mb-2 text-[16px]'><Icon icon="material-symbols-light:check-rounded" className='text-[#174982]' width="24" height="24" /> Free Cancellation till {date(room?.ListOfRoom[0]?.RoomRates[0]?.ListOfCnxPolicy[0]?.CnxDateTo)}</li>
                            </ul>
                        </div><div className='p-2'>
                            <div className='flex justify-between items-center mb-2'>
                                <h3 className='text-[24px] text-black font-semibold'><span className='text-[16px]'>{room?.ListOfRoom[0]?.RoomRates[0]?.Currency} </span>{room?.ListOfRoom[0]?.RoomRates[0]?.TotalRoomPrice}<span className='block text-[12px] font-normal'>avg/night</span></h3>
                                <Button className='bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16]' onPress={() => handleBookNow(room)}>Book Now</Button>
                            </div>
                            <p className='text-[#006837] text-[12px] flex gap-1 items-center mb-2'><Icon icon="icon-park-solid:check-one" width="20" height="20" /> Recommended for you</p>
                            {room?.ListOfRoom[0]?.RoomRates[0]
                        ?.IsRoomrefundable ? (
                        <div className="p-2 text-center">
                          <h6
                            className="text-[#d90e16] cursor-pointer text-[14px] font-semibold justify-start inline-flex gap-1"
                            onClick={onOpen}
                          >
                            Cancellation Policy{" "}
                            <Icon icon="ei:plus" width="25" height="25" />
                          </h6>
                        </div>
                      ) : (
                            <p className='text-danger text-[12px]'>Non-Refundable</p>
                      )}
                        </div>
                         </div>
                ))}                
           </div>

           <div className='mt-5 border-1 border-solid border-[#dddddd]'>
            <h3 className='text-[16px] font-semibold text-black bg-[#dddddd] p-2'>Hotel Services</h3>
                              
            <ul className='grid grid-cols-1 md:grid-cols-3 gap-2 p-2'>
                  {Array.isArray(parsedAmenities) && parsedAmenities.map((item, index) => (
    <li key={index} className="text-[16px] text-black flex items-center">
      <Icon icon="uit:angle-double-right" width="24" height="24" /> {item.Aminitiesdescription}
    </li>
  ))}
            </ul>
           </div>

           {/* <div className='my-5 border-1 border-solid border-[#dddddd]'>
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
           </div> */}
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="min-w-[650px]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b-1 border-solid border-[#d8dcde]">
                Cancellation Policy
              </ModalHeader>
              <ModalBody className="px-2">
                <div className="border-1 border-solid border-[#d8dcde]">
                  <h5 className="text-black border-b-1 border-solid border-[#d8dcde] px-2 py-3 text-[14px]">
                    <span className="font-semibold">Room Type:</span>TWIN
                    DELUXE, Breakfast (BED AND BREAKFAST)
                  </h5>
                  <p className="text-[14px] font-semibold text-[#00575e] px-2 py-3">
                    Free Cancellation Till 25 May 2025
                  </p>
                  <div className="m-2 bg-[#ffe6e6] p-2">
                    <h5 className="text-[14px] font-semibold">
                      Cancellation or changes made after this point will incur
                      the following charges:
                    </h5>

                    <Table
                      hideHeader
                      className="my-5"
                      classNames={{
                        table: "border-collapse border border-divider",
                        th: "border border-divider bg-default-100",
                        td: "border border-divider text-[14px] text-black",
                      }}
                    >
                      <TableHeader>
                        <TableColumn>&nbsp;</TableColumn>
                        <TableColumn> &nbsp;</TableColumn>
                        <TableColumn>&nbsp;</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow key="0">
                          <TableCell className="bg-[#dddddd]">
                            From Date
                          </TableCell>
                          <TableCell className="bg-[#dddddd]">
                            To Date
                          </TableCell>
                          <TableCell className="bg-[#dddddd]">
                            {" "}
                            Cancellation Charge
                          </TableCell>
                        </TableRow>
                        <TableRow key="1">
                          <TableCell>26 May 2025</TableCell>
                          <TableCell>29 May 2025</TableCell>
                          <TableCell>
                            {" "}
                            INR 5552 Amount fare and applicable Taxes.
                          </TableCell>
                        </TableRow>
                        <TableRow key="2">
                          <TableCell>30 May 2025</TableCell>
                          <TableCell>31 May 2025</TableCell>
                          <TableCell>
                            {" "}
                            INR 8114 Amount fare and applicable Taxes.
                          </TableCell>
                        </TableRow>

                        <TableRow key="3">
                          <TableCell colSpan={3}>
                            <span className="font-semibold">Note: </span> The
                            property makes no refunds for no shows or early
                            checkouts.
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        </>
    )
}

export default HotelDetailsResult;