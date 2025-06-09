"use client";
import React, { useEffect, useState } from "react";
import { Image, Button, Skeleton } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "../../redux/slices/detailSlice";
import Amenities from "../Amenities";
import SkeletonLoader from "../SkeletonLoader"; // Import the skeleton loader component
// Optional: Use a Skeleton loader lib

const HotelListing = () => {
  const dispatch = useDispatch();
  const { listing } = useSelector((state) => state);
  const { details } = useSelector((state) => state);
  const SearchKey = listing?.listingResult?.[0]?.SearchId;
  const data = listing?.listingResult?.[0];
  const info = data?.SearchRequest;
  const hotels = listing?.listofHotel || [];
  const resultCount =
    listing?.resultCount || listing?.listingResult?.[0]?.ResultCount || 0;
  const [images, setImages] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (details?.detailResult?.[0]?.RoomImages?.Images) {
      setImages(details.detailResult[0].RoomImages.Images);
    }
  }, [details]);

  useEffect(() => {
    // simulate loading end once hotels data is fetched
    if (listing && listing.listofHotel) {
      setLoading(false);
    }
  }, [listing]);

  const handleImageClick = (id) => {
    dispatch(getInfo(id));
  };

  return (
    <section>
      <div className="w-full px-2 mx-auto">
        {loading || hotels.length === 0 ? (
          // Render skeleton if loading or data is empty
          <>
          <SkeletonLoader/>
          </>
          ): (
          hotels.map((hotel, index) => (
            <article
              key={index}
              className="flex gap-5 border border-solid border-[#dddddd] p-2 flex-wrap md:flex-nowrap"
            >
              <div className="w-full md:w-[40%] xl:w-[20%] relative overflow-hidden rounded-[10px]">
                <Image
                  src={hotel.HotelImage}
                  className="w-full md:absolute static xl:static top-0 bottom-0 h-[340px] xl:h-[250px] object-cover rounded-none"
                  alt=""
                  classNames={{
                    wrapper: "!max-w-full",
                  }}
                />
                <span
                  onClick={() => handleImageClick(hotel.Hotelcode)}
                  className="px-5 py-2 rounded-[5px] absolute bottom-[10px] right-[10px] z-[99] flex gap-2 bg-black text-white"
                >
                  <Icon icon="ph:image-light" width="25" height="25" />
                </span>
              </div>
              <div className="w-full md:w-[60%] xl:w-[80%] flex md:flex-nowrap flex-wrap gap-2">
                <div className="w-full">
                  <h2 className="text-[24px] font-bold text-black">
                    {hotel.HotelName}
                  </h2>
                  <div className="flex gap-0">
                    {[...Array(5)].map((_, index) => (
                      <Icon
                        key={`${hotel.Hotelcode}-star-${index}`}
                        className={`text-[#feba02] ${
                          index < hotel.HotelStar ? "" : "opacity-20"
                        }`}
                        icon="material-symbols-light:star-rounded"
                        width="30"
                        height="30"
                      />
                    ))}
                  </div>
                  <p className="text-[14px] text-[#757575 ]">
                    {hotel.HotelAddress}{" "}
                    <Button className="p-0 bg-transparent text-[#013ca6] h-[20px]">
                      View Map
                    </Button>
                  </p>
                  <h3 className="text-[#d63565] text-[14px] font-semibold">
                    {hotel.HotelZone}
                  </h3>
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
                    <Button className="bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16] mt-3 w-[180px]">
                      Select
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default HotelListing;
