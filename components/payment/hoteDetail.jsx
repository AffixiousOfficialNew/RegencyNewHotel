"use client";
import React from "react";
import { Card, CardBody, Image, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import moment from "moment";
import HotelAminityType from "../HotelAminityType"

export const HotelDetails = ({data, hotelDetailsInfo}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Hotel amenities with icons
  const amenities = [
    { name: "Fitness Center", icon: "lucide:dumbbell" },
    { name: "Restaurant", icon: "lucide:utensils" },
    { name: "Parking", icon: "lucide:car" },
    { name: "Free WiFi", icon: "lucide:wifi" },
    { name: "Swimming Pool", icon: "lucide:droplets" },
  ];

  const hotelInfo = JSON.parse(localStorage.getItem("detailResp"));
  var result = data?.hotelDetails
  ? data?.hotelDetails
  : "";
var resultDetail = hotelDetailsInfo?.[0]?.Info || hotelInfo?.Info;
var searchRequest = result?.Hotelsearchrequest
  ? result?.Hotelsearchrequest
  : "";

const chkInDate = moment(searchRequest?.ChkInDate).format("DD MMM, YYYY");
var chkInDay = moment(searchRequest?.ChkInDate).format("DD");
var chkInMonth = moment(searchRequest?.ChkInDate).format("MMM");
var chkInYear = moment(searchRequest?.ChkInDate).format("YYYY");

const chkOutDate = moment(searchRequest?.ChkOutDate).format("DD MMM, YYYY");
var chkOutDay = moment(searchRequest?.ChkOutDate).format("DD");
var chkOutMonth = moment(searchRequest?.ChkOutDate).format("MMM");
var chkOutYear = moment(searchRequest?.ChkOutDate).format("YYYY");

let imageUrl = hotelDetailsInfo?.[0]?.
RoomImages?.Images?.[0]?.URL || hotelInfo?.Info?.HotelImage;
    let updatedUrl =
      imageUrl && imageUrl.indexOf("travelapi") > -1
        ? imageUrl.replace("_b.", "_z.")
        : imageUrl;
const dateDiff = (endDate, startDate)  => {
  if (endDate && startDate) {
    return moment(endDate).diff(moment(startDate), "days");
  } else {
    return "";
  }
}

var nights = dateDiff(chkOutDate, chkInDate);

  return (
    <Card className="overflow-hidden shadow-sm">
      <CardBody className="p-0 shadow-xl border">
        <div className="px-5 pt-5">
          <h1 className=" text-xl font-semibold md:text-2xl">Hotel Details</h1>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div
            className="relative w-[40.33%] p-5"
          
          >
            <Image
              removeWrapper
              alt="Town Hotel Doha"
              className="h-full w-full object-cover object-center"
              src={updatedUrl}
            />
          </div>

          {/* Hotel Details */}
          <div className="flex flex-1 flex-col p-4 md:p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold md:text-2xl">
                {resultDetail?.HotelName}
                </h2>
                
              </div>

              <div className="mt-1 flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    icon="lucide:star"
                    className={star <= hotelInfo?.Info?.StarRating ? "text-warning" : "text-default-300"}
                    width={20}
                  />
                ))}
              </div>

              <p className="mt-2 text-default-600">
              {resultDetail?.HotelAddress} , {resultDetail?.City} -{""}
              {resultDetail?.PostalCode}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Check-in */}
              <div className="rounded-medium border border-default-200 bg-default-50 p-4 text-center">
                <p className="text-sm text-default-600">Check in</p>
                <h3 className="mt-1 text-3xl font-semibold"> {chkInDay}</h3>
                <p className="text-sm text-default-600"> {chkInMonth} {chkInYear}</p>
              </div>

              {/* Check-out */}
              <div className="rounded-medium border border-default-200 bg-default-50 p-4 text-center">
                <p className="text-sm text-default-600">Check out</p>
                <h3 className="mt-1 text-3xl font-semibold">{chkOutDay}</h3>
                <p className="text-sm text-default-600">{chkOutMonth} {chkOutYear}</p>
              </div>

              {/* Stay Details */}
              <div className="rounded-medium border border-default-200 bg-default-50 p-4">
                <div className="mb-2">
                  <p className="text-sm font-medium text-default-600">Stay:</p>
                  <p className="font-medium">{nights}Nights</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-medium text-default-600">Room:</p>
                  {result.HotelRooms &&
                      result.HotelRooms.length > 0 &&
                      result.HotelRooms.map(
                        (props, inclusionsIndex) =>
                          props.ListOfRoom &&
                          props.ListOfRoom.length > 0 &&
                          props.ListOfRoom.map((roomProp, ind) => (
                            <p className="font-medium" key={ind} >
                              {" "}
                              {roomProp?.RoomCount}{" "}
                              Room
                            </p>
                          ))
                      )}
                </div>
                <div>
                  <p className="text-sm font-medium text-default-600">Guest:</p>
                  {result.HotelRooms &&
                      result.HotelRooms.length > 0 &&
                      result.HotelRooms.map(
                        (props, inclusionsIndex) =>
                          props.ListOfRoom &&
                          props.ListOfRoom.length > 0 &&
                          props.ListOfRoom.map((roomProp, ind) => (
                            <span key={ind}>
                              {" "}
                              {roomProp.RoomAdult}{" "}
                             Adults{" "}
                              {roomProp.RoomChild === 0 ? (
                                ""
                              ) : (
                                <span>
                                  {roomProp.RoomChild}{" "}
                                  Child
                                </span>
                              )}
                            </span>
                          ))
                      )}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                Features you'll love
                <Icon
                  icon="lucide:heart"
                  className="fill-danger text-danger"
                  width={20}
                />
              </h3>

              <div className="flex flex-wrap gap-4">
                {/* {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-medium bg-default-100 px-3 py-2"
                  >
                    <Icon icon={amenity.icon} width={20} />
                    <span className="text-sm">{amenity.name}</span>
                  </div>
                ))} */}

                  <HotelAminityType
                  amenityType={
                    resultDetail?.AmenityType ? resultDetail?.AmenityType : ""
                  }
                 
                />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
