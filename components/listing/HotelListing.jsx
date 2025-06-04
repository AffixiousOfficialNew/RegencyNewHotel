"use client"
import React from "react";
import {Image , Button} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
const HotelListing=()=>{
    const dispatch = useDispatch();
    const { listing } = useSelector((state)=>state);
    const SearchKey = listing?.listingResult[0]?.SearchId;
    const data = listing?.listingResult[0];
  const info = data?.SearchRequest;
  const hotels = listing?.listofHotel || [];
  const resultCount = listing?.resultCount || listing?.listingResult?.[0]?.ResultCount || 0;

    console.log({listing,SearchKey,hotels,resultCount,info});

    return(
        <section>
            <div className="w-full px-2 mx-auto">
            {hotels &&
              hotels.map((hotel, index) => (
                <article className="flex gap-5 border border-solid border-[#dddddd] p-2">
         
                    <div 
                    key={index}
                    className="w-[450px]">
                      <Image src={hotel.HotelImage} className="w-full h-[250px]" alt="" classNames={{
                          wrapper: "!max-w-full"
                      }} />
                  </div><div className="w-full flex gap-2">
                          <div className="w-full">
                              <h2 className="text-[24px] font-bold text-black">{hotel.HotelName}</h2>
                              <div className="flex gap-0">
                                  <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                  <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                  <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                  <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                  <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                              </div>
                              <p className="text-[14px] text-[#757575 ]">{hotel.HotelAddress} <Button className="p-0 bg-transparent text-[#013ca6] h-[20px]">View Map</Button></p>
                              <h3 className="text-[#d63565] text-[14px] font-semibold">{hotel.HotelZone}</h3>
                              <p className="flex gap-2 items-center"><Icon icon="game-icons:path-distance" width="24" height="24" /> <span className="text-black text-[12px]">1.2KM</span> </p>
                              <p className="bg-[#707070] px-3 py-2 inline-block text-white text-[12px] rounded-[10px] mt-3">{hotel.MealType}</p>

                              <div className="flex gap-2 my-2">
                                  <Icon icon="material-symbols-light:pool" width="30" height="30" />
                                  <Icon icon="material-symbols-light:spa-outline" width="30" height="30" />
                                  <Icon icon="iconamoon:briefcase-thin" width="30" height="30" />
                                  <Icon icon="fluent:vehicle-car-parking-20-regular" width="30" height="30" />
                                  <Icon icon="material-symbols-light:wifi-sharp" width="30" height="30" />
                              </div>
                          </div>
                          <div className="border-l-1 border-solid border-[#dddddd] pl-3 w-[350px] text-center flex items-center justify-center">
                              <div>
                                  <h4 className="text-[24px] font-semibold"><span>{hotel.SelectedCurrency} </span>{hotel.LowestPrice}</h4>
                                  <p>avg/night</p>
                                  <Button className="bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16] mt-3 w-[180px] ">Select</Button>
                              </div>
                          </div>
                      </div>
              
                </article>
            ))}

                {/* <article className="flex gap-5 border border-solid border-[#dddddd] p-2">
                    <div className="w-[450px]">
                        <Image src="https://images.trvl-media.com/lodging/7000000/6010000/6005100/6005096/0cf87dd8.jpg?impolicy=resizecrop&rw=1200&ra=fit" className="w-full h-[250px]" alt="" classNames={{
                            wrapper:"!max-w-full"
                        }}/>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <h2 className="text-[24px] font-bold text-black">The Royal Riviera Hotel</h2>
                            <div className="flex gap-0">
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                            </div>
                            <p className="text-[14px] text-[#757575 ]">Al Safilia Street, Old Salata Corniche <Button className="p-0 bg-transparent text-[#013ca6] h-[20px]">View Map</Button></p>
                            <h3 className="text-[#d63565] text-[14px] font-semibold">Near Grand Hamad Street</h3>
                            <p className="flex gap-2 items-center"><Icon icon="game-icons:path-distance" width="24" height="24" /> <span className="text-black text-[12px]">1.2KM</span> </p>
                            <p className="bg-[#707070] px-3 py-2 inline-block text-white text-[12px] rounded-[10px] mt-3">Room Only</p>
                            
                            <div className="flex gap-2 my-2">
                                <Icon icon="material-symbols-light:pool" width="30" height="30" />
                                <Icon icon="material-symbols-light:spa-outline" width="30" height="30" />
                                <Icon icon="iconamoon:briefcase-thin" width="30" height="30" />
                                <Icon icon="fluent:vehicle-car-parking-20-regular" width="30" height="30" />
                                <Icon icon="material-symbols-light:wifi-sharp" width="30" height="30" />
                                </div>
                        </div>
                        <div className="border-l-1 border-solid border-[#dddddd] pl-3 w-[350px] text-center flex items-center justify-center">
                            <div>
                            <h4 className="text-[24px] font-semibold"><span>INR </span>4,445.69</h4>
                            <p>avg/night</p>
                            <Button className="bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16] mt-3 w-[180px] ">Select</Button>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="flex gap-5 border border-solid border-[#dddddd] p-2">
                    <div className="w-[450px]">
                        <Image src="https://images.trvl-media.com/lodging/7000000/6010000/6005100/6005096/0cf87dd8.jpg?impolicy=resizecrop&rw=1200&ra=fit" className="w-full h-[250px]" alt="" classNames={{
                            wrapper:"!max-w-full"
                        }}/>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <h2 className="text-[24px] font-bold text-black">The Royal Riviera Hotel</h2>
                            <div className="flex gap-0">
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                            </div>
                            <p className="text-[14px] text-[#757575 ]">Al Safilia Street, Old Salata Corniche <Button className="p-0 bg-transparent text-[#013ca6] h-[20px]">View Map</Button></p>
                            <h3 className="text-[#d63565] text-[14px] font-semibold">Near Grand Hamad Street</h3>
                            <p className="flex gap-2 items-center"><Icon icon="game-icons:path-distance" width="24" height="24" /> <span className="text-black text-[12px]">1.2KM</span> </p>
                            <p className="bg-[#707070] px-3 py-2 inline-block text-white text-[12px] rounded-[10px] mt-3">Room Only</p>
                            
                            <div className="flex gap-2 my-2">
                                <Icon icon="material-symbols-light:pool" width="30" height="30" />
                                <Icon icon="material-symbols-light:spa-outline" width="30" height="30" />
                                <Icon icon="iconamoon:briefcase-thin" width="30" height="30" />
                                <Icon icon="fluent:vehicle-car-parking-20-regular" width="30" height="30" />
                                <Icon icon="material-symbols-light:wifi-sharp" width="30" height="30" />
                                </div>
                        </div>
                        <div className="border-l-1 border-solid border-[#dddddd] pl-3 w-[350px] text-center flex items-center justify-center">
                            <div>
                            <h4 className="text-[24px] font-semibold"><span>INR </span>4,445.69</h4>
                            <p>avg/night</p>
                            <Button className="bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16] mt-3 w-[180px] ">Select</Button>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="flex gap-5 border border-solid border-[#dddddd] p-2">
                    <div className="w-[450px]">
                        <Image src="https://images.trvl-media.com/lodging/7000000/6010000/6005100/6005096/0cf87dd8.jpg?impolicy=resizecrop&rw=1200&ra=fit" className="w-full h-[250px]" alt="" classNames={{
                            wrapper:"!max-w-full"
                        }}/>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <h2 className="text-[24px] font-bold text-black">The Royal Riviera Hotel</h2>
                            <div className="flex gap-0">
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                            </div>
                            <p className="text-[14px] text-[#757575 ]">Al Safilia Street, Old Salata Corniche <Button className="p-0 bg-transparent text-[#013ca6] h-[20px]">View Map</Button></p>
                            <h3 className="text-[#d63565] text-[14px] font-semibold">Near Grand Hamad Street</h3>
                            <p className="flex gap-2 items-center"><Icon icon="game-icons:path-distance" width="24" height="24" /> <span className="text-black text-[12px]">1.2KM</span> </p>
                            <p className="bg-[#707070] px-3 py-2 inline-block text-white text-[12px] rounded-[10px] mt-3">Room Only</p>
                            
                            <div className="flex gap-2 my-2">
                                <Icon icon="material-symbols-light:pool" width="30" height="30" />
                                <Icon icon="material-symbols-light:spa-outline" width="30" height="30" />
                                <Icon icon="iconamoon:briefcase-thin" width="30" height="30" />
                                <Icon icon="fluent:vehicle-car-parking-20-regular" width="30" height="30" />
                                <Icon icon="material-symbols-light:wifi-sharp" width="30" height="30" />
                                </div>
                        </div>
                        <div className="border-l-1 border-solid border-[#dddddd] pl-3 w-[350px] text-center flex items-center justify-center">
                            <div>
                            <h4 className="text-[24px] font-semibold"><span>INR </span>4,445.69</h4>
                            <p>avg/night</p>
                            <Button className="bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16] mt-3 w-[180px] ">Select</Button>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="flex gap-5 border border-solid border-[#dddddd] p-2">
                    <div className="w-[450px]">
                        <Image src="https://images.trvl-media.com/lodging/7000000/6010000/6005100/6005096/0cf87dd8.jpg?impolicy=resizecrop&rw=1200&ra=fit" className="w-full h-[250px]" alt="" classNames={{
                            wrapper:"!max-w-full"
                        }}/>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <h2 className="text-[24px] font-bold text-black">The Royal Riviera Hotel</h2>
                            <div className="flex gap-0">
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                            </div>
                            <p className="text-[14px] text-[#757575 ]">Al Safilia Street, Old Salata Corniche <Button className="p-0 bg-transparent text-[#013ca6] h-[20px]">View Map</Button></p>
                            <h3 className="text-[#d63565] text-[14px] font-semibold">Near Grand Hamad Street</h3>
                            <p className="flex gap-2 items-center"><Icon icon="game-icons:path-distance" width="24" height="24" /> <span className="text-black text-[12px]">1.2KM</span> </p>
                            <p className="bg-[#707070] px-3 py-2 inline-block text-white text-[12px] rounded-[10px] mt-3">Room Only</p>
                            
                            <div className="flex gap-2 my-2">
                                <Icon icon="material-symbols-light:pool" width="30" height="30" />
                                <Icon icon="material-symbols-light:spa-outline" width="30" height="30" />
                                <Icon icon="iconamoon:briefcase-thin" width="30" height="30" />
                                <Icon icon="fluent:vehicle-car-parking-20-regular" width="30" height="30" />
                                <Icon icon="material-symbols-light:wifi-sharp" width="30" height="30" />
                                </div>
                        </div>
                        <div className="border-l-1 border-solid border-[#dddddd] pl-3 w-[350px] text-center flex items-center justify-center">
                            <div>
                            <h4 className="text-[24px] font-semibold"><span>INR </span>4,445.69</h4>
                            <p>avg/night</p>
                            <Button className="bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16] mt-3 w-[180px] ">Select</Button>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="flex gap-5 border border-solid border-[#dddddd] p-2">
                    <div className="w-[450px]">
                        <Image src="https://images.trvl-media.com/lodging/7000000/6010000/6005100/6005096/0cf87dd8.jpg?impolicy=resizecrop&rw=1200&ra=fit" className="w-full h-[250px]" alt="" classNames={{
                            wrapper:"!max-w-full"
                        }}/>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <h2 className="text-[24px] font-bold text-black">The Royal Riviera Hotel</h2>
                            <div className="flex gap-0">
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                            </div>
                            <p className="text-[14px] text-[#757575 ]">Al Safilia Street, Old Salata Corniche <Button className="p-0 bg-transparent text-[#013ca6] h-[20px]">View Map</Button></p>
                            <h3 className="text-[#d63565] text-[14px] font-semibold">Near Grand Hamad Street</h3>
                            <p className="flex gap-2 items-center"><Icon icon="game-icons:path-distance" width="24" height="24" /> <span className="text-black text-[12px]">1.2KM</span> </p>
                            <p className="bg-[#707070] px-3 py-2 inline-block text-white text-[12px] rounded-[10px] mt-3">Room Only</p>
                            
                            <div className="flex gap-2 my-2">
                                <Icon icon="material-symbols-light:pool" width="30" height="30" />
                                <Icon icon="material-symbols-light:spa-outline" width="30" height="30" />
                                <Icon icon="iconamoon:briefcase-thin" width="30" height="30" />
                                <Icon icon="fluent:vehicle-car-parking-20-regular" width="30" height="30" />
                                <Icon icon="material-symbols-light:wifi-sharp" width="30" height="30" />
                                </div>
                        </div>
                        <div className="border-l-1 border-solid border-[#dddddd] pl-3 w-[350px] text-center flex items-center justify-center">
                            <div>
                            <h4 className="text-[24px] font-semibold"><span>INR </span>4,445.69</h4>
                            <p>avg/night</p>
                            <Button className="bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16] mt-3 w-[180px] ">Select</Button>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="flex gap-5 border border-solid border-[#dddddd] p-2">
                    <div className="w-[450px]">
                        <Image src="https://images.trvl-media.com/lodging/7000000/6010000/6005100/6005096/0cf87dd8.jpg?impolicy=resizecrop&rw=1200&ra=fit" className="w-full h-[250px]" alt="" classNames={{
                            wrapper:"!max-w-full"
                        }}/>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <h2 className="text-[24px] font-bold text-black">The Royal Riviera Hotel</h2>
                            <div className="flex gap-0">
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                            </div>
                            <p className="text-[14px] text-[#757575 ]">Al Safilia Street, Old Salata Corniche <Button className="p-0 bg-transparent text-[#013ca6] h-[20px]">View Map</Button></p>
                            <h3 className="text-[#d63565] text-[14px] font-semibold">Near Grand Hamad Street</h3>
                            <p className="flex gap-2 items-center"><Icon icon="game-icons:path-distance" width="24" height="24" /> <span className="text-black text-[12px]">1.2KM</span> </p>
                            <p className="bg-[#707070] px-3 py-2 inline-block text-white text-[12px] rounded-[10px] mt-3">Room Only</p>
                            
                            <div className="flex gap-2 my-2">
                                <Icon icon="material-symbols-light:pool" width="30" height="30" />
                                <Icon icon="material-symbols-light:spa-outline" width="30" height="30" />
                                <Icon icon="iconamoon:briefcase-thin" width="30" height="30" />
                                <Icon icon="fluent:vehicle-car-parking-20-regular" width="30" height="30" />
                                <Icon icon="material-symbols-light:wifi-sharp" width="30" height="30" />
                                </div>
                        </div>
                        <div className="border-l-1 border-solid border-[#dddddd] pl-3 w-[350px] text-center flex items-center justify-center">
                            <div>
                            <h4 className="text-[24px] font-semibold"><span>INR </span>4,445.69</h4>
                            <p>avg/night</p>
                            <Button className="bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16] mt-3 w-[180px] ">Select</Button>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="flex gap-5 border border-solid border-[#dddddd] p-2">
                    <div className="w-[450px]">
                        <Image src="https://images.trvl-media.com/lodging/7000000/6010000/6005100/6005096/0cf87dd8.jpg?impolicy=resizecrop&rw=1200&ra=fit" className="w-full h-[250px]" alt="" classNames={{
                            wrapper:"!max-w-full"
                        }}/>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <h2 className="text-[24px] font-bold text-black">The Royal Riviera Hotel</h2>
                            <div className="flex gap-0">
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                            </div>
                            <p className="text-[14px] text-[#757575 ]">Al Safilia Street, Old Salata Corniche <Button className="p-0 bg-transparent text-[#013ca6] h-[20px]">View Map</Button></p>
                            <h3 className="text-[#d63565] text-[14px] font-semibold">Near Grand Hamad Street</h3>
                            <p className="flex gap-2 items-center"><Icon icon="game-icons:path-distance" width="24" height="24" /> <span className="text-black text-[12px]">1.2KM</span> </p>
                            <p className="bg-[#707070] px-3 py-2 inline-block text-white text-[12px] rounded-[10px] mt-3">Room Only</p>
                            
                            <div className="flex gap-2 my-2">
                                <Icon icon="material-symbols-light:pool" width="30" height="30" />
                                <Icon icon="material-symbols-light:spa-outline" width="30" height="30" />
                                <Icon icon="iconamoon:briefcase-thin" width="30" height="30" />
                                <Icon icon="fluent:vehicle-car-parking-20-regular" width="30" height="30" />
                                <Icon icon="material-symbols-light:wifi-sharp" width="30" height="30" />
                                </div>
                        </div>
                        <div className="border-l-1 border-solid border-[#dddddd] pl-3 w-[350px] text-center flex items-center justify-center">
                            <div>
                            <h4 className="text-[24px] font-semibold"><span>INR </span>4,445.69</h4>
                            <p>avg/night</p>
                            <Button className="bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16] mt-3 w-[180px] ">Select</Button>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="flex gap-5 border border-solid border-[#dddddd] p-2">
                    <div className="w-[450px]">
                        <Image src="https://images.trvl-media.com/lodging/7000000/6010000/6005100/6005096/0cf87dd8.jpg?impolicy=resizecrop&rw=1200&ra=fit" className="w-full h-[250px]" alt="" classNames={{
                            wrapper:"!max-w-full"
                        }}/>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <h2 className="text-[24px] font-bold text-black">The Royal Riviera Hotel</h2>
                            <div className="flex gap-0">
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                            </div>
                            <p className="text-[14px] text-[#757575 ]">Al Safilia Street, Old Salata Corniche <Button className="p-0 bg-transparent text-[#013ca6] h-[20px]">View Map</Button></p>
                            <h3 className="text-[#d63565] text-[14px] font-semibold">Near Grand Hamad Street</h3>
                            <p className="flex gap-2 items-center"><Icon icon="game-icons:path-distance" width="24" height="24" /> <span className="text-black text-[12px]">1.2KM</span> </p>
                            <p className="bg-[#707070] px-3 py-2 inline-block text-white text-[12px] rounded-[10px] mt-3">Room Only</p>
                            
                            <div className="flex gap-2 my-2">
                                <Icon icon="material-symbols-light:pool" width="30" height="30" />
                                <Icon icon="material-symbols-light:spa-outline" width="30" height="30" />
                                <Icon icon="iconamoon:briefcase-thin" width="30" height="30" />
                                <Icon icon="fluent:vehicle-car-parking-20-regular" width="30" height="30" />
                                <Icon icon="material-symbols-light:wifi-sharp" width="30" height="30" />
                                </div>
                        </div>
                        <div className="border-l-1 border-solid border-[#dddddd] pl-3 w-[350px] text-center flex items-center justify-center">
                            <div>
                            <h4 className="text-[24px] font-semibold"><span>INR </span>4,445.69</h4>
                            <p>avg/night</p>
                            <Button className="bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16] mt-3 w-[180px] ">Select</Button>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="flex gap-5 border border-solid border-[#dddddd] p-2">
                    <div className="w-[450px]">
                        <Image src="https://images.trvl-media.com/lodging/7000000/6010000/6005100/6005096/0cf87dd8.jpg?impolicy=resizecrop&rw=1200&ra=fit" className="w-full h-[250px]" alt="" classNames={{
                            wrapper:"!max-w-full"
                        }}/>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-full">
                            <h2 className="text-[24px] font-bold text-black">The Royal Riviera Hotel</h2>
                            <div className="flex gap-0">
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                                <Icon className="text-[#feba02]" icon="material-symbols-light:star-rounded" width="30" height="30" />
                            </div>
                            <p className="text-[14px] text-[#757575 ]">Al Safilia Street, Old Salata Corniche <Button className="p-0 bg-transparent text-[#013ca6] h-[20px]">View Map</Button></p>
                            <h3 className="text-[#d63565] text-[14px] font-semibold">Near Grand Hamad Street</h3>
                            <p className="flex gap-2 items-center"><Icon icon="game-icons:path-distance" width="24" height="24" /> <span className="text-black text-[12px]">1.2KM</span> </p>
                            <p className="bg-[#707070] px-3 py-2 inline-block text-white text-[12px] rounded-[10px] mt-3">Room Only</p>
                            
                            <div className="flex gap-2 my-2">
                                <Icon icon="material-symbols-light:pool" width="30" height="30" />
                                <Icon icon="material-symbols-light:spa-outline" width="30" height="30" />
                                <Icon icon="iconamoon:briefcase-thin" width="30" height="30" />
                                <Icon icon="fluent:vehicle-car-parking-20-regular" width="30" height="30" />
                                <Icon icon="material-symbols-light:wifi-sharp" width="30" height="30" />
                                </div>
                        </div>
                        <div className="border-l-1 border-solid border-[#dddddd] pl-3 w-[350px] text-center flex items-center justify-center">
                            <div>
                            <h4 className="text-[24px] font-semibold"><span>INR </span>4,445.69</h4>
                            <p>avg/night</p>
                            <Button className="bg-[#d90e16] text-white rounded-[10px] hover:bg-[#d90e16] mt-3 w-[180px] ">Select</Button>
                            </div>
                        </div>
                    </div>
                </article> */}
            </div>
        </section>
    )
}
export default HotelListing;