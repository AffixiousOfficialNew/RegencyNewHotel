import React from "react";

const GetPassengerInfo = ({ passengerDetails, roomIndex }) => {
  if (!passengerDetails) {
    return (
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  }

  return passengerDetails
    .filter((p) => p.RoomNumber === roomIndex + 1)
    .map((p, index) => (
      <tr key={index}>
        <td>{p.Title}</td>
        <td>{p.FirstName}</td>
        <td>
          {p.LastName}
          {p.PaxType === "C" ? ` (Age - ${p.Age} years)` : ""}
        </td>
      </tr>
    ));
};

const GetGuestInfoHeading = ({ passengerDetails, roomIndex }) => {
  if (!passengerDetails) return null;

  return (
    <div className="oneSection">
      <div className="customerinfo">
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <th>firstname</th>
              <th>lastname</th>
            </tr>
            <GetPassengerInfo passengerDetails={passengerDetails} roomIndex={roomIndex} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GetHotelGuestDetails = ({ roomCount, passengerDetails, roomType, bedType }) => {
  if (!roomCount) return null;

  const isMultipleRooms = roomType?.includes("|") && bedType?.includes("|");

  return (
    <div>
      {Array.from({ length: roomCount }).map((_, index) => (
        <div key={index}>
          <div className="roomType g">
            <div className="roomNo">
              "room" {index + 1}:
            </div>
            <div className="columns">
              <span>
                <strong>roomtypeh</strong>
                {isMultipleRooms
                  ? `${roomType.split("|")[index]}, ${bedType.split("|")[index]}`
                  : `${roomType}, ${bedType}`}
              </span>
            </div>
          </div>
          <GetGuestInfoHeading
            passengerDetails={passengerDetails}
            roomIndex={index}
          />
        </div>
      ))}
    </div>
  );
};

const HotelConfirmationGuestInfo = ({ bookingDetails }) => {
  const bookingResult = bookingDetails || {};
  const passengerDetails = bookingResult.PassengerDetails || [];

  const roomInfo =
    bookingResult?.HotelRooms?.[0]?.ListOfRoom?.[0] || {};

  const roomType = roomInfo.RoomType || "";
  const bedType = roomInfo?.RoomRates?.[0]?.BedTypeDescription || "";
  const roomCount = roomInfo.RoomCount || 0;

  return (
    <div>
      <h3>guestdetails</h3>
      <GetHotelGuestDetails
        roomCount={roomCount}
        passengerDetails={passengerDetails}
        roomType={roomType}
        bedType={bedType}
      />
    </div>
  );
};

export default HotelConfirmationGuestInfo;
