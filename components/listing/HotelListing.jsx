"use client";
import React, { useEffect, useState } from "react";
import { Image, Button, Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter, useDisclosure, } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "../../redux/slices/detailSlice";
import Amenities from "../Amenities";
import SkeletonLoader from "../SkeletonLoader";
import Link from "next/link";

const HotelListing = ({ setSelectedHotel, setIsInfoOpen  }) => {
  const dispatch = useDispatch();
  const { listing, details } = useSelector((state) => state);
  const searchId = listing?.listingResult[0]?.SearchId;
  const globalCurrency = listing?.currency;
  const hotels = listing?.listofHotel || [];
  const data = listing?.listingResult[0];
  const info = data?.SearchRequest;
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const img = details?.detailResult[0]?.RoomImages?.Images || [];
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  console.log({img});
  useEffect(() => {
    if (listing?.listofHotel) {
      setLoading(false);
    }
    if(img.length>0){
    setModalImages(img);
    setIsModalOpen(true); 
    }
  }, [listing,img]);

  const handleImageClick = (id) => {
    dispatch(getInfo(id))  
    onOpen();  
  };

  return (
    <>
    <section>
      <div className="w-full px-2 mx-auto">
        {loading || hotels.length === 0 ? (
          <SkeletonLoader />
        ) : (
          hotels.map((hotel, index) => (
            <article
              key={index}
              className="flex gap-5 border border-solid border-[#dddddd] p-2 flex-wrap md:flex-nowrap"
               onMouseEnter={() => {
    setSelectedHotel(hotel);
    setIsInfoOpen(true);
  }}
            >
              <div className="w-full md:w-[40%] xl:w-[20%] relative overflow-hidden rounded-[10px]">          
                <Image
                  src={hotel.HotelImage}
                  alt={hotel.HotelName}
                  className="w-full  top-0 bottom-0 h-[340px] xl:h-[250px] object-cover rounded-none"
                  classNames={{ wrapper: "!max-w-full" }}
                />
                <span
                  onClick={() => handleImageClick(hotel.Hotelcode)}
                  className="px-5 py-2 rounded-[5px] absolute bottom-[10px] right-[10px] z-[99] flex gap-2 bg-black text-white cursor-pointer"
                >
                  <Icon icon="ph:image-light" width="25" height="25" />
                </span>
              </div>

              <div className="w-full md:w-[60%] xl:w-[80%] flex md:flex-nowrap flex-wrap gap-2">
                <div className="w-full">
                  <h2 className="text-[24px] font-bold text-black">{hotel.HotelName}</h2>
                  <div className="flex gap-0">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        icon="material-symbols-light:star-rounded"
                        width="30"
                        height="30"
                        className={`text-[#feba02] ${i < hotel.HotelStar ? "" : "opacity-20"}`}
                      />
                    ))}
                  </div>
                  <p className="text-[14px] text-[#757575]">
                    {hotel.HotelAddress}
                    <Button className="p-0 bg-transparent text-[#013ca6] h-[20px]">View Map</Button>
                  </p>
                  <h3 className="text-[#d63565] text-[14px] font-semibold">{hotel.HotelZone}</h3>
                  <p className="bg-[#707070] px-3 py-2 inline-block text-white text-[12px] rounded-[10px] mt-3">
                    {hotel.MealType}
                  </p>
                  <div className="flex gap-2 my-2 flex-wrap">
                    <Amenities amenities={hotel.amenitiesType} />
                  </div>
                </div>
                <div className="border-l-0 md:border-l-1 border-solid border-[#dddddd] pl-3 w-full md:w-[350px] text-center flex items-center justify-center">
                  <div>
                    <h4 className="text-[24px] font-semibold">
                      <span>{hotel.SelectedCurrency} </span>
                      {hotel.LowestPrice}
                    </h4>
                    <p>avg/night</p>
                    <Link className="bg-[#d90e16] text-white rounded-[10px] mt-3 w-[180px] inline-flex items-center justify-center h-[50px]"
                      href={`/hotels/hoteldetail?hotelId=${hotel?.Hotelcode}&SearchKey=${data?.SearchId}&nationality=${data?.SearchRequest?.Nationality}&destinationCode=${data?.SearchRequest?.DestinationID}&checkIn=27%20Jun%202025&checkOut=29%20Jun%202025&noOfRoom=1&paxInfo=${data?.SearchRequest?.PaxInfo}&aff=${data?.SearchRequest?.AffiliateId}&currency=${globalCurrency}&IsPromotedProperty=false&searchType=Hotel&countryCode=${data?.SearchRequest?.CountryCode}`}>

                      Select
                    </Link>
                    {/* <Button className="bg-[#d90e16] text-white rounded-[10px] mt-3 w-[180px]"> */}
                    {/* </Button> */}
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>


<Drawer className="max-w-[50%] z-[999] rounded-none" isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
       
            <>
              <DrawerBody>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {modalImages.map((img, i) => (
          <img
            key={i}
            src={img.URL}
            alt={`Hotel image ${i + 1}`}
            className="w-full h-48 object-cover rounded"
          />
        ))}
      </div>
              </DrawerBody>
             
            </>
      
        </DrawerContent>
      </Drawer>


    





    </section>
    
    </>
  );
};

export default HotelListing;
