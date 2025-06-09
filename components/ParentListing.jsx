"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { getListOfHotel } from "../redux/slices/citySlice";
import HotelListing from "./listing/HotelListing";
import SearchWidget from "./SearchWidget";
import FilterListing from "./FilterListing";
import PriceCurrencyFilter from "../components/PriceCurrencyFilter";
import MapFilter from "../components/listing/MapFilter";
import { Icon } from "@iconify/react";

const Listing = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [isFilter, setFilter] = useState(false);
  const [isSearchWidget, setSearchWidget] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const lat = parseFloat(selectedHotel?.Latitude);
  const lng = parseFloat(selectedHotel?.Longitude);

    useEffect(() => {
  console.log("Selected hotel changed:", selectedHotel);
}, [selectedHotel]);

  useEffect(() => {
    const fetchSearchKey = async () => {
      try {
        const nationality = searchParams.get("nationality") || "IN";
        const checkIn = searchParams.get("checkIn") || "10 May 2025";
        const checkOut = searchParams.get("checkOut") || "12 May 2025";
        const noOfRoom = searchParams.get("noOfRoom") || "1";
        const paxInfo = searchParams.get("paxInfo") || "";
        const countryCode = searchParams.get("countryCode") || "";
        const currency = searchParams.get("currency") || "";
        const cityId = searchParams.get("cityId") || 1;
        const desId = searchParams.get("destinationId") || 0;

        const API_URL = `https://prodapi.myholidays.com/hotelsearch/api/search/Hotel?nationality=${nationality}&residence=IN&destinationCode=&checkIn=${checkIn}&checkOut=${checkOut}&noOfRoom=${noOfRoom}&paxInfo=${paxInfo}&searchType=Direct&Affiliate=304&hotelId=&countryCode=${countryCode}&aSearch=&maxSR=0&deviceType=Desktop&cultureID=en-GB&airportCode=&Latitude=&Longitude=&Currency=${currency}&source=Direct&sort=pricing-asc&IsPromotedProperty=false&CustomerID=0&CustomerTypeID=0&UserID=0&CityId=${cityId}&DestinationId=${desId}`;

        const response = await axios.get(API_URL);
        const key = response.data?.SearchRequest?.HotelSearchKey;
        if (key) setSearch(key);
      } catch (error) {
        console.error("Error fetching search key:", error);
      }
    };

    fetchSearchKey();
  }, [searchParams]);

  useEffect(() => {
    if (search) dispatch(getListOfHotel(search));
  }, [search, dispatch]);



  return (
    <section>
      {/* Search and Filter Widgets */}
      <div className={`fixed md:static top-0 z-[9999] bg-[#174982] pt-[20px] w-full h-[100vh] md:h-auto ${isSearchWidget ? "block" : "hidden md:block"}`}>
        <div className="flex justify-end md:hidden">
          <Icon icon="material-symbols-light:close" width="40" height="40" className="text-white" onClick={() => setSearchWidget(false)} />
        </div>
        <SearchWidget />
      </div>

      <div className={`bg-[#f5f5f5] xl:static fixed left-0 top-0 h-[100vh] xl:h-auto w-full md:w-[320px] xl:w-full z-[999] overflow-y-auto xl:overflow-visible ${isFilter ? "block" : "hidden xl:block"}`}>
        <div className="flex justify-end xl:hidden">
          <Icon icon="material-symbols-light:close" width="40" height="40" className="text-black" onClick={() => setFilter(false)} />
        </div>
        <FilterListing />
      </div>

      {/* Header bar */}
      <div className="flex gap-2 items-center bg-[#174982]">
        <div className="pl-2 hidden md:block xl:hidden" onClick={() => setFilter(true)}>
          <Icon icon="f7:slider-horizontal-3" className="text-white" width="40" height="40" />
        </div>
        <div className="w-full">
          <PriceCurrencyFilter />
        </div>
      </div>

      {/* Grid Layout */}
      <div className="w-full grid grid-cols-3 gap-2 py-5">
        <div className="col-span-3 xl:col-span-2">
          <HotelListing setSelectedHotel={setSelectedHotel} />
        </div>
        <div className="col-span-1 relative hidden xl:block">
          <MapFilter selectedHotel={selectedHotel} latitude={lat} longitude={lng} />
        </div>
      </div>

      {/* Bottom Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white z-[99] flex md:hidden">
        <Button onClick={() => setFilter(true)} className="w-full h-[50px] rounded-none bg-[#d90e16] text-white text-[18px] font-normal flex items-center">
          <Icon icon="f7:slider-horizontal-3" className="text-white" width="40" height="40" /> Filter
        </Button>
        <Button onClick={() => setSearchWidget(true)} className="w-full h-[50px] rounded-none bg-[#d90e16] text-white text-[18px] font-normal border-l-1 border-solid border-[#ffffff] flex items-center">
          <Icon icon="basil:edit-outline" className="text-white" width="40" height="40" /> Modify Search
        </Button>
      </div>
    </section>
  );
};

export default Listing;
