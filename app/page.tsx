"use client"
import React from "react";
import HotelListing from "../components/listing/HotelListing";
import MapFilter from "../components/listing/MapFilter";
import { useTranslations } from "next-intl";
export default function Home() {
 const t = useTranslations();
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
