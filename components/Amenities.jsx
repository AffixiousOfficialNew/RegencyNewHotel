import React, { Fragment } from 'react'
import { Icon } from "@iconify/react";
import {
  Tooltip
} from "@heroui/react";
 
 
  const amenityIcons  = {
'AirConditioning': <Icon icon="iconoir:air-conditioner" width="24" height="24" />,
AC: <Icon icon="iconoir:air-conditioner" width="24" height="24" />,
'Air-conditioning': <Icon icon="iconoir:air-conditioner" width="24" height="24" />,
'SeaView': <Icon icon="iconoir:sea-and-sun" width="24" height="24" />,
'Elevator':<Icon icon="material-symbols-light:elevator-outline" width="24" height="24" />,
  POOL: <Icon icon="material-symbols-light:pool" width="24" height="24" />,
  Indoorpool: <Icon icon="material-symbols-light:bath-public-large-rounded" width="24" height="24" />,
  ChildrensPool : <Icon icon="material-symbols-light:bath-private-outline" width="24" height="24" />,
  'Pool': <Icon icon="material-symbols-light:pool" width="24" height="24" />,
  'Outdoorpool(s)': <Icon icon="material-symbols-light:pool" width="24" height="24" />,
  PF: <Icon icon="streamline:pet-paw" width="24" height="24" />,
  Petsallowedonrequest:<Icon icon="streamline:pet-paw" width="24" height="24" />,
  SPA: <Icon icon="material-symbols-light:spa-outline-rounded" width="24" height="24" />,
  Spafacilities  : <Icon icon="material-symbols-light:spa-outline-rounded" width="24" height="24" />,
  GOLF: <Icon icon="solar:golf-linear" width="24" height="24" />,
  CASINO: <Icon icon="material-symbols:casino-outline" width="24" height="24" />,
  WIFI: <Icon icon="material-symbols-light:wifi" width="24" height="24" />,
  FreeWiFi : <Icon icon="material-symbols-light:wifi" width="24" height="24" />,
  'Wirelessinternet': <Icon icon="material-symbols-light:wifi" width="24" height="24" />,
  BF: <Icon icon="fluent-mdl2:breakfast" width="24" height="24" />,
  'Breakfastroom': <Icon icon="fluent-mdl2:breakfast" width="24" height="24" />,
  GYM: <Icon icon="iconoir:gym" width="24" height="24" />,
  Gymfitnessfacilities:<Icon icon="iconoir:gym" width="24" height="24" />,
  'Gym/fitnessfacilities':<Icon icon="iconoir:gym" width="24" height="24" />,
  BAR: <Icon icon="carbon:bar" width="24" height="24" />,
  Bar: <Icon icon="carbon:bar" width="24" height="24" />,
  WHEELCHAIR: <Icon icon="mynaui:wheelchair" width="24" height="24" />,
  'Wheelchairaccess': <Icon icon="mynaui:wheelchair" width="24" height="24" />,
  PARKING: <Icon icon="iconoir:parking" width="24" height="24" />,
  'Carparking': <Icon icon="iconoir:parking" width="24" height="24" />,
  RS: <Icon icon="material-symbols-light:room-service-outline-sharp" width="24" height="24" />,
  BC: <Icon icon="material-symbols-light:handshake-outline-rounded" width="24" height="24" />,
  ASHUTTLE: <Icon icon="solar:bus-outline" width="24" height="24" />,
  MULTILINGUAL: <Icon icon="heroicons:language-solid" width="24" height="24" />,
  BS: <Icon icon="ph:baby-carriage" width="24" height="24" />,
  RESTRO: <Icon icon="hugeicons:restaurant-02" width="24" height="24" />,
  'Restaurant': <Icon icon="hugeicons:restaurant-02" width="24" height="24" />,
  AS: <Icon icon="solar:bus-outline" width="24" height="24" />,
  LAUNDRY: <Icon icon="material-symbols-light:laundry-outline-rounded" width="24" height="24" />,
  'Laundryfacilities':<Icon icon="material-symbols-light:laundry-outline-rounded" width="24" height="24" />,
  'DryCleaning' : <Icon icon="material-symbols-light:laundry-outline-rounded" width="24" height="24" />,
  TV: <Icon icon="solar:tv-broken" width="24" height="24" />,
  'Hair Dryer in Room': <Icon icon="hugeicons:hair-dryer" width="24" height="24" />,
  'Mini Fridge': <Icon icon="solar:fridge-linear" width="24" height="24" />,
  'Safety Deposit Box in Room': <Icon icon="ph:lockers-light" width="24" height="24" />,
  'Safe': <Icon icon="ph:lockers-light" width="24" height="24" />,
  'Tea and Coffee making facilities': <Icon icon="streamline:tea-cup" width="14" height="14" />,
  '24FD': <Icon icon="fluent:person-support-28-regular" width="24" height="24" />,
  FD: <Icon icon="fluent:person-support-28-regular" width="24" height="24" />,
   hrreception: <Icon icon="fluent:person-support-28-regular" width="24" height="24" />,
   Currencyexchange : <Icon icon="bitcoin-icons:exchange-outline" width="24" height="24" />,
   Ironingfacilities : <Icon icon="tabler:ironing-steam" width="24" height="24" />,
   Multilingualstaff : <Icon icon="la:users" width="32" height="32" />,
  'Wifi Access': <Icon icon="material-symbols-light:wifi" width="24" height="24" />,
  'FreeWi-Fi': <Icon icon="material-symbols-light:wifi" width="24" height="24" />,
  'Conciergefacilities' : <Icon icon="material-symbols-light:concierge-outline" width="24" height="24" />,
  'Terrace':<Icon icon="guidance:terrace" width="24" height="24" />,
  'Sauna' : <Icon icon="guidance:sauna" width="24" height="24" />,
  'Complimentarynewspaper(s)' : <Icon icon="cil:newspaper" width="24" height="24" />,
   Complimentarynewspaper : <Icon icon="cil:newspaper" width="24" height="24" />,
   DOC:<Icon icon="cil:newspaper" width="24" height="24" />,
  'Cashmachine/ATM' : <Icon icon="guidance:atm" width="24" height="24" />,
  Telephone : <Icon icon="hugeicons:telephone" width="24" height="24" />,
  hrcheckin :  <Icon icon="fluent:person-support-28-regular" width="24" height="24" />,
  Businessservices : <Icon icon="ph:baby-carriage" width="24" height="24" />,
  Shuttleservices : <Icon icon="material-symbols-light:airport-shuttle-outline-rounded" width="24" height="24" />,
  Conferencebanquetfacilities:<Icon icon="game-icons:video-conference" width="24" height="24" />
}

const Amenities = ({ amenities }) => {
  if (!amenities) return null;

  // Normalize amenities to an array of strings
  let list = [];

  if (typeof amenities === 'string') {
    list = amenities
      .replace(/"/g, '') // Remove quotes
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
  } else if (Array.isArray(amenities)) {
    list = amenities.map(item => (typeof item === 'string' ? item.trim() : '')).filter(Boolean);
  } else {
    return null; // Invalid format
  }

  const items = list.map(original => {
    const cleaned = original
      .replace(/\(.*?\)/g, '')   // Remove content in parentheses
      .replace(/^\d+/, '')       // Remove leading digits
      .replace(/[\s\/-]+/g, ''); // Remove spaces, slashes, and hyphens

    return { original, key: cleaned };
  });

  return (
    <Fragment>
      {items.map(({ original, key }, index) => (
        <Tooltip key={index} showArrow={true} closeDelay={0} content={original} color="foreground">
          <span className="inline-flex border rounded-sm p-3 items-center justify-center bg-white">
            {amenityIcons[key] || original}
          </span>
        </Tooltip>
      ))}
    </Fragment>
  );
};
 
export default Amenities