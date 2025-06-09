import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import { Image, Button } from "@heroui/react";
import Amenities from "../../components/Amenities";
import { Icon } from "@iconify/react";
const MapFilter = ({ latitude, longitude , selectedHotel  }) => {
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
           <Marker position={center}>
            <InfoWindow position={center} className="bg-white p-2 rounded-lg shadow-lg ">
              <div className="text-sm w-[350px]">
                <Image src={selectedHotel?.HotelImage} className="w-full h-[250px]" classNames={{
                    wrapper:"!max-w-full",
                }}/>
                <h2 className="font-bold my-2">{selectedHotel?.HotelName}</h2>

                <div className="flex gap-0">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        icon="material-symbols-light:star-rounded"
                        width="30"
                        height="30"
                        className={`text-[#feba02] ${i < selectedHotel?.HotelStar ? "" : "opacity-20"}`}
                      />
                    ))}
                  </div>

                <p className="mb-2">{selectedHotel?.HotelAddress || 'Hotel Address'}</p>
                <div className="flex gap-2 my-2 flex-wrap">
                    <Amenities amenities={selectedHotel?.amenitiesType} />
                  </div>
              </div>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapFilter;
