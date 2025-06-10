"use client";
import React, { useState, useEffect } from "react";
import HotelConfirmationPageHead from "../../components/payment/hotelConfirmationPageHead";
import HotelConfirmationThankMsg from "../../components/payment/hotelConfirmationThankMsg";
import Confirmation from "../../components/payment/confirmation";
import Head from "next/head";
import { 
  BOOKING_STATUS,
  BOOKING_STATUS_ENABLE,
  CULTURE_STYLE_PATH,
  CULTURE_LABEL_LIST,
  CULTURE_LOCALE,
  getBookingDetails,
  getCookie,
} from "../../services/paymentApi";
import axios from "axios";
var CryptoJS = require("crypto-js");

const ENC_SECRET_KEY = process.env.NEXT_PUBLIC_ENC_SECRET_KEY;

const HotelConfirmationComponent = () => {
  const [bookingData, setBookingData] = useState(null);

  const [state, setState] = useState({
    bookingId: "",
    culture: process.env.NEXT_PUBLIC_DEFAULT_CULTURE,
    cultureStylePath: "",
    cultureLabel: "",
    wegoClickId: "",
    isFindBooking: false,
    bookingStatus: null,
    confirmStatus: "",
    currentYear: new Date().getFullYear(),
    bookingDetails: {},
    isOpenSelectedCurrency: false,
    isOpenCulture: false,
    CustomerTrackState: {
      CustomerID: getCookie("TrackSearchId") || "",
      SearchID: getCookie("customerId") || "1",
      WebsiteID: "0",
      CultureID: 0,
      IPAddress: "",
      DestinationCode: "",
      CheckIn: "",
      CheckOut: "",
      TotalRoom: 0,
      DestinationCity: "",
      Category: "",
      TotalAdult: 0,
      TotalChild: 0,
      Zone: "",
      Country: "",
      CountryCode: "",
      AffiliateID: 0,
      ClickedRoomCurrency: "",
      ClickedRoomAmount: "",
      HotelListPageDtTm: "",
      HotelListPageURL: "",
      HotelID: "",
      HotelListSearchKey: "",
      Latitude: "",
      Longitude: "",
      HotelDetailPageDtTm: "",
      HotelDetailPageURL: "",
      TotalRoomAvailable: 0,
      IsRefundable: 0,
      TotalNightStay: 0,
      HotelPaymentDtTm: "",
      HotelPaymentPageURL: "",
      RepriceKey: "",
      RoomID: "",
      RateID: "",
      GrandTotalCurrency: "",
      GrandTotalAmount: "",
      IsClickOnBook: false,
      IsClickOnSelect: false,
      RoomType: "",
      BedType: "",
      PD_Title: "",
      PD_FirstName: "",
      PD_LastName: "",
      PD_MobileNumber: "",
      PD_EmailAddress: "",
      PD_CountryCode: "",
      PD_Nationality: "",
      GrossProfirPrice: "",
      MarketingFeesPrice: "",
      SubTotalPrice: "",
      UtmSource: "",
      UtmMedium: "",
      UtmCampaign: "",
      TrackingBrowser: "",
      TrackingDevice: "",
      IsClickOnMakePayment: false,
      OperationFlag: "Hotellist"
    }
  });

  const fetchBookingDetailsHandler =  async () => {
      try {
        const response = await axios.get(
          'https://prodapi.myholidays.com/hotelsearch/api/search/GetBookingDetails?bookingId=1730689'
        );
        setBookingData(response.data);
      } catch (err) {
        console.error('Error fetching booking details:', err);
      } finally {
       
      }
    };
  

  useEffect(() => {
    initializeComponent();
    fetchBookingDetailsHandler();
  }, []);

  const initializeComponent = () => {
    const encObj = "VTJGc2RHVmtYMS85N2duSGJBYXpBMlR0KzNsUFE3M2pKSkk4NnRSZ2trUUtRM2xiVHJXZmw4dVZVaTRZZE1Xc1NMVkFMeGR0OFdzMkpuNFZGQzBPUnc9PQ%3D%3D" || "";
    let decData = CryptoJS.enc.Base64.parse(encObj)
    const bytes = CryptoJS.AES.decrypt(decData, ENC_SECRET_KEY);
    const decryptedData =
      bytes.sigBytes && bytes.sigBytes > 0
        ? JSON.parse(bytes)
        : {};

    const culture = decryptedData.culture || process.env.NEXT_PUBLIC_DEFAULT_CULTURE;
    const cultureStylePath = CULTURE_STYLE_PATH[culture];
    const cultureLabel = CULTURE_LABEL_LIST[culture];

    setState(prev => ({
      ...prev,
      bookingId: decryptedData.bookingId || "",
      culture,
      cultureStylePath,
      cultureLabel,
      wegoClickId: decryptedData.wegoClickId || "",
      isFindBooking: decryptedData.isFindBooking || false,
      bookingStatus: decryptedData.bookingStatus || null
    }));

    if (decryptedData.bookingStatus) {
      const confirmStatus = BOOKING_STATUS_ENABLE[decryptedData.bookingStatus] || "Under Process";
      setState(prev => ({ ...prev, confirmStatus }));
    }

    fetchBookingDetails(decryptedData.bookingId);
  };

  const fetchBookingDetails = (bookingId) => {
    if (bookingId) {
      getBookingDetails(bookingId)
        .then((res) => {
          setState(prev => ({
            ...prev,
            bookingDetails: res?.data || {}
          }));
        })
        .catch(console.log);
    }
  };

  const printItinerary = () => {
    window.print();
  };

  const onLanguageChange = () => {
    const cultureStylePath = CULTURE_STYLE_PATH[state.culture];
    const cultureLabel = CULTURE_LABEL_LIST[state.culture];
    const language = CULTURE_LOCALE[state.culture];
    i18n.changeLanguage(language);
    setState(prev => ({
      ...prev,
      cultureStylePath,
      cultureLabel
    }));
  };

  return (
    <div>
      <Head>
        <meta name="google" content="notranslate" />
        <title>hotelconfirmationtitle</title>
        <link href={`/hotels/static/styles/${state.cultureStylePath}/hotelconfirmation.css`} rel="stylesheet" />
        <link href={`/hotels/static/styles/${state.cultureStylePath}/common.css`} rel="stylesheet" />
      </Head>

      <HotelConfirmationPageHead
        printItinerary={printItinerary}
        
      />

      <section className="frContainer" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <div className="inner_container" style={{padding:"0px 0px", width:"1000px"}}>
          <div className="mhConfirmationPanelm shadow-md">
            <HotelConfirmationThankMsg
              bookingDetails={state.bookingDetails}
              bookiingStatus={BOOKING_STATUS}
             
              confirmStatus={state.confirmStatus}
            />
            <Confirmation bookingData={bookingData} />
          </div>
        </div>
      </section>
    </div>
  );
};

HotelConfirmationComponent.getInitialProps = ({ query }) => {
  return { query, namespacesRequired: ["common"] };
};

export default HotelConfirmationComponent;
