"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  DateRangePicker,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";



const SearchWidget = () => {

  const currentDate = today(getLocalTimeZone());
  const [isMobile, setIsMobile] = useState(false);
  const [citySuggestion, setCitySuggestion] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [cityName, setCity] = useState("")
  const [cityId, setCityId] = useState('')
  const [destinationId, setDestinationId] = useState('')
  const [countryCode, setCountryCode] = useState("")
  const [destinationCode, setDestinationCode] = useState("")
  const [property, setProperty] = useState({})
  const [propertyId, setPropertyId] = useState('')
  const [propertySuggestion, setPropertySuggestion] = useState([])
  const [propertyName, setPropertyName] = useState("")
  const [selectedProperty, setSelectedProperty] = useState()
  const [selectedCityKey, setSelectedCityKey] = useState(null);
  const [selectedPropertyKey, setSelectedPropertyKey] = useState(null);


  const [selectedDates, setSelectedDates] = useState({
    start: currentDate,
    end: currentDate.add({ days: 2 }),
  });
  const [rooms, setRooms] = useState([
    { adults: 2, children: 0, childAges: [] },
  ]);
  const handleSubmit = () => {
    if (!selectedDates.start || !selectedDates.end) {
      alert("Please select a valid date range");
      return;
    }

    const start = selectedDates.start.toDate();
    const end = selectedDates.end.toDate();

    const formattedStart = start.toISOString().split("T")[0];
    const formattedEnd = end.toISOString().split("T")[0];
  };

  const router = useRouter()
  const dispatch = useDispatch();
  const debounceTime = useRef(null)


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const currentUrl = window.location.href;
    if (currentUrl.includes("/listing")) {
      localStorage.removeItem("prprtyName");
    }
  }, []);

  const childages = Array.from({ length: 12 }, (_, i) => ({
    key: `${i + 1}`,
    label: `${i + 1}`,
  }));

  const handleAddRoom = () => {
    if (rooms.length < MAX_ROOMS) {
      setRooms([...rooms, { adults: 2, children: 0, childAges: [] }]);
    }
  };




  const updateChildren = (index, delta) => {
    setRooms((prev) =>
      prev.map((room, i) => {
        if (i !== index) return room;
        const newCount = Math.min(
          MAX_CHILDREN,
          Math.max(0, room.children + delta)
        );
        const newAges = [...room.childAges].slice(0, newCount);
        while (newAges.length < newCount) newAges.push("");
        return { ...room, children: newCount, childAges: newAges };
      })
    );
  };

  const updateChildAge = (roomIdx, childIdx, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIdx].childAges[childIdx] = value;
    setRooms(updatedRooms);
  };
  const getPaxInfoString = () => {
    return (
      rooms
        .map((room) => {
          const adults = "A".repeat(room.adults);
          const children = "C".repeat(room.children);
          const childAges =
            room.childAges.length > 0 ? `$${room.childAges.join(",")}` : "$";
          return `${adults}${children}${childAges}`;
        })
        .join("|") + "|"
    );
  };

  const getSummary = () => {
    const totalRooms = rooms.length;
    const totalGuests = rooms.reduce(
      (sum, r) => sum + r.adults + r.children,
      0
    );

    return `${totalRooms} Room${totalRooms > 1 ? "s" : ""}, ${totalGuests} Guest${totalGuests > 1 ? "s" : ""}`;
  };



  const handleRemoveRoom = (index) => {
    const updated = [...rooms];
    updated.splice(index, 1);
    setRooms(updated);
  };

  const updateAdults = (index, delta) => {
    setRooms((prev) =>
      prev.map((room, i) =>
        i === index
          ? {
            ...room,
            adults: Math.min(MAX_ADULTS, Math.max(1, room.adults + delta)),
          }
          : room
      )
    );
  };

  const MAX_ROOMS = 4;
  const MAX_ADULTS = 4;
  const MAX_CHILDREN = 2;
  const [isOpen, setIsOpen] = React.useState(false);


  const handleDone = () => {
    setIsOpen(false);
  };


  const getCityName = useSelector((state) => state?.listing?.listingResult?.[0]?.SearchRequest?.City)
  const getCityId = useSelector((state) => state?.listing?.listingResult?.[0]?.SearchRequest?.CityId)
  const getDestinationId = useSelector((state) => state?.listing?.listingResult?.[0]?.SearchRequest?.DestinationID)
  const getDestinationCode = useSelector((state) => state?.listing?.listingResult?.[0]?.SearchRequest?.CurrencyCode)

  useEffect(() => {
    setCity(getCityName)
    setDestinationId(getDestinationId)
    setCityId(getCityId)
    setDestinationCode(getDestinationCode)
  }, [getCityName])


  const handleAutoSuggestion = async (value) => {
    const respose = await axios.get(`https://stg.myholidays.com/autosuggest/api/DestinationAutoComplete?prefix=${value}`)
    const data = respose.data;
    setCitySuggestion(data)
  }


  const handleCityInputChange = (value) => {
    setCity(value);

    if (debounceTime.current) {
      clearTimeout(debounceTime.current);
    }

    debounceTime.current = setTimeout(() => {
      if (value) {
        handleAutoSuggestion(value);
      } else if (value.length === 0) {
        setCitySuggestion([]);
      }
    }, 500);
  };



  const handleCitySuggestionSelection = (selectedKey) => {
    const city = citySuggestion.find(
      item => String(item.DestinationId) === String(selectedKey)
    );

    if (city) {
      const displayValue = `${city.CityName || city.DestinationName}, ${city.CountryName}`;

      setCity(displayValue);
      setSelectedCity(city);
      setCountryCode(city.CountryCode)
      setCityId(city.CityId)
      setDestinationId(city.DestinationId)


      // dispatch(setCityName(displayValue));
      // dispatch(setDestinationId(city.DestinationId));
      // dispatch(setCityId(city.CityId))
      // dispatch(setCountryCodes(city.CountryCode))
    }
  };

  // const finalCityName = cityName ? cityName : getCityName


  // const reduxDestinationId = useSelector((state) => state?.search?.destinationId)
  const reduxApiDestinationId = useSelector((state) => state?.listing?.listingResult?.[0]?.SearchRequest?.DestinationID)


  // const reduxCityId = useSelector((state) => state?.search?.cityId)
  const reduxApiCityId = useSelector((state) => state?.listing?.listingResult?.[0]?.SearchRequest?.CityId)


  const reduxCountryCode = useSelector((state) => state?.listing?.listingResult?.[0]?.SearchRequest?.CountryCode)



  // const finalDestinationId = reduxDestinationId ? reduxDestinationId : reduxApiDestinationId
  // const finalCityId = reduxCityId ? reduxCityId : reduxApiCityId
  // const finalCountryCode = countryCode ? countryCode : reduxCountryCode

  // dispatch(setCityName(finalCityName))
  // dispatch(setDestinationId(finalDestinationId))
  // dispatch(setCityId(finalCityId))
  // dispatch(setCountryCodes(finalCountryCode))



  const handlePropertySuggesiton = async (value) => {
    try {
      const respose = await axios.get(`https://www.myholidays.com/autosuggest/api/HotelAutoComplete?DestinationId=${destinationId}&CityId=${cityId}&prefix=${value}`)

      const data = respose?.data
      setPropertySuggestion(data)
    } catch (error) {
      console.log("error", error)
    }
  }


  const handlePropertyInputChange = (value) => {


    setPropertyName(value);
    if (debounceTime.current) {
      clearTimeout(debounceTime.current)
    }
    debounceTime.current = setTimeout(() => {
      if (value) {
        handlePropertySuggesiton(value)
      } else if (value == 0) {
        setPropertySuggestion([])
      }

    }, 500)
  }

  const handlePropertySelection = (selectedKey) => {
    const property = propertySuggestion.find(
      item => String(item.MHHotelID) === String(selectedKey)
    );

    if (property) {

      const displayPropertyData = property.HotelName
      setPropertyName(displayPropertyData)
      setPropertyId(property.MHHotelID)
      setSelectedProperty(property.MHHotelID)
      // dispatch(setPropertyNames(displayPropertyData))
      // dispatch(setHotelId(property.MHHotelID))

    }

  }



  window.onload = function () {
    if ('caches' in window) {
      caches.keys().then(function (names) {
        for (let name of names) {
          caches.delete(name);
        }
      });
    }
  };


  useEffect(() => {
    const isOnListingPage = window.location.pathname.includes("/listing") || window.location.pathname.includes("hotels/hotellist");

    if (isOnListingPage && !propertyId) {
      setPropertyName("");
      setSelectedProperty(null);
    }
  }, []);

const apiReduxPropertyName = useSelector(
  (state) => state?.details?.detailResult?.[0]?.Info?.HotelName
);

const apiReduxCityName =  useSelector(
  (state) => state?.details?.detailResult?.[0]?.Info?.City
);
const apiReduxCityId =  useSelector(
  (state) => state?.details?.detailResult?.[0]?.Info?.CityId
);
const apiReduxDestinaionId =  useSelector(
  (state) => state?.details?.detailResult?.[0]?.Info?.DestinationId
);

useEffect(() => {
  const isOnDetailPage =
    window.location.pathname.includes("/hoteldetail") ||
    window.location.pathname.includes("/hotels/hoteldetail");

  if (isOnDetailPage && apiReduxPropertyName && apiReduxCityName) {
    setPropertyName(apiReduxPropertyName);
    setCity(apiReduxCityName)
    setCityId(apiReduxCityId)
    setDestinationId(apiReduxDestinaionId)
  }
}, [apiReduxPropertyName]);


  const handleSearchBtn = async () => {

    const RoomData = rooms.length
    const paxInfo = getPaxInfoString();


    const checkInDate = selectedDates.start.toDate();
    const checkOutDate = selectedDates.end.toDate();

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    };

    const formattedCheckIn = formatDate(checkInDate);
    const formattedCheckOut = formatDate(checkOutDate);
    
  

    if (cityName && propertyName) {

     window.location.href=`/hotels/hoteldetail?hotelId=${propertyId}&nationality=IN&destinationCode=${destinationId}&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&noOfRoom=${RoomData}&paxInfo=${paxInfo}&aff=0&currency=INR&IsPromotedProperty=false&currency=INR&searchType=undefined&countryCode=${destinationCode}&utm_source=direct&utm_medium=direct`


    } else if (cityName && !propertyName) {
  

      window.location.href=`/hotels/hotellist?nationality=IN&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&noOfRoom=${RoomData}&category=hotels&currency=INR&culture=en-GB&paxInfo=${paxInfo}&country=&countryCode=${destinationCode}&cityId=${cityId}&destinationId=${destinationId}&aff=0`

    }
  }






  return (
    <div className="bg-[#174982] py-5">
      <div className="container mx-auto px-2 xl:px-0">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2">
          <Autocomplete
            inputValue={cityName}
            variant="bordered"
            isRequired
            placeholder="Enter Location"
            startContent={
              <Icon icon="mynaui:location" width="24" height="24" />
            }
            inputProps={{
              classNames: {
                inputWrapper: "bg-white h-[50px] rounded-[5px]",

              },
            }}
            selectedKey={selectedCityKey}
            onInputChange={handleCityInputChange}
            onSelectionChange={(key) => {
              setSelectedCityKey(key);
              handleCitySuggestionSelection(key);
            }}



          >

            {citySuggestion.map((item) => (
              <AutocompleteItem key={item.DestinationId}>
                {`${item?.CityName}`}
              </AutocompleteItem>
            ))}

          </Autocomplete>


          {/* for property autocomplete */}

          <Autocomplete
            inputValue={propertyName}
            variant="bordered"
            isRequired
            placeholder="Search Property"
            startContent={
              <Icon icon="mynaui:location" width="24" height="24" />
            }
            inputProps={{
              classNames: {
                inputWrapper: "bg-white h-[50px] rounded-[5px]",

              },
            }}
            selectedKey={selectedPropertyKey}
            onInputChange={handlePropertyInputChange}
            onSelectionChange={(key) => {
              setSelectedPropertyKey(key);
              handlePropertySelection(key);
            }}



          >
            {propertySuggestion.map((item) => (
              <AutocompleteItem key={item.MHHotelID}>
                {`${item?.HotelName}`}
              </AutocompleteItem>
            ))}
          </Autocomplete>

          <DateRangePicker
            className="w-full"
            selectorIcon
            value={selectedDates}
            onChange={(newRange) => {
              setSelectedDates(newRange);
              // handleChange(newRange);
            }}
            onClick={handleSubmit}
            minValue={today(getLocalTimeZone())}
            labelPlacement="outside"
            visibleMonths={isMobile ? 1 : 2}
            classNames={{
              inputWrapper:
                "min-h-[48px] rounded-[5px] border-black-500 focus-within:!border-black-600 md:border-none border border-solid border-[#707070] bg-white",
              selectorButton:
                "w-full absolute right-0 rtl:right-[8px] rtl:left-0 h-[52px] top-0 left-[8px] hover:bg-transparent data-[hover=true]:bg-transparent",
              selectorIcon:
                "absolute right-[10px] rtl:right-auto rtl:left-[10px] hidden",
              base: "relative hover:bg-transparent border-0 focus:outline-0 focus-visible:outline-0 gap-[4px]",
              calendar: "rounded-[5px]",
              cell: "!py-0",
            }}
            calendarProps={{
              classNames: {
                headerWrapper: "pt-4 bg-background",
                prevButton: "border border-default-200 rounded-small",
                nextButton: "border border-default-200 rounded-small",
                gridHeader:
                  "bg-background shadow-none border-b border-default-100",
                cellButton: [
                  "data-[today=true]:bg-default-100 data-[selected=true]:bg-[#174982]",
                  "data-[range-start=true]:before:rounded-l-small",
                  "data-[selection-start=true]:before:rounded-l-small",
                  "data-[range-end=true]:before:rounded-r-small",
                  "data-[selection-end=true]:before:rounded-r-small",
                  "data-[selection-end=true]:!bg-[#174982]",
                  "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-[#174982]",
                  "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-tl-[5px]",
                  "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-bl-[5px]",
                  "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-tr-none",
                  "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-br-none",
                  "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-tr-[5px]",
                  "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-br-[5px]",
                  "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-tl-none",
                  "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-bl-none",
                  "data-[selected=true]:data-[range-selection=true]:text-black",
                  "data-[selected=true]:data-[range-selection=true]:bg-[#17498240]",
                  "data-[selected=true]:data-[range-selection=true]:rounded-none",
                ],
              },
            }}
            startContent={
              <Icon
                icon="solar:calendar-outline"
                width="35"
                height="35"
                className="text-[#000000]"
              />
            }
          />

          <div className="w-full">

            <Popover
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              disableAnimation
              offset={20}
              placement="bottom"
              classNames={{
                base: "w-[270px]",
              }}

            >
              <PopoverTrigger startContent={<Icon icon="fa-solid:users" width="25" height="25" />}>
                <Button className="w-full rounded-[5px] min-h-[48px] md:border-none border-1 border-solid border-[#000000] bg-white md:bg-[#f4f4f5] justify-start">
                  {getSummary()}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2 w-full">
                  {rooms.map((room, index) => (
                    <div
                      key={index}
                      className="mb-4 border-b pb-3 border-[#dddddd]"
                    >
                      <h5 className="text-[14px] font-semibold mb-2">
                        Room {index + 1}
                      </h5>
                      <div className="flex justify-between mb-2">
                        <div>
                          <h5 className="text-[12px] font-semibold text-black">
                            Adult
                            <span className="block font-normal text-[10px]">
                              (12+ years)
                            </span>
                          </h5>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon
                            icon="meteor-icons:minus"
                            onClick={() => updateAdults(index, -1)}
                            className="cursor-pointer w-[25px] bg-[#f5f5f5] h-[25px] text-[#00575e]"
                          />
                          <span className="w-[20px] text-center">
                            {room.adults}
                          </span>
                          <Icon
                            icon="meteor-icons:plus"
                            onClick={() => updateAdults(index, 1)}
                            className="cursor-pointer w-[25px] bg-[#f5f5f5] h-[25px] text-[#00575e]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <h5 className="text-[12px] font-semibold text-black">
                            Child
                            <span className="block font-normal text-[10px]">
                              (0–12 years)
                            </span>
                          </h5>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon
                            icon="meteor-icons:minus"
                            onClick={() => updateChildren(index, -1)}
                            className="cursor-pointer w-[25px] bg-[#f5f5f5] h-[25px] text-[#00575e]"
                          />
                          <span className="w-[20px] text-center">
                            {room.children}
                          </span>
                          <Icon
                            icon="meteor-icons:plus"
                            onClick={() => updateChildren(index, 1)}
                            className="cursor-pointer w-[25px] bg-[#f5f5f5] h-[25px] text-[#00575e]"
                          />
                        </div>
                      </div>

                      {room.children > 0 && (
                        <div className="mt-3">
                          <h5 className="text-[12px] font-semibold text-black">
                            Age of Children
                          </h5>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {room.childAges.map((age, childIdx) => (
                              <Select
                                key={`${index}-${childIdx}`}
                                placeholder="Select Age"
                                className="w-full text-[14px]"
                                classNames={{
                                  trigger:
                                    "min-h-[30px] border-1 border-solid border-[#dddddd] rounded-[5px]",
                                }}
                                selectedKeys={age ? [age] : []}
                                onSelectionChange={(e) =>
                                  updateChildAge(
                                    index,
                                    childIdx,
                                    Array.from(e)[0]
                                  )
                                }
                              >
                                {childages.map((childage) => (
                                  <SelectItem key={childage.key}>
                                    {childage.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            ))}
                          </div>
                        </div>
                      )}

                      {rooms.length > 1 && (
                        <Button
                          onPress={() => handleRemoveRoom(index)}
                          className="bg-transparent text-[#b81a52] text-[12px] p-0 h-[30px] mt-3 rounded-[5px] font-semibold"
                        >
                          Remove Room
                        </Button>
                      )}
                    </div>
                  ))}

                  <div className="flex justify-between gap-2 mt-3">
                    <Button
                      onPress={handleAddRoom}
                      disabled={rooms.length >= MAX_ROOMS}
                      className="bg-[#00575e] text-white text-[12px] px-3 h-[30px] rounded-[5px] font-semibold"
                    >
                      Add Room
                    </Button>
                    <Button
                      onPress={handleDone}
                      className="bg-[#dddddd] text-black text-[12px] px-3 h-[30px] rounded-[5px] font-semibold"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button className="h-[50px] bg-[#e41b23] w-[450px] rounded-[5px] text-[#ffffff] text-[16px] font-semibold"
            onPress={handleSearchBtn}
          >Modify Search</Button>
        </div>
      </div>
    </div>
  );
};
export default SearchWidget;
