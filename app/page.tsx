import React from "react";
import HotelListing from "../components/listing/HotelListing";
import MapFilter from "../components/listing/MapFilter";
export default function Home() {
  
  return (
    <section >
     <div className="grid grid-cols-3 gap-2">
      <div className="col-span-2">
        <HotelListing/>
        </div>
        <MapFilter/>




     </div>


    
    </section>
  );
}
