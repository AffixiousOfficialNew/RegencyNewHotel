"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { getListOfHotel } from "../redux/slices/citySlice";



const Listing = () =>{
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const [search, setsearch] = useState("");
    useEffect(()=>{
        const fetchSearchKey = async () => {
            try {
              const nationality = searchParams.get('nationality') || 'IN';
              const checkIn = searchParams.get('checkIn') || '10 May 2025';
              const checkOut = searchParams.get('checkOut') || '12 May 2025';
              const noOfRoom = searchParams.get('noOfRoom') || '1';
              const paxInfo = searchParams.get('paxInfo') || '';
              // const Affiliate = searchParams.get('Affiliate') || '0';
              const countryCode = searchParams.get('countryCode') || '';
              const currency = searchParams.get('currency') || '';
              const cityId = searchParams.get('cityId') || 1;
              const desId = searchParams.get('destinationId') || 0;
              // console.log({nationality,checkIn,checkOut,noOfRoom,countryCode,paxInfo,currency,cityId,desId});
              const API_URL =
              // `https://prodapi.myholidays.com/hotelsearch//api/search/Hotel?nationality=IN&residence=IN&destinationCode=&checkIn=23%20May%202025&checkOut=24%20May%202025&noOfRoom=1&paxInfo=AA$|&searchType=Direct&Affiliate=0&hotelId=&countryCode=QA&aSearch=&maxSR=0&deviceType=Desktop&cultureID=en-GB&airportCode=&Latitude=&Longitude=&Currency=INR&source=Direct&sort=pricing-asc&IsPromotedProperty=false&CustomerID=0&CustomerTypeID=0&UserID=0&CityId=4629&DestinationId=352`
                `https://prodapi.myholidays.com/hotelsearch/api/search/Hotel?nationality=${nationality}&residence=IN&destinationCode=&checkIn=${checkIn}&checkOut=${checkOut}&noOfRoom=${noOfRoom}&paxInfo=${paxInfo}&searchType=Direct&Affiliate=304&hotelId=&countryCode=${countryCode}&aSearch=&maxSR=0&deviceType=Desktop&cultureID=en-GB&airportCode=&Latitude=&Longitude=&Currency=${currency}&source=Direct&sort=pricing-asc&IsPromotedProperty=false&CustomerID=0&CustomerTypeID=0&UserID=0&CityId=${cityId}&DestinationId=${desId}`;
      
              const response = await axios.get(API_URL);
              const key = response.data?.SearchRequest?.HotelSearchKey;
      
              if (key) {
                setsearch(key);
              } else {
                console.error("No search key found in API response");
              }
            } catch (error) {
              console.error("Error fetching search key:", error);
            }
          };
            fetchSearchKey();
    },[searchParams]);
    useEffect(()=>{
        if(search){
            console.log({search});
            dispatch(getListOfHotel(search));
        }
    },[search,dispatch])

    console.log("new");
}

export default Listing;