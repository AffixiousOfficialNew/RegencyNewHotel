

import React from 'react'

const HotelConfirmationPageHead = (props) => {
  return (
    <>
      <div className="pageHeading">
      <div className="inner_container">
      <div className="headingBar">
      <h2>Booking Confirmation</h2>
      <button type="button" onClick={props.printItinerary} className="btn printBtn no-print"><i className="mhs mh-print"></i> print itinerary</button>
      </div>
      </div>
      </div>
      <style jsx>
        {`
         .pageHeading{
         display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex
;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 99;
    height: 80px;
    background: #006064;
    -moz-box-shadow: 0 3px 6px rgba(0,0,0,.29);
    -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, .29);
    box-shadow: 0 3px 6px rgba(0, 0, 0, .29);
    color: #fff;
         
         }


         .inner_container {
    width: 1170px;
    margin: 0 auto;
    padding: 0;
}

.pageHeading .headingBar {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex
;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center; }

.btn {
    padding: 9px 10px;
}

.btn {
    cursor: pointer;
    background-color: #b81a52;
    padding: 10px 28px 10px 28px;
    text-align: center;
    outline: 0;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    display: block;
    margin: 0 4px;
    line-height: 16px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    border-radius: 4px;
    float: right;
    -moz-transition: all .5s;
    -ms-transition: all .5s;
    -o-transition: all .5s;
    -webkit-transition: all .5s;
    transition: all .5s;
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ec3878), to(#b81a52));
    background-image: -webkit-linear-gradient(top, #ec3878, #b81a52);
    background-image: -o-linear-gradient(top,#ec3878,#b81a52);
    background-image: linear-gradient(to bottom, #ec3878, #b81a52);
    text-decoration: none;
    text-align: center;
    outline: 0;
    border: 0;
        }

        `}
      </style>
      </>
  )
}

export default HotelConfirmationPageHead

