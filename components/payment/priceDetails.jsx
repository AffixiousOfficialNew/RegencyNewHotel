"use client"
import React from "react";
import { Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import moment from "moment";

export const PriceDetails = ({data}) => {
  var result = data?.hotelDetails ? data?.hotelDetails : "";
    var searchRequest = result.Hotelsearchrequest ? result.Hotelsearchrequest : "";

    const chkInDate = moment(searchRequest.ChkInDate).format('DD MMM, YYYY');
    const chkOutDate = moment(searchRequest.ChkOutDate).format('DD MMM, YYYY');
    
    // var nights = chkOutDate.diff(chkInDate, 'days');
    const dateDiff = (endDate, startDate)  => {
      if (endDate && startDate) {
        return moment(endDate).diff(moment(startDate), "days");
      } else {
        return "";
      }
    }
    var nights =dateDiff(chkOutDate, chkInDate);

    var TotalRoomPrice=0,RoomCount=0,SubTotal=0,tax=0,GrandTotal=0,isPayAtHotel=false, taxPrice = 0;
    var Currency;
    
    result.HotelRooms &&
      result.HotelRooms.length > 0 &&
      result.HotelRooms.map((props, i) => (
        props.ListOfRoom &&
        props.ListOfRoom.length > 0 &&
        props.ListOfRoom.map((roomProp, j) => (RoomCount=roomProp.RoomCount,
          roomProp.RoomRates &&
          roomProp.RoomRates.length > 0 &&
          roomProp.RoomRates.map((roomRates, k) => (TotalRoomPrice=roomRates.TotalPrice,Currency =roomRates.Currency,isPayAtHotel = roomRates.IsPayAtHotel,
             // change by KK - 24 Jan 2025 for tax calculation 
             tax += (roomRates?.TotalRoomPrice - roomRates?.TotalPrice) || 0
             // roomRates.PriceSummary &&
             // roomRates.PriceSummary.length > 0 &&
             // roomRates.PriceSummary.map((price,p) => {
             //   console.log({before: tax, price})
             //   tax += price.Value
             //   console.log({after: tax})
             // }            
             // )
            )
            )
          ))
      ));
    // tax *= RoomCount;
    SubTotal = RoomCount * TotalRoomPrice;
    GrandTotal= (SubTotal+ (tax * RoomCount));
    var discountTotal = GrandTotal * result?.AppliedDiscount;
    var totalDiscount = discountTotal/100;
    // var DiscountedTotal = GrandTotal - totalDiscount

    var DiscountedTotal = GrandTotal - 0;

    const formatCurrency = (amount) => {
      const amountStr = amount.toString();
      
      // If the number is less than 4 digits, just return it as is
      if (amountStr.length < 4) return amountStr;
      
      // For numbers with more than 3 digits, add commas every 3 digits from the right
      const formattedRest = amountStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      
      return formattedRest;
    };
  return (
    <div className="space-y-4">
      <Card className="shadow-sm border p-1">
        <CardBody>
          <h2 className="mb-4 text-xl font-semibold">Price Details</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{RoomCount} Rooms X {nights} Night</p>
                <p className="text-sm text-default-500">Base Price</p>
              </div>
              <p className="font-medium">{Currency} {formatCurrency(Math.ceil(SubTotal))}</p>
            </div>
            
            <Divider />
            
            <div className="flex items-center justify-between">
              <p className="font-medium">Sub Total</p>
              <p className="font-medium">{Currency} {formatCurrency(Math.ceil(SubTotal))}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="font-medium">Taxes & Service Fees</p>
              <p className="font-medium">{Currency} {formatCurrency(Math.ceil(tax*RoomCount))}</p>
            </div>
            
            <Divider />
            
            <div className="flex items-center justify-between rounded-medium bg-warning-100 p-4 text-lg font-bold">
              <p>GRAND TOTAL</p>
              <p>{Currency} {formatCurrency(Math.ceil(GrandTotal))}</p>
            </div>
          </div>
        </CardBody>
      </Card>
      
      <Card className="shadow-sm border">
        <CardBody className="flex flex-col items-center text-center">
          <div className="mb-2 rounded-full bg-success-100 p-3">
            <Icon icon="lucide:shield-check" className="text-success" width={28} />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Secured Payment</h3>
          <p className="text-sm text-default-600">Your personal data and payment is fully protected</p>
          <p className="text-sm text-default-600">We use secure payment transmission</p>
          <p className="text-sm text-default-600">We don't store your card details</p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="h-10 w-32 rounded-medium border border-default-200 bg-default-50 p-2"></div>
            <div className="h-10 w-32 rounded-medium border border-default-200 bg-default-50 p-2"></div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};