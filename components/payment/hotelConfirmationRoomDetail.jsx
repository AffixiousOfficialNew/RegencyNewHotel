import React from "react";
import moment from "moment";
import { dateDiff } from "../../services/paymentApi";
// import StarRating from "../../pages/common/StarRating";
// import HotelAminityType from "./HotelAminityType";
// import { dateDiff } from "../../services/paymentApi";


const GetHotelImage = ({ hotelInformation }) => {
  if (!hotelInformation) return null;

  return hotelInformation.HotelImage ? (
    <img
      src={hotelInformation.HotelImage}
      onError={(e) => {
        e.target.src = "/hotels/static/images/image_not_avail_room.png";
      }}
      alt="Hotel"
    />
  ) : (
    <img src="/hotels/static/images/image_not_avail_room.png" alt="Unavailable" />
  );
};

const HotelConfirmationRoomDetail = ({ bookingDetails}) => {
  const bookingResponse = bookingDetails || {};
  const hotelInformation = bookingResponse.HotelInformation || {};
  const hotelBookingDetail = bookingResponse.HotelBookingDetail || {};

  const chkIn = moment(hotelBookingDetail.ChkInDate);
  const chkOut = moment(hotelBookingDetail.ChkOutDate);

  const chkInDay = chkIn.format("DD");
  const chkInMonth = chkIn.format("MMM");
  const chkInYear = chkIn.format("YYYY");

  const chkOutDay = chkOut.format("DD");
  const chkOutMonth = chkOut.format("MMM");
  const chkOutYear = chkOut.format("YYYY");

  const chkInDate = chkIn.format("DD MMM, YYYY");
  const chkOutDate = chkOut.format("DD MMM, YYYY");
  const nights = dateDiff(chkOutDate, chkInDate);

  const roomInfo =
    bookingResponse?.HotelRooms?.[0]?.ListOfRoom?.[0] || {};

  const roomCount = roomInfo.RoomCount || 0;
  const roomAdult = roomInfo.RoomAdult || 0;
  const roomChild = roomInfo.RoomChild || 0;

  return (
    <>
    <div className="room_detail 1">
      <h3>hoteldetails</h3>
      <div className="hotelSummary">
        <div className="img_cnt">
          <GetHotelImage hotelInformation={hotelInformation} />
        </div>
        <div className="hotelDetails">
          <h4>
            <span className="hotelName">{hotelInformation.HotelName || ""}</span>
          </h4>
          <span className="star-rating">
            {/* <StarRating className="active"
              rating={hotelInformation.StarRating ? parseInt(hotelInformation.StarRating) : 0}
            /> */}
          </span>
          <div className="htAddress">
            <span>
              {hotelInformation.HotelAddress}, {hotelInformation.City} -{" "}
              {hotelInformation.PostalCode}
            </span>
          </div>
          <div className="checkinCheckoutDate">
            <div className="date">
              <span>
                <span className="day">
                Checkin <em>{chkInDay}</em>
                </span>
                <span className="month">
                  {" "}
                  {chkInMonth}, {chkInYear}
                </span>
              </span>
            </div>
            <div className="date">
              <span>
                <span className="day">
                  Checkout<em>{chkOutDay}</em>
                </span>
                <span className="month">
                  {chkOutMonth}, {chkOutYear}
                </span>
              </span>
            </div>
            <div className="roomNpax">
              <ul>
                <li>
                  <label>stay</label>
                  <span>
                    {nights}{" "}
                    {nights === 1 || nights === 0
                    ?  "night"
                      : "nights"}
                  </span>
                </li>
                <li>
                  <label>roomh</label>
                  <span>
                    {roomCount}{" "}
                    {roomCount === 1
                      ? "room"
                      : "roomsh"}
                  </span>
                </li>
                <li>
                  <label>guesth</label>
                  <span>
                    {roomAdult}{" "}
                    {roomAdult === 1
                      ? "adult"
                      : "adults" }{" "}
                    {roomChild > 0 && (
                      <>
                        {roomChild}{" "}
                        {roomChild === 1
                          ? "Children"
                          : "Childrens"}
                      </>
                    )}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="htHighlites">
            <div className="ttl">
              Features you'll love &nbsp; &nbsp;
              <img src={`/hotels/static/images/heart.png`} alt="Love" />
            </div>
            <div className="htAmenities">
              {/* <HotelAminityType amenityType={resultDetail.AmenityType || ''} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    <style jsx> {
      `
      .hotelSummary {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex
;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    -webkit-flex-direction: row;
    -moz-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    padding: 50px 0 30px 0;
}

.hotelSummary .img_cnt
Specificity: (0,2,0)
 {
    width: 320px;
    height: 280px;
}

.hotelSummary .img_cnt img {
    width: 100%;
    height: 100%;
}

.img_cnt img {
    width: 100%;
    height: 250px;
    object-fit: fill;
}

.hotelDetails {
    -webkit-box-flex: 2;
    -moz-box-flex
Specifies how a box grows to fill the box that contains it, in the direction of the containing box's layout.
: 2;
    -webkit-flex: 2;
    -ms-flex: 2;
    flex: 2;
    padding-left: 15px; }

    .hotelDetails .star-rating {
    display: inline-block;
    font-size: 14px;
}

.hotelDetails .htAddress {
    font-size: 14px;
    font-weight: 400;
    color: #111;
    line-height: 18px;
    padding: 8px 0;
}

.checkinCheckoutDate {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex
;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    -webkit-flex-direction: row;
    -moz-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: end;
    -ms-flex-align: end;
    -webkit-align-items: flex-end;
    -moz-align-items: flex-end;
    align-items: flex-end;
    padding-top: 15px; }

    .checkinCheckoutDate .date {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    border: 1px solid #e5e5e5;
    font-size: 14px;
    font-weight: 400;
    color: #414141;
    text-align: center;
    margin-right: 20px; }

    .roomNpax {
    -webkit-box-flex: 3;
    -moz-box-flex: 3;
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 3;
    font-size: 14px;
    color: #414141;
    font-weight: 400;
}

{
    list-style: none;
    margin: 0;
    padding: 0;
}

.roomNpax li {
    line-height: 40px;
    border-bottom: 1px solid #ebebeb;
}

.roomNpax label {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    margin: 0;
}
      
      `}

    </style>
    </>
  );
};

export default HotelConfirmationRoomDetail;
