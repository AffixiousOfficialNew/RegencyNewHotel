"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInfo, getRoomDetails } from "../redux/slices/detailSlice";
import SearchWidget from "./SearchWidget";
import BannerDetails from "./detail/BannerDetails";
import BannerContentDetails from "./detail/BannerContentDetails";
import HotelDetailsResult from "./detail/HotelDetailsResult";



const Details = () =>{
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const [hotelId, setHotelId] = useState();
    const [search,setsearch] = useState("");
     const globalCurrency = useSelector((state) => state.listing.currency)


    useEffect(()=>{
        const fetchSearchKey = async ()=>{
            try {
                const nationality = searchParams.get('nationality') || 'IN';
                const checkIn = searchParams.get('checkIn') || '10 May 2025';
                const checkOut = searchParams.get('checkOut') || '12 May 2025';
                const noOfRoom = searchParams.get('noOfRoom') || '1';
                const paxInfo = searchParams.get('paxInfo') || '';
                const aff = searchParams.get('aff') || '0';
                const hotelId = searchParams.get('hotelId')|| '';
                setHotelId(hotelId)
                const countryCode = searchParams.get('countryCode') || '';
                const currency = searchParams.get('currency') || '';
                const cityId = searchParams.get('cityId') || 1;
                const desId = searchParams.get('destinationId') || 0;
                // console.log({nationality,checkIn,checkOut,noOfRoom,countryCode,paxInfo,currency,cityId,desId});
                const API_URL = `https://stg.myholidays.com/hotelsearchtest//api/search/RoomAsyncV2?SearchKey=&nationality=${nationality}&destinationCode=${desId}&checkIn=${checkIn}&checkOut=${checkOut}&noOfRoom=${noOfRoom}&paxInfo=${paxInfo}&searchType=Direct&Affiliate=304&hotelId=${hotelId}&countryCode=${countryCode}&deviceType=Desktop&cultureID=en-GB&currency=${globalCurrency}&source=Direct&CustomerID=0&CustomerTypeID=0`
                const response = await axios.get(API_URL);
                const key = response?.data?.SearchKey;
                if(key){
                    setsearch(key);
                } else {
                    console.error('no serach key found in api response');
                }
            } catch (error) {
                console.error("error in fetching search key",error)
                
            }
        }
        fetchSearchKey();
    },[]);
    useEffect(()=>{
        if(search && hotelId){
            console.log({search,hotelId});
            dispatch(getRoomDetails({search,hotelId}))
        }
        if(hotelId){
            console.log({hotelId});
            dispatch(getInfo(hotelId))
        }
    },[search,hotelId,dispatch])
    return(
        <section className="md:pb-0 pb-[100px]">

           <SearchWidget/>
           <div className="container mx-auto px-4 md:px-0">
           <div className="grid grid-cols-1 md:grid-cols-3 w-full py-5 gap-5">
            <div className="col-span-2">
            <BannerDetails/>
            </div>
            <div>
            <BannerContentDetails/>
            </div>
            </div>
           </div>
           <HotelDetailsResult/>
        </section>
    )
}
export default Details;