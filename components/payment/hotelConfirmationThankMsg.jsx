import React from "react";
import imageIcon from "../../app/assets/hotel_img.png";
import Image from "next/image";

const GetBookingStatus = ({ bookingDetails, bookiingStatus}) => {
 {
    return (
      <div className="successMsg" style={{fontSize:"36px", lineHeight:"43px",color: "#006d1d", fontWeight:"300"}}>
       Your Booking is
        {
          bookiingStatus[
            "3"
          ]
        }
      </div>
    );
  } 
};

const HotelConfirmationThankMsg = ({ bookingDetails, bookiingStatus, translation, confirmStatus }) => {
  return (
    <>
    <div className="alignCenter">
      <div>
        <Image src={imageIcon} alt="image"  title="image" unoptimized className="image" />
      </div>
    </div>
    <style jsx>
      {`
      .successMsg {
    font-size: 36px;
    line-height: 43px;
    color: #006d1d;
    font-weight: 300;
    margin: 20px 0;
}     

.txtThanks {
    color: #515151;
    font-size: 22px;
    line-height: 29px;
    text-align: center;
    font-weight: 300;
    margin: 0;
}

.txtThanks .txt {
    display: block;
}

.txtThanks .mhId {
    font-weight: 500;
    white-space: nowrap;
}
    .alignCenter .image {
    display:flex,
    align-items:center,
    justify-content:center
    }
      
      `}
    </style>
    </>
  );
};

export default HotelConfirmationThankMsg;
