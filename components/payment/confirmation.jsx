import React from "react";
import { Card, CardBody, Divider, Image } from "@heroui/react";
import { Icon } from "@iconify/react";
// import imageIcon from "../../app/asstes/hotel_img.png";
import imageIcon from "../../public/asstes/hotel_img.png";
import moment from "moment";
import { dateDiff } from "../../services/paymentApi";


const Confirmation = ({bookingData}) => {
  const bookingDetails = {
    bookingId: bookingData?.bookingId,
    hotelRefNo: bookingData?.BookingReferenceNumber,
    email: bookingData?.EmailAddres,
    hotelName: bookingData?.HotelInformation?.HotelName,
    hotelAddress: `${bookingData?.HotelInformation?.HotelAddress  + bookingData?.HotelInformation?.PostalCode + bookingData?.HotelInformation?.CountryCode}` ,
    rating: bookingData?.HotelInformation?.StarRating,
    checkIn: {
      day: "04",
      month: "Aug, 2025"
    },
    checkOut: {
      day: "05",
      month: "Aug, 2025"
    },
    stay: "1 Night",
    room: "1 Room",
    guest: "1 Adult"
  };
  console.log("kkkkk", bookingData?.HotelInformation);

  var bookingResponse = bookingData ? bookingData : "";
  var hotelInformation = bookingResponse ? bookingResponse?.HotelInformation : '';
  var hotelBookingDetail = bookingResponse ? bookingResponse?.HotelBookingDetail : '';
  
  const chkInDate = moment(hotelBookingDetail?.ChkInDate).format('DD MMM, YYYY');
  var chkInDay = moment(hotelBookingDetail?.ChkInDate).format('DD');
  var chkInMonth = moment(hotelBookingDetail?.ChkInDate).format('MMM');
  var chkInYear = moment(hotelBookingDetail?.ChkInDate).format('YYYY');

  const chkOutDate = moment(hotelBookingDetail?.ChkOutDate).format('DD MMM, YYYY');
  var chkOutDay = moment(hotelBookingDetail?.ChkOutDate).format('DD');
  var chkOutMonth = moment(hotelBookingDetail?.ChkOutDate).format('MMM');
  var chkOutYear = moment(hotelBookingDetail?.ChkOutDate).format('YYYY');

  var nights =dateDiff(chkOutDate, chkInDate);
  var roomCount = 0;
  var roomAdult = 0;
  var roomChild = 0;
  var roomInfo = bookingResponse && bookingResponse?.HotelRooms && bookingResponse?.HotelRooms[0] && bookingResponse?.HotelRooms[0]?.ListOfRoom[0] ? bookingResponse?.HotelRooms[0]?.ListOfRoom[0] : '';
  roomCount = roomInfo && roomInfo?.RoomCount ? roomInfo?.RoomCount : 0;
  roomAdult = roomInfo && roomInfo?.RoomAdult ? roomInfo?.RoomAdult : 0;
  roomChild = roomInfo && roomInfo?.RoomChild ? roomInfo?.RoomChild : 0;




  var bookingResult = bookingData ? bookingData : "";
  var passengerDetails = bookingResult ? bookingResult?.PassengerDetails : '';
  let roomType = '';
  let bedType = '';
  var roomInfo = bookingResult && bookingResult?.HotelRooms && bookingResult?.HotelRooms[0] && bookingResult?.HotelRooms[0]?.ListOfRoom[0] ? bookingResult?.HotelRooms[0]?.ListOfRoom[0] : '';
  roomType = roomInfo && roomInfo.RoomType ? roomInfo.RoomType : '';
  bedType = roomInfo && roomInfo?.RoomRates && roomInfo?.RoomRates[0] && roomInfo?.RoomRates[0]?.BedTypeDescription ? roomInfo?.RoomRates[0]?.BedTypeDescription : '';
  var roomCount = roomInfo && roomInfo?.RoomCount ? roomInfo?.RoomCount : '';

  const GetHotelGuestDetails = (props) => {
    const roomCountInfo = [];
    if (props && props?.roomCount) {
      for (let index = 0; index < props?.roomCount; index++) {
          roomCountInfo.push(<div key={index}><div className="roomType g" key={index} >
          <div className="roomNo">room {index+1}:</div>
          <div className="columns">
         {props?.roomType && props?.roomType.indexOf("|") > -1 ? <span><strong>roomtype</strong>{props.roomType.split("|")[index]}, {props?.bedType.split("|")[index]}</span> : <span><strong>roomtype </strong>{props?.roomType}, {props?.bedType}</span>}
          </div>
          </div>
          <div>
              <GetGusetInfoHeading passengerDetails={props?.passengerDetails} roomIndex={index} />
          </div>
          </div>
          )
      }
      return (<div>{roomCountInfo}</div>)
    } else {
      return ''
    }
  }


  const GetGusetInfoHeading = (props) => {
    if (props.passengerDetails) {
      return <div className="oneSection">
      <div className="customerinfo">
      <table>
      <tbody>
      <tr>
      <th>title</th>
      <th>firstname</th>
      <th>lastname</th>
      </tr>
        <GetPassengerInfo passengerDetails={props?.passengerDetails} roomIndex={props?.roomIndex}/>
      </tbody>
      </table>
      </div>
      </div>
    } else {
      return ''
    }
  }

  const GetPassengerInfo = (props) => {
    var passengerList = [];
    if (props?.passengerDetails) {
      for (let index = 0; index < props?.passengerDetails?.length; index++) {
        if (props.passengerDetails[index]?.RoomNumber === props?.roomIndex+1) {
            if (props.passengerDetails[index]?.PaxType == "C"){
              passengerList.push(
              <tr key={index}>
              <td>{props.passengerDetails[index]?.Title}</td>
              <td>{props.passengerDetails[index]?.FirstName}</td>
              <td>{props.passengerDetails[index]?.LastName} (Age - {props?.passengerDetails[index]?.Age}years)</td>
              </tr>
            )
            } else {
              passengerList.push(
                <tr key={index}>
                <td>{props?.passengerDetails[index]?.Title}</td>
                <td>{props?.passengerDetails[index]?.FirstName}</td>
                <td>{props?.passengerDetails[index]?.LastName}</td>
                </tr>
              )
            }
        }
      }
      return passengerList;
    } else {
      return <tr>
      <td></td>
      <td></td>
      <td></td>
      </tr>
    }
  }
  

  return (
    <Card className="shadow-md">
      <CardBody className="p-6 space-y-6">

      <Image src={imageIcon} alt="image"  title="image" unoptimized className="image" />

        {/* Header */}
        <div className="text-center space-y-2 sucssContiner">
          <h1 className="text-2xl font-semibold sucssmsg ">Your Booking is Confirmed</h1>
          <p className="text-default-600">Thank you for using myholidays.com</p>
          <p className="text-default-700">
            For your reference, your myholidays Booking ID is{" "}
            <span className="font-semibold">{bookingDetails?.bookingId}</span>
          </p>
          <p className="text-default-700">
            Your Hotel Booking Ref No is{" "}
            <span className="font-semibold">{bookingDetails?.hotelRefNo}</span>
          </p>
          <p className="text-default-600">
            A confirmation email will be send to {bookingDetails?.email}
          </p>
          <p className="text-default-700 mt-4">
            A printed copy of this email must be presented at the Hotel at the time of CHECK-IN.
          </p>
        </div>

        <Divider className="my-4" />

        {/* Hotel Details */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Image
              removeWrapper
              alt={bookingDetails?.hotelName}
              className="w-full h-48 object-cover rounded-lg"
              src={bookingData?.HotelInformation?.HotelImage}
            />
          </div>
          <div className="md:w-2/3 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{bookingDetails?.hotelName}</h2>
              <div className="flex items-center mt-1">
                {Array(5).fill(0).map((_, i) => (
                  <Icon 
                    key={i} 
                    icon="lucide:star" 
                    className={`w-4 h-4 ${i < bookingDetails.rating ? "text-warning" : "text-default-300"}`} 
                  />
                ))}
              </div>
              <p className="text-default-600 mt-2">{bookingDetails?.hotelAddress}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-default-200 rounded-lg p-4 text-center">
                <p className="text-default-600 text-sm">Check in</p>
                <p className="text-3xl font-semibold">{chkInDay}</p>
                <p className="text-default-600">{chkInMonth + " "+  moment(hotelBookingDetail?.ChkInDate).format('YYYY')}</p>
              </div>
              <div className="border border-default-200 rounded-lg p-4 text-center">
                <p className="text-default-600 text-sm">Check out</p>
                <p className="text-3xl font-semibold">{chkOutDay}</p>
                <p className="text-default-600">{chkOutMonth + " " + chkOutYear}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stay Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-3 bg-content2 rounded-lg">
            <p className="text-default-600 text-sm">Stay:</p>
            <p className="font-medium">{nights +  " "+"nights"}</p>
           
          </div>
          <div className="p-3 bg-content2 rounded-lg">
            <p className="text-default-600 text-sm">Room:</p>
            <p className="font-medium">{roomCount + " "+ "room"}</p>
          </div>
          <div className="p-3 bg-content2 rounded-lg">
            <p className="text-default-600 text-sm">Guest:</p>
            <p className="font-medium">{roomChild === 0 ?  '' : <span>{roomChild} {roomChild === 1 ? <span>Children</span> : <span>Childrens</span>}</span>}           
            </p>

          </div>
        </div>

        {/* Guest Details Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Guest Details</h3>
          <Divider className="my-2" />
          {/* Guest details would be populated here */}
        </div>

        <GetHotelGuestDetails roomCount={roomCount} passengerDetails={passengerDetails} roomType={roomType} bedType={bedType} />


        {/* Add Check-in instruction */}
        <div className="mt-6">
          <Card className="bg-danger-50 border-danger-100">
            <CardBody className="p-4">
              <h3 className="text-lg font-semibold text-danger-700">Check-in instruction</h3>
            </CardBody>
          </Card>
        </div>

        {/* Add Cancellation Policy */}
        <div className="mt-4">
          <Card className="bg-danger-50 border-danger-100">
            <CardBody className="p-4">
              <h3 className="text-lg font-semibold text-danger-700">Cancellation Policy</h3>
              <div className="mt-2 text-danger-700 text-sm">
                <p>Cancellations or changes made after Jul 28, 2025 then cancellation charges will be undefined 759.75 Amount.</p>
                <p>Cancellations or changes made after Aug 5, 2025 then cancellation charges will be undefined 759.75 Amount.</p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Add Remarks */}
        <div className="mt-4">
          <Card className="bg-danger-50 border-danger-100">
            <CardBody className="p-4">
              <h3 className="text-lg font-semibold text-danger-700">Remarks</h3>
              <div className="mt-2 text-danger-700 text-sm space-y-2">
                <p>Car park NO. Fees to be paid at hotel: 0.48 GBP. Included: Free self parking. Included: Free WiFi.</p>
                
                <div>
                  <p className="font-medium">Payment information</p>
                  <p>Payable through HOTELBEDS USA, INC, acting as agent for the service operating company, details of which can be provided upon request. VAT: 592952685 Reference: 1130-2080008</p>
                </div>
                
                <div>
                  <p className="font-medium">IMPORTANT REMARK:</p>
                  <p>Invoice Company:HOTELBEDS SWITZERLAND AG(Registration Number-CHE425060629,Code-CHB)</p>
                  <p>VAT number:592952685</p>
                  <p>Reference:1130-2080008</p>
                </div>
                
                <p>Estimated total amount of taxes & fees for this booking:0.70 Euro payable on arrival. Car park NO. Fees to be paid at hotel: 0.65 USD. Included: Free self parking. Included: Free WiFi.</p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Add Print Itinerary Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-danger-500 hover:bg-danger-600 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-colors">
            <Icon icon="lucide:printer" className="w-5 h-5" />
            Print Itinerary
          </button>
        </div>

        {/* Add Customer Support Section */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-center text-blue-800">For Online Customer Support</h3>
          
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="font-medium">Email us:</p>
              <p>Support: <a href="mailto:support@myholidays.com" className="text-blue-600 hover:underline">support@myholidays.com</a>, Cancellation: <a href="mailto:cancel@myholidays.com" className="text-blue-600 hover:underline">cancel@myholidays.com</a></p>
            </div>
            
            <div>
              <p>Date change: <a href="mailto:change@myholidays.com" className="text-blue-600 hover:underline">change@myholidays.com</a>, Refund: <a href="mailto:refund@myholidays.com" className="text-blue-600 hover:underline">refund@myholidays.com</a></p>
            </div>
            
            <div>
              <p className="font-medium">Call us:</p>
              <p>International: +44 20 3011 0027</p>
            </div>
            
            <div>
              <p>United States of America: +1 (646) 860-9579 / +1 (646) 759-2686, Canada: +1 (438) 798 0660, Mexico: +52 (55) 7100 0610</p>
            </div>
            
            <div>
              <p>Spain: +34 918 340 525, France: +33 1 80 14 63 28, German: 08000103909 (toll free), Italy: +390287369850, Switzerland: +41 44 551 05 70, United Kingdom: +442030110027 / +441625200224, Czech Republic: +27 0104 4690 86, Russia: +74996090676</p>
            </div>
            
            <div>
              <p>Australia: +61283787959 / +611800431588, New Zealand: +64 9 971 0669, Singapore: +65 3108 0103, Thailand: +66 6-0002-4246, Philippine: +632 8 2711026, Hong Kong: +852 3018 3740, Malaysia: +60 15 4600 0191</p>
            </div>
            
            <div>
              <p>South Africa: +27 (0) 10446908627</p>
            </div>
            
            <div>
              <p>Qatar: 800 1990 (toll free), UAE: 8000 3110079 (toll free), Saudi Arabia: 800 850 0872 (toll free), Oman: 96880078673 (toll free), Israel: +97233752010 / +97237208914</p>
            </div>
            
            <div>
              <p>Argentina: +54 11 5272 3233, Peru: +34 918 340 525, Colombia: +57 (4) 204-0705</p>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-blue-700">
            <p>You are requested to maintain the subject line containing the myholidays Booking IDwhile interacting with our representatives which will enable us to serve you better.</p>
            <p className="mt-2">For any further assistance please contact us, we are available 24/7.</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Confirmation