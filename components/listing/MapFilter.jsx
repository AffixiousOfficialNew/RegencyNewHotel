import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import { Image, Button , Link } from "@heroui/react";
import Amenities from "../../components/Amenities";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
const MapFilter = ({ latitude, longitude , selectedHotel , isInfoOpen, setIsInfoOpen  }) => {
  console.log({selectedHotel});
  const { listing } = useSelector((state) => state);
  const data = listing?.listingResult[0];
  const info = data?.SearchRequest;
  console.log({data,info});
  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: latitude || 28.610001,
    lng: longitude || 77.230003,
  };

  return (
    <div className="sticky top-0">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
          {selectedHotel && (
  <Marker position={center}>
    {isInfoOpen && (
      <InfoWindow
        position={center}
        onCloseClick={() => setIsInfoOpen(false)}
      >
        <div className="text-sm w-[350px]">
          <Image
            src={selectedHotel?.HotelImage || 'https://www.regencyholidays.com/_next/static/media/image-not-avail.be26c5abf8dce11845e2feaa87e2ce83.png'}
            alt="Hotel"
            className="w-full h-[250px]"
            classNames={{ wrapper: "!max-w-full" }}
          />
          <h2 className="font-bold my-2 text-[24px]">{selectedHotel?.HotelName}</h2>
          <div className="flex gap-0">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                icon="material-symbols-light:star-rounded"
                width="30"
                height="30"
                className={`text-[#feba02] ${
                  i < selectedHotel?.HotelStar ? "" : "opacity-20"
                }`}
              />
            ))}
          </div>
          <p className="mb-2">{selectedHotel?.HotelAddress || "Hotel Address"}</p>
          <div className="flex gap-2 my-2 flex-wrap">
            <Amenities amenities={selectedHotel?.amenitiesType || []} />
          </div>
          <div className="flex justify-between w-full pb-2 items-center">
          <div className="">
          <p className="font-semibold text-[24px] text-[#000000]">{selectedHotel?.SelectedCurrency} {selectedHotel?.LowestPrice}</p>
          <p className="text-[14px] text-black mb-0">avg/night</p>
          </div>
          <Link className="bg-[#d90e16] text-white rounded-[10px] mt-3 w-[100px] inline-flex items-center justify-center h-[40px]" href={`/hotels/hoteldetail?hotelId=${selectedHotel?.Hotelcode}&SearchKey=${data?.SearchId}&nationality=${info?.Nationality}&destinationCode=${info?.DestinationID}&checkIn=27%20Jun%202025&checkOut=29%20Jun%202025&noOfRoom=1&paxInfo=${info?.PaxInfo}&aff=${info?.AffiliateId}&currency=${selectedHotel?.SelectedCurrency}&IsPromotedProperty=false&searchType=Hotel&countryCode=${info?.CountryCode}`}>Select</Link>
          </div>
        </div>
       
      </InfoWindow>
    )}
  </Marker>
)}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapFilter;
