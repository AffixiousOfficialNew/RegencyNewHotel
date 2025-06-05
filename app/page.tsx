import React from "react";
import HotelListing from "../components/listing/HotelListing";
import MapFilter from "../components/listing/MapFilter";
import SearchWidget from "../components/SearchWidget";
import FilterListing from "../components/FilterListing";
export default function Home() {
  
  return (
    <section>
    <SearchWidget/>
    <FilterListing/>
     <div className="grid grid-cols-3 gap-2">
      <div className="col-span-2">
        <HotelListing/>
        </div>
        <MapFilter/>




     </div>


    
    </section>
  );
}
