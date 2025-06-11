
import React, { useEffect, useState } from 'react';




// Custom hook
export const useFilter = () => {



  const [filter, setFilter] = useState({
    PageNumber: 1,
    SearchKey: "",
    HotelName: "",
    SortByPrice: "",
    PriceRange: "",
    StarRating: [],
    paymnetMode:[],
    Meal: [],
    Amenities: [],
    NearByArea: [],
    AccommodationType: [],
    PetFriendly: false,
    Currency: "INR",
    Suppliers: "",
    Affiliate: 0,
    utm_source: "",
    utm_medium: "",
    run:false,
    Currency:"INR"
  });

  



   

 

  return [filter, setFilter];
};
