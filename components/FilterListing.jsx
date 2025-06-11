"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Slider, Checkbox, Button, dropdown } from "@heroui/react";
import { Icon } from "@iconify/react";
import {useFilter} from "../hooks/FilterHooks"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {setListofHotel} from "../redux/slices/citySlice"







const FilterListing = () => {
  const dropdownRef = useRef(null);
  const [value, setValue] = React.useState([100, 300]);
  const [isDropdown, setIsDropdown] = useState("null");
  const [isMobile, setIsMobile] = useState(false);
  const [filter, setFilter] = useFilter()
  const [lowPrice, setLowPrice] = useState(0);
   const [minValue, setMinValue] = useState(0); // min value of the slider
  const [maxValue, setMaxValue] = useState(1000); 

  // fetching state from redux store
  const state = useSelector((state) => state?.listing);
  const filterData = useSelector(
    (state) => state?.listing?.listingResult[0]?.Filter
  );


   const searchId = useSelector(
    (state) => state?.listing?.listingResult[0]?.SearchId
  );
  const utm = useSelector((state) => state.utm);
  const storeCurrency = useSelector((state) => state?.listing?.currency);

   const dispatch = useDispatch();

  // for search id  changes in listing
  useEffect(() => {
    if (searchId) {
      setFilter((prev) => ({
        ...prev,
        SearchKey: searchId,
      }));
    }
  }, [searchId]);

  // for global currecy change in listing

  useEffect(() => {
    if (storeCurrency) {
      setFilter((prev) => ({
        ...prev,
        Currency: storeCurrency,
      }));
    }
  }, [storeCurrency]);


   // join the string with ,
  function join(arr) {
    return arr.join(",");
  }
  const { listing } = useSelector((state) => state);

  // filter Api code
  const filterApi = async () => {
    try {
      // const pageNumber = listing?.pageNumber || 1;
      // filter.pageNumber = pageNumber;
      // dispatch(setFilterState(filter));
      const ApiUrl = `https://prodapi.myholidays.com/hotelsearch//api/search/HotelFilter?PageNumber=${filter.pageNumber ||1}&SearchKey=${filter.SearchKey}&HotelName=${filter.HotelName}&SortByPrice=${filter.SortByPrice}&SortByDistance=&SortByRating=&SortByPopularity=&PriceRange=${minValue}-${maxValue}&StarRating=${join(filter.StarRating)}&Meal=${join(filter.Meal)}&Amenities=${join(filter.Amenities)}&NearByArea=${join(filter.NearByArea)}&AccommodationType=${join(filter.AccommodationType)}&PetFriendly=&AllergicFriendly=&Currency=${filter.Currency}&Suppliers=&Affiliate=0&${utm.queryParam}`;

      const response = await axios.get(ApiUrl);
      const result = await response.data.ListOfHotels;
      const resultCount = await response.data.ResultCount;

      console.log({ result: result });

      if (result) {
        dispatch(setListofHotel(result));
        // dispatch(setResultCount(resultCount));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useeffect for filter api call in changes in filter
  useEffect(() => {
    if (filter.run || filter.Currency) {
      filterApi();
    }
  }, [filter]);

  useEffect(() => {
  filterApi();
}, [filter, value]);









  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1025);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);




  // Click outside handler only for desktop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdown(true);
      }
    };

    if (!isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (!isMobile) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [isMobile]);



 






  const handleFilterDropdown = (dropdownName) => {
    if (isMobile) {
      // On mobile, do nothing to keep dropdown always open
      return;
    }
    setIsDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };


   //***************************filter handle input work***************** */

   useEffect(() => {
    if (state.listofHotel.length > 1) {
      const price = state.listofHotel.map((item) => item.LowestPriceOriginal);
      setLowPrice(Math.min(...price));
    }
  }, [state]);

  // Memoize each filter section
  const propertyTypes = useMemo(
    () => filterData?.AccomodationTypes || [],
    [filterData]
  );
  const starRatings = useMemo(
    () => filterData?.StarRatings || [],
    [filterData]
  );
  const paymentModes = useMemo(
    () => filterData?.PaymentModes || [],
    [filterData]
  );
  const meals = useMemo(() => filterData?.Meals || [], [filterData]);
  const amenities = useMemo(() => filterData?.Amenities || [], [filterData]);
  const nearBy = useMemo(() => filterData?.NearBy || [], [filterData]);

  //.......................................handle filter state by function....................................//

const handleCheckBoxPropertyType = (e) => {
    const { name, checked } = e.target;

    setFilter((prevFilter) => {
      const updated = checked
        ? [...prevFilter.AccommodationType, name]
        : prevFilter.AccommodationType.filter((item) => item !== name);

      return {
        ...prevFilter,
        AccommodationType: updated,
        run: true,
      };
    });
  };
   const handleCheckStarRating = (e) => {
    e.preventDefault();

    const { name, checked } = e.target;

    if (checked) {
      setFilter((prev) => {
        const updateStar = {
          ...prev,
          StarRating: [...prev.StarRating, name],
          run: true,
        };

        console.log(updateStar);
        return updateStar;
      });
    } else {
      setFilter((prev) => {
        const updateStar = {
          ...prev,
          StarRating: prev.StarRating.filter((item) => item !== name),
          run: true,
        };

        console.log(updateStar);
        return updateStar;
      });
    }
  };

   const handleCheckAmenties = (e) => {
    e.preventDefault();

    const { name, checked } = e.target;

    if (checked) {
      setFilter((prev) => {
        const updateStar = {
          ...prev,
          Amenities: [...prev.Amenities, name],
          run: true,
        };

        console.log(updateStar);
        return updateStar;
      });
    } else {
      setFilter((prev) => {
        const updateStar = {
          ...prev,
          Amenities: prev.Amenities.filter((item) => item !== name),
          run: true,
        };

        console.log(updateStar);
        return updateStar;
      });
    }
  };

  const handleCheckPayment = (e) => {
    e.preventDefault();

    const { name, checked } = e.target;

    if (checked) {
      setFilter((prev) => {
        const updatePayment = {
          ...prev,
          paymnetMode: [...prev.paymnetMode, name],
          run: true,
        };

        console.log(updatePayment);
        return updatePayment;
      });
    } else {
      setFilter((prev) => {
        const updatePayment = {
          ...prev,
          paymnetMode: prev.paymnetMode.filter((item) => item !== name),
          run: true,
        };

        console.log(updatePayment);
        return updatePayment;
      });
    }
  };

  const handleMealBox = (e) => {
    e.preventDefault();

    const { name, checked } = e.target;

    if (checked) {
      setFilter((prev) => {
        const updateMeal = {
          ...prev,
          Meal: [...prev.Meal, name],
          run: true,
        };

        console.log(updateMeal);
        return updateMeal;
      });
    } else {
      setFilter((prev) => {
        const updateMeal = {
          ...prev,
          Meal: prev.Meal.filter((item) => item !== name),
          run: true,
        };

        console.log(updateMeal);
        return updateMeal;
      });
    }
  };

  const handleNearyBy = (e) => {
    e.preventDefault();

    const { name, checked } = e.target;

    if (checked) {
      setFilter((prev) => {
        const updateNearByArea = {
          ...prev,
          NearByArea: [...prev.NearByArea, name],
          run: true,
        };

        console.log(updateNearByArea);
        return updateNearByArea;
      });
    } else {
      setFilter((prev) => {
        const updateNearByArea = {
          ...prev,
          NearByArea: prev.NearByArea.filter((item) => item !== name),
          run: true,
        };

        console.log(updateNearByArea);
        return updateNearByArea;
      });
    }
  };

  const handleSortOrderChange = (e) => {
    const { value } = e.target;

    setFilter((prev) => {
      const updated = {
        ...prev,
        SortByPrice: value,
        run: true,
      };

      console.log("Updated Sort Order:", updated);
      return updated;
    });
  };
  
  //..........................................End.................................................//

  //clear buttons logic
  const handleClearSort = () => {
    setFilter((prev) => ({
      ...prev,
      SortByPrice: "",
      run: true,
    }));
  };

  const handleClearPropertyTypes = () => {
    setFilter((prev) => ({
      ...prev,
      AccommodationType: [],
      run: true,
    }));
  };

  const handleClearStarRating = () => {
    setFilter((prev) => ({
      ...prev,
      StarRating: [],
      run: true,
    }));
  };

  const handleClearPaymentMode = () => {
    setFilter((prev) => ({
      ...prev,
      paymnetMode: [],
      run: true,
    }));
  };

  const handleClearMeal = () => {
    setFilter((prev) => ({
      ...prev,
      Meal: [],
      run: true,
    }));
  };

  const handleClearAmenities = () => {
    setFilter((prev) => ({
      ...prev,
      Amenities: [],
      run: true,
    }));
  };

  const handleClearNearByArea = () => {
    setFilter((prev) => ({
      ...prev,
      NearByArea: [],
      run: true,
    }));
  };
  const clearALlFilters = (e) => {
    setFilter(() => ({
      PageNumber: 1,
      SearchKey: searchId,
      HotelName: "",
      SortByPrice: "",
      PriceRange: "",
      StarRating: [],
      paymnetMode: [],
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
      run: true,
      Currency: "INR",
    }));
  };








  return (
    <section className="bg-[#f5f5f5] py-[30px]">
      <div className="container mx-auto px-2 xl:px-0">
        <div
          className="grid grid-cols-1 xl:grid-cols-8 gap-0 relative"
          ref={dropdownRef}
        >
          <div className="px-2">
            <Slider
              className="max-w-md"
              formatOptions={{ style: "currency", currency: "INR" }}
              label={
                <span className="text-[14px] font-semibold text-black">
                  Price
                </span>
              }
              maxValue={maxValue}
              minValue={minValue}
              step={10}
              value={value}
              onChange={setValue}
              classNames={{
                filler: "bg-[#174982]",
                thumb: "border-1 border-solid border-[#174982] bg-white",
              }}
            />
          </div>
          <div
            onClick={() => handleFilterDropdown("dropdown1")}
            className="flex flex-col px-2  relative cursor-pointer border-l-0 xl:border-l-1 border-solid border-[#e0e0e0] my-2 xl:my-0"
          >
            <h5 className="text-[14px] font-semibold text-black">
              Star Raitng
            </h5>
            <p className="text-[12px] font-normal text-black">Select Raiting</p>
            <Icon
              icon="prime:angle-down"
              className="absolute top-0 right-0 hidden xl:block"
              width="24"
              height="24"
            />
            {(isMobile || isDropdown === "dropdown1") && (
              <div className="static xl:absolute  top-[50px] left-0 bg-white px-2 py-5 shadow w-full xl:w-[250px] mt-2 xl:mt-0 z-[99] ">
                <div className="flex flex-col items-center gap-2">
                {starRatings && starRatings.map((data) =>(<div className="flex justify-between w-full">
                  <Checkbox
                  id={data.Rating}
                  name={data.Rating}
                  value={data.Rating}
                   onChange={handleCheckStarRating}
                  >
                    {data.Rating} 
                    
                  </Checkbox>{" "}
                  <span className="text-[14px] text-[#666666]">1</span>
                </div>))}
                
                  <div className="flex justify-end w-full">
                    <Button className="bg-transparent text-danger justify-end border-1 p-0 border-none">
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            onClick={() => handleFilterDropdown("dropdown2")}
            className="flex flex-col px-2  relative cursor-pointer border-l-0 xl:border-l-1 border-solid border-[#e0e0e0] mb-2 xl:mb-0"
          >
            <h5 className="text-[14px] font-semibold text-black">Meal</h5>
            <p className="text-[12px] font-normal text-black">Select Meal</p>
            <Icon
              icon="prime:angle-down"
              className="absolute top-0 right-0 hidden xl:block"
              width="24"
              height="24"
            />
            {(isMobile || isDropdown === "dropdown2") && (
              <div className="static xl:absolute  top-[50px] left-0 bg-white px-2 py-5 shadow w-full xl:w-[250px] mt-2 xl:mt-0  z-[9]">
                <div className="flex flex-col items-center gap-2">
                  {meals && meals.map((data,i) => (<div className="flex justify-between w-full" key={i}>
                    <Checkbox
                    key={i}
                    name={data.Value}
                    id={data.Value}
                    value={data.Value}
                    onChange={handleMealBox}
                    >{data.Value} </Checkbox>{" "}
                    {/* <span className="text-[14px] text-[#666666]">1</span> */}
                  </div>
                ))}

                  <div className="flex justify-end w-full">
                    <Button className="bg-transparent text-danger justify-end border-1 p-0 border-none">
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            onClick={() => handleFilterDropdown("dropdown3")}
            className="flex flex-col px-2  relative cursor-pointer border-l-0 xl:border-l-1 border-solid border-[#e0e0e0] mb-2 xl:mb-0"
          >
            <h5 className="text-[14px] font-semibold text-black">Amenities</h5>
            <p className="text-[12px] font-normal text-black">
              Select Amenities
            </p>
            <Icon
              icon="prime:angle-down"
              className="absolute top-0 right-0 hidden xl:block"
              width="24"
              height="24"
            />
            {(isMobile || isDropdown === "dropdown3") && (
              <div className="static xl:absolute  top-[50px] left-0 bg-white px-2 py-5 shadow w-full xl:w-[250px] mt-2 xl:mt-0 z-[99] ">
                <div className="flex flex-col items-center gap-2">
                  {amenities && amenities.map((data,i) =>(<div className="flex justify-between w-full" key={i}>
                    <Checkbox
                    key={i}
                    name={data.Value}
                    id={data.Value}
                    value={data.Value}
                    onChange={handleMealBox}
                >{data.value}</Checkbox>{" "}
                    {/* <span className="text-[14px] text-[#666666]">1</span> */}
                  </div>))}
               
                  <div className="flex justify-end w-full">
                    <Button className="bg-transparent text-danger justify-end border-1 p-0 border-none">
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            onClick={() => handleFilterDropdown("dropdown4")}
            className="flex flex-col px-2   cursor-pointer border-l-0 xl:border-l-1 border-solid border-[#e0e0e0] mb-2 xl:mb-0"
          >
            <div className="relative">
              <h5 className="text-[14px] font-semibold text-black">Nearby</h5>
              <p className="text-[12px] font-normal text-black">
                Select Near By Hotel
              </p>
              <Icon
                icon="prime:angle-down"
                className="absolute top-0 right-0 hidden xl:block"
                width="24"
                height="24"
              />
            </div>
            {(isMobile || isDropdown === "dropdown4") && (
              <div className="static xl:absolute  top-[50px] left-0 right-0   bg-white px-2 py-5 shadow w-full mt-2 xl:mt-0  z-[99]">
                <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-2 xl:gap-5">
                  {nearBy && nearBy.map((data,i) => (<div className="flex gap-2 w-full" key={i}>
                    <Checkbox
                     key={i}
                     name={data.Value}
                     id={data.Value}
                      value={data.Value}
                     onChange={handleNearyBy}
                    >{data.Value}</Checkbox>{" "}
                    {/* <span className="text-[14px] text-[#666666]">(1)</span> */}
                  </div>))}

                  {/* <div className="flex gap-2 w-full">
                    <Checkbox>Near Qatar National Museum</Checkbox>{" "}
                    <span className="text-[14px] text-[#666666]">(1)</span>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Checkbox>Diplomatic Area</Checkbox>{" "}
                    <span className="text-[14px] text-[#666666]">(1)</span>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Checkbox>Near Grand Hamad Street</Checkbox>{" "}
                    <span className="text-[14px] text-[#666666]">(1)</span>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Checkbox>Near City Centre Shopping Mall</Checkbox>{" "}
                    <span className="text-[14px] text-[#666666]">(1)</span>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Checkbox>Near The Gate Mall</Checkbox>{" "}
                    <span className="text-[14px] text-[#666666]">(1)</span>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Checkbox>Near Fire Station Art Gallery</Checkbox>{" "}
                    <span className="text-[14px] text-[#666666]">(1)</span>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Checkbox>Hotel</Checkbox>{" "}
                    <span className="text-[14px] text-[#666666]">(1)</span>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Checkbox>Near Falcon Souq</Checkbox>{" "}
                    <span className="text-[14px] text-[#666666]">(1)</span>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Checkbox>Near Sports City</Checkbox>{" "}
                    <span className="text-[14px] text-[#666666]">(1)</span>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Checkbox>Near Katara Cultural Village</Checkbox>{" "}
                    <span className="text-[14px] text-[#666666]">(1)</span>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Checkbox>Near Katara Beach</Checkbox>{" "}
                    <span className="text-[14px] text-[#666666]">(1)</span>
                  </div> */}
                </div>
                <div className="flex justify-end w-full">
                  <Button className="bg-transparent text-danger justify-end border-1 p-0 border-none">
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div
            onClick={() => handleFilterDropdown("dropdown5")}
            className="flex flex-col px-2  relative cursor-pointer border-l-0 xl:border-l-1 border-solid border-[#e0e0e0] mb-2 xl:mb-0"
          >
            <h5 className="text-[14px] font-semibold text-black">
              Accomodation Type
            </h5>
            <p className="text-[12px] font-normal text-black">
              Select Accomodation
            </p>
            <Icon
              icon="prime:angle-down"
              className="absolute top-0 right-0 hidden xl:block"
              width="24"
              height="24"
            />
            {(isMobile || isDropdown === "dropdown5") && (
              <div className="static xl:absolute  top-[50px] left-0 bg-white px-2 py-5 shadow w-full xl:w-[250px] mt-2 xl:mt-0 z-[99] ">
                <div className="flex flex-col items-center gap-2">
                  {propertyTypes && propertyTypes.map((data) => (<div className="flex justify-between w-full">
                    <Checkbox
                    name={data.Value}
                    id={data.Value}
                    onChange={handleCheckBoxPropertyType}
                    value={data.Value}
                    checked={filter.AccommodationType.includes(data.Value)}
                    >{data.Value}
                    </Checkbox>{" "}
                    {/* <span className="text-[14px] text-[#666666]">1</span> */}
                  </div>))}
                  {/* <div className="flex justify-between w-full">
                    <Checkbox>Apratment </Checkbox>{" "}
                    <span className="text-[14px] text-[#666666]">1</span>
                  </div> */}

                  <div className="flex justify-end w-full">
                    <Button className="bg-transparent text-danger justify-end border-1 p-0 border-none">
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            onClick={() => {
              handleFilterDropdown("dropdown6");
            }}
            className="flex flex-col px-2  relative cursor-pointer border-l-0 xl:border-l-1 border-solid border-[#e0e0e0] mb-2 xl:mb-0"
          >
            <h5 className="text-[14px] font-semibold text-black">
              Payment Type
            </h5>
            <p className="text-[12px] font-normal text-black">Select Payment</p>
            <Icon
              icon="prime:angle-down"
              className="absolute top-0 right-0 hidden xl:block"
              width="24"
              height="24"
            />
            {(isMobile || isDropdown === "dropdown6") && (
              <div className="static xl:absolute  top-[50px] left-0 bg-white p-2 shadow w-full xl:w-[250px] mt-2 xl:mt-0 z-[9]">
                <div className="flex flex-col items-center gap-2" >
                  {paymentModes && paymentModes.map((data,i) => (<div className="flex justify-between w-full" key={i}>
                    <Checkbox
                    value={data.Mode}
                     id={data.Mode}
                    name={data.Mode}
                    onChange={handleCheckPayment}
                  
              
                    >{data.Mode}</Checkbox>{" "}
                    {/* <span className="text-[14px] text-[#666666]">1</span> */}
                  </div>))}

                  <div className="flex justify-end w-full">
                    <Button className="bg-transparent text-danger justify-end border-1 p-0 border-none">
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            onClick={() => {
              handleFilterDropdown("dropdown7");
            }}
            className="flex flex-col px-2  relative cursor-pointer border-l-0 xl:border-l-1 border-solid border-[#e0e0e0] mb-2 xl:mb-0"
          >
            <h5 className="text-[14px] font-semibold text-black">
              More Option
            </h5>
            <p className="text-[12px] font-normal text-black">All</p>
            <Icon
              icon="prime:angle-down"
              className="absolute top-0 right-0 hidden xl:block"
              width="24"
              height="24"
            />
            {(isMobile || isDropdown === "dropdown7") && (
              <div className="static xl:absolute top-[50px] left-0 bg-white px-2 py-5 shadow w-full xl:w-[250px] mt-2 xl:mt-0 z-[99] ">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex justify-between w-full">
                    <Checkbox>Pet Friendly</Checkbox>{" "}
                    <span className="text-[14px] text-[#666666]">1</span>
                  </div>

                  <div className="flex justify-end w-full">
                    <Button className="bg-transparent text-danger justify-end border-1 p-0 border-none">
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterListing;
