import React from "react";
import HotelCancellationPolicy from "../../components/payment/hotelCancellationPolicy";

const GetCheckInInst = ({ checkInInstructions }) => {
  return checkInInstructions ? (
    <span dangerouslySetInnerHTML={{ __html: checkInInstructions }} />
  ) : null;
};

const HotelConfirmationCancelpolicy = ({ bookingDetails }) => {
  const hotelRoomsInfo =
    bookingDetails?.HotelRooms?.[0]?.ListOfRoom?.[0]?.RoomRates?.[0] || {};

  const isRoomRefundable = hotelRoomsInfo?.IsRoomrefundable;
  const listOfCnxPolicy = hotelRoomsInfo?.ListOfCnxPolicy || '';
  const rateComments = hotelRoomsInfo?.RateComments || '';

  const checkInInstructions =
    bookingDetails?.HotelInformation?.checkInInstructions || '';

  return (
    <div>
      <div className="checkinIns cancelIns">
        <h3>checkininstruction</h3>
        <ul>
          <GetCheckInInst checkInInstructions={checkInInstructions} />
        </ul>
      </div>

      <div className="checkinIns cancelIns">
        <h3>cancellationpolicy</h3>
        {isRoomRefundable ? (
          <HotelCancellationPolicy
            listOfCnxPolicy={listOfCnxPolicy}
            translation={translation}
          />
        ) : (
          <div>
            <ul>
              <li>bookingisnonrefundable</li>
            </ul>
            <div className="cnxNote">
              <b>note</b>{" "}
            hepropertymakesnorefundsfornoshowsorearlycheckouts
            </div>
          </div>
        )}
      </div>

      {rateComments && (
        <div className="checkinIns cancelIns">
          <h3>Remarks</h3>
          <div dangerouslySetInnerHTML={{ __html: rateComments }} />
        </div>
      )}
    </div>
  );
};

export default HotelConfirmationCancelpolicy;