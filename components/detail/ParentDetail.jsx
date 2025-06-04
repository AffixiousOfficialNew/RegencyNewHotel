"use client"
import React, { useEffect, useState } from "react";
// import DetailsBanner from './DetailsBanner';
// import DynamicDetail from "./DynamicDetail";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams  } from "next/navigation";
import axios from "axios";
import { getInfo, getRoomDetails } from "../../redux/slices/detailSlice";

const Details = () => {
    const dispatch = useDispatch();    
    const globalCurrency = useSelector((state) => state.listing.currency)
  const searchParams = useSearchParams ();
    const [hotelId,setHotelId] = useState();
    const [search, setSearch] = useState('');
    useEffect(()=>{
        const fetchSearchKey = async () =>{
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
                const API_URL = `https://stg.myholidays.com/hotelsearchtest//api/search/RoomAsyncV2?SearchKey=&nationality=${nationality}&destinationCode=${desId}&checkIn=${checkIn}&checkOut=${checkOut}&noOfRoom=${noOfRoom}&paxInfo=${paxInfo}&searchType=Direct&Affiliate=${aff}&hotelId=${hotelId}&countryCode=${countryCode}&deviceType=Desktop&cultureID=en-GB&currency=${globalCurrency}&source=Direct&CustomerID=0&CustomerTypeID=0`
                const response = await axios.get(API_URL);
                const key = response?.data?.SearchKey;
                if(key){
                    setSearch(key);
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
            console.log('Dispatching room details with serach key:',search,hotelId);

            dispatch(getRoomDetails({search,hotelId}))
        }
        
        if(hotelId){
            console.log("Dispatching Info with hotelId:",hotelId);
            dispatch(getInfo(hotelId));
        }
    },[search, hotelId, dispatch])


  
return(
    <section className="md:pb-0 pb-[100px]">
        {/* <DetailsBanner/>
        <DynamicDetail/> */}
        
    </section>
)
}
export default Details;