"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { getListOfHotel } from "../../redux/slices/citySlice";
import { useDispatch } from "react-redux";



const listing = () => {
    const searchParams = useSearchParams();
    const [search,setSearch] = useState("");
    const [data,setdata] = useState();
    const dispatch = useDispatch();
    // console.log({dispatch});



    useEffect(() =>{
        const fetchKey = async () => {
          try {
            // debugger;
            console.log({aa:searchParams.get('destinationCode')});
            const dest = searchParams.get('destinationCode') 
            const nationality = searchParams.get('nationality') || 'IN';
            const checkIn = searchParams.get('checkIn') || '10 Sep 2025';
            const checkOut = searchParams.get('checkOut') || '12 Sep 2025';
            const noOfRoom = searchParams.get('noOfRoom') || '1';
            const paxInfo = searchParams.get('paxInfo') || '';
            // const Affiliate = searchParams.get('Affiliate') || '0';
            const countryCode = searchParams.get('countryCode') || '';
            const currency = searchParams.get('currency') || '';
            const cityId = searchParams.get('cityId') || 4629;
            const desId = searchParams.get('destinationId') || 352;
            console.log({nationality,checkIn,checkOut,noOfRoom,countryCode,paxInfo,currency,cityId,desId,dest});
            const API_URL =
              `https://prodapi.myholidays.com/hotelsearch/api/search/Hotel?nationality=${nationality}&residence=IN&destinationCode=&checkIn=${checkIn}&checkOut=${checkOut}&noOfRoom=${noOfRoom}&paxInfo=${paxInfo}&searchType=Direct&Affiliate=304&hotelId=&countryCode=${countryCode}&aSearch=&maxSR=0&deviceType=Desktop&cultureID=en-GB&airportCode=&Latitude=&Longitude=&Currency=${currency}&source=Direct&sort=pricing-asc&IsPromotedProperty=false&CustomerID=0&CustomerTypeID=0&UserID=0&CityId=${cityId}&DestinationId=${desId}`;
              // https://prodapi.myholidays.com/hotelsearch/api/search/Hotel?nationality=QA&destinationCode=ChIJf-jc_zTFRT4RsdTPeJ8x2UQ&checkIn=25%20Jul%202025&checkOut=26%20Jul%202025&noOfRoom=1&paxInfo=AA$|&searchType=Google&Affiliate=304&hotelId=&countryCode=&aSearch=&maxSR=5&deviceType=Desktop&cultureID=en-GB&airportCode&Latitude=&Longitude=&currency=INR&source=Direct
            const response = await axios.get(API_URL);
            console.log({response});
            const key = response.data?.SearchRequest?.HotelSearchKey;
    
            if (key) {
              setSearch(key);
              setdata(response?.data)
            } else {
              console.error("No search key found in API response");
            }
          } catch (error) {
            console.error("Error fetching search key:", error);
          }
        };
          fetchKey();
      }, [searchParams]);

      useEffect(()=>{
        if(search){
            console.log("Dispatching getListOfHotel with search key:", search,data);
            dispatch(getListOfHotel(search))
            // dispatch(getListOfHotel(search));
        }
      },[search,data])
      return (
        <section>
          {/* <div
            className={`md:bg-[#008089] shadow md:shadow-none bg-white md:h-auto h-[100vh] md:static fixed top-0 z-[999] w-full rounded-[0px] md:px-2 px-5 py-[50px] md:py-[20px] md:block  ${searchwidgetActive ? "block" : "hidden"}`}
          >
            <Icon
              icon="material-symbols-light:close-rounded"
              className="absolute right-[10px] top-[10px] block md:hidden"
              onClick={handleShowSearhwidget}
              width="40"
              height="40"
            />
            <SearchWidget />
          </div> */}
          <div className="bg-[#e9e9e9] p-2 flex gap-2 items-center  md:hidden">
            {/* <Icon icon="mynaui:arrow-left" width="24" height="24" /> */}
            <div className="">
              <h5 className="text-[14px] text-black font-semibold">Doha , Qatar</h5>
              <div className="flex h-5 items-center space-x-2 text-small">
                <h6 className="text-[12px] text-black font-normal">
                  Jun 18 - Jun 20
                </h6>
                {/* <Divider orientation="vertical" /> */}
                <p className="text-[12px] text-black font-normal">2 Guests </p>
              </div>
            </div>
{/*     
            <Icon
              icon="ep:edit"
              width="24"
              height="24"
            //   onClick={handleShowSearhwidget}
              className="ml-auto"
            /> */}
          </div>
          <section className="bg-[#f6f7fa] py-5">
            <div className="flex container mx-auto gap-5 w-full px-2 xl:px-0">
              <div
                // className={`lg:w-[450px] w-full lg:block lg:static fixed top-0 right-0 z-[12]  ${filteractive ? "block" : "hidden"}`}
              >
                {/* <Icon
                  icon="material-symbols-light:close-rounded"
                  className="absolute right-[10px] top-[10px] block lg:hidden text-white"
                //   onClick={handleShowFilter}
                  width="40"
                  height="40"
                /> */}
                <div className=" shadow">
                  {/* <Filter /> */}
                </div>
              </div>
              {/* <ListingResult /> */}
            </div>
          </section>
    
          <section className="bg-[#ffffff] py-5">
            {/* <ListingContent /> */}
          </section>
    
          {/* <div className="bg-[#000000] px-2 py-3  flex gap-2 items-center  xl:hidden fixed bottom-[50px] z-[9] left-0 right-0 rounded-[10px] w-[180px] mx-auto">
            <Icon icon="mynaui:arrow-left" width="24" height="24" />
            <div className="flex h-5 items-center space-x-4 text-small justify-center">
              <h5
                className="text-[12px] text-white font-normal  text-center "
                onClick={onOpen}
              >
                {" "}
                <Icon
                  icon="fluent-mdl2:sort"
                  className="block mx-auto"
                  width="15"
                  height="15"
                />{" "}
                Sort
              </h5>
              <Divider className="bg-white" orientation="vertical" />
    
              <h5
                className="text-[12px] text-white font-normal  text-center md:hidden xl:block"
                onClick={handleShowSearhwidget}
              >
                {" "}
                <Icon
                  icon="ep:edit"
                  className="block mx-auto"
                  width="15"
                  height="15"
                />{" "}
                Modify
              </h5>
              <Divider
                className="bg-white md:hidden xl:block"
                orientation="vertical"
              />
    
              <h5
                className="text-[12px] text-white font-normal  text-center"
                onClick={handleShowFilter}
              >
                {" "}
                <Icon
                  icon="f7:slider-horizontal-3"
                  className="block mx-auto"
                  width="15"
                  height="15"
                />
                Filter
              </h5>
            </div>
    
            <Icon icon="ep:edit" width="24" height="24" className="ml-auto" />
          </div> */}
    
          {/* <section className="pt-5 pb-[50px] bg-[#f6f7fa]">
      <div className="container mx-auto">
      <RecomandedHotels/>
      </div>
    </section> */}
    
          {/* <Modal
            // isOpen={isOpen}
            // onOpenChange={onOpenChange}
            hideCloseButton
            placement="bottom"
            className="z-[999] !m-0 rounded-tl-[10px] rounded-tr-[10px] rounded-br-[0px] rounded-bl-[0px] "
          > */}
            {/* <ModalContent className="max-w-full">
              {(onClose) => (
                <>
                  <ModalHeader className="flex gap-1 items-center bg-[#e8f3f4] py-0 text-[16px]">
                    Sort By{" "}
                    <Button
                      className="ml-auto bg-transparent p-0"
                      onPress={onClose}
                    >
                      Clear All
                    </Button>
                  </ModalHeader>
                  <ModalBody>
                    <Button
                      className="bg-[#dddddd] border-1 border-solid border-[#6d6d6d] h-[48px]"
                      variant="light"
                      onPress={onClose}
                    >
                      Low to High
                    </Button>
                    <Button
                      className="bg-[#dddddd] border-1 border-solid border-[#6d6d6d] h-[48px]"
                      onPress={onClose}
                    >
                      High to Low
                    </Button>
                  </ModalBody>
                </>
              )}
            </ModalContent> */}
          {/* </Modal> */}
        </section>
      );
    };
    
    export default listing;