"use client"
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { ContactDetails } from "./contactDetails";
import { GuestDetails } from "./guestDetails";
import { PriceDetails } from "./priceDetails";
import {HotelDetails} from "./hoteDetail";
import { ReviewPayment } from "./reviewPayment";
import{PaymentForm} from "./paymentForm";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { Country_Names, customerWhiteListApi, fetchApplePayStatus, fetchCardTypes, FRAUD_BODY, FraudToolDecideApi, getSelectedRoomDetails, makeBooking, paymentCapture, paymentFail, paymentFraudToolOrderCancel, paymentFullfill, paymentSuccess, paymentVoidHandler, whiteListResponseENUM } from "../../services/paymentApi"
import GTagIframe from "../GTagIfram";
import GTag from "../../helpers/Gtag";
import Analytics from "../../helpers/Analytics";
import { useSearchParams } from 'next/navigation';

// import Head from "next/head";
// import { useRouter } from "next/router";
import CryptoJS from 'crypto-js';
import { useRouter } from "next/navigation";
import Head from "next/head";
import moment from "moment";
import { useSelector } from "react-redux";
// import {Alert} from "heroui"
import { Alert } from "@heroui/react";

 
export default function Index() {
const [secondForm, setSecondForm] = useState(1);
const [allData, setAllData] = useState({
  contact: {},
  guests: [],
  payment: {},
});
const[currentYear, setCurrentYear] = useState();
  const [status, setStatus] = useState(null);
  const [cardList, setCardList] = useState([]);
  const [cardTypes, setCardTypes] = useState([]);
  const[ipAddress, setIpAddress] = useState();
  const[data, setData] = useState({priceDetails:"", hotelDetails:"", paymentDetails:""});
  const[roomData, setRoomsData] = useState({priceDetails:"", hotelDetails:"", paymentDetails:""});
  const [valueSet, setvalueSet] = useState({cultureLabel:"", cultureStylePath:"", wegoClickId:""});
 const[savedDiscount, setSavedDiscount] = useState(0);
  // const queryParams = useMemo(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   return {
  //     searchKey: params.get('searchKey'),
  //     roomID: params.get('roomID'),
  //     hotelID: params.get('hotelID'),
  //     rateID: params.get('rateID'),
  //     culture: params.get('culture'),
  //     utmSource: params.get('utm_source'),
  //     utmMedium: params.get('utm_medium'),
  //     wegoClickId: params.get("wego_click_id") || ""
  //   };
  // }, []);

  const searchParams = useSearchParams();

  const searchKey = searchParams.get('searchKey');
  const roomID = searchParams.get('roomID');
  const hotelID = searchParams.get('hotelID');
  const rateID = searchParams.get('rateID');
  const culture = searchParams.get('culture');
  const utmSource= searchParams.get('utm_source');
  const utmMedium= searchParams.get('utm_medium');
const isPymentFalse = searchParams.get("isFailedPayment")
  const wegoClickId=searchParams.get("wego_click_id") || ""
  
  const hotelInfo = useSelector((state)=> state?.details);
  const hotelDetailsInfo = hotelInfo?.detailResult;

  const router = useRouter();
  const[saveBookingData , setSaveBookingData] = useState({bookingId:'', posId:""});

  const [whiteListApiData, setWhiteListApiData] = useState();


  const randomTrackId = `HO${Math.floor(Math.random() * 10_00_000)}_${saveBookingData?.bookingId}`
    const [paymentProcess,setPaymentProcess]  = useState({
    isProcessingPayment: false,
    addProgressClass: false,
    disableButton: false,
    isFailedPayment: false,
  })

  const fetchStatusHandler = async () => {
    try {
      const data = await fetchApplePayStatus();
      setStatus(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    setPaymentProcess({
      isProcessingPayment: false,
      addProgressClass: false,
      message: "",
      disableButton: false,
      isFailedPayment: isPymentFalse,
    })
  }, [isPymentFalse])
 


  const fetchCardTypesHnadler = async () => {
    try {
      const types = await fetchCardTypes({
        AffiliateID: '',
        Browser: 'Chrome',
        PaymentCurrency: globalCurrency,
        PaymentSecretKey: '2ccfc78f5d9d4cdcb128aa9a6db9b6d6',
      });
      setCardTypes(types);
    } catch (err) {
      console.error('Failed to load card types:', err);
    }
  };

const fetchRoomDetails = async () => {
  try {
    const hotelDetails = await getSelectedRoomDetails({
      SearchKey: searchKey,
      ROOMID: roomID,
      HotelID: hotelID,
      rateID: rateID,
    });

    setData((prev) => ({ ...prev, hotelDetails }));
    setRoomsData((prev) => ({ ...prev, hotelDetails }));
    if(!hotelDetails?.HotelRooms) {
    setTimeout(()=> {
      router?.back();
    },5000);
     
    }

    
  } catch (err) {
    console.error('Error loading selected room:', err);
  }
};

const getCurrentYearHandler =  () => {
    var date = new Date();
    var year = date.getFullYear();
     setCurrentYear(year)
  
}

const getIpAddressHandler = () => {
  axios.get('https://api.ipify.org/?format=json')
      .then((res) => {
        var ipAddress = res.data && res.data.ip ? res.data.ip : '';
        setIpAddress(ipAddress)
      }).catch(error => {
        console.log('error in getting IP Address: ',error)
      });
  
}
 const CULTURE_STYLE_PATH = {
  'en-GB': "lefttoright",
  'it-IT': "lefttoright",
  'fr-FR': "lefttoright",
  'pt-PT': "lefttoright",
  'es-ES': "lefttoright",
  'de-DE': "lefttoright",
  'ar-QA': "righttoleft"
};

 const CULTURE_LABEL_LIST = {
  'en-GB': "English",
  'it-it': "Italiano",
  'fr-fr': "Franais",
  'es-es': "Espaol",
  'de-de': "Deutsche",
  'pt-pt': "Portugus",
  'ar-QA': "العربية"
};

 const CULTURE_LOCALE = {
  'en-GB': "en",
  'it-it': "it",
  'fr-fr': "fr",
  'es-es': "es",
  'de-de': "de",
  'pt-pt': "pt",
  'ar-QA': "ar"
};

const languageChangeHandler = (isPageLoad) => {
    const cultureStylePath = CULTURE_STYLE_PATH[culture];
    const cultureLabel = CULTURE_LABEL_LIST[culture];
    const language = CULTURE_LOCALE[culture];
    // i18n.changeLanguage(language);
    setvalueSet({...valueSet, cultureLabel:cultureLabel, cultureStylePath:cultureStylePath});
    if (!isPageLoad) {
      // if (this.state.wegoClickId) {
      //   window.location.href='/hotels/hotelpayment?searchKey=' + searchKey + '&roomID=' + this.state.roomID + '&hotelID=' + this.state.hotelId + '&rateID=' + this.state.rateID+ '&culture=' + this.state.culture+ '&wego_click_id=' +this.state.wegoClickId+ '&isFailedPayment=' +this.state.isFailedPayment+ '&bookingId=' +this.state.bookingId
      // } else {
      //   window.location.href='/hotels/hotelpayment?searchKey=' + this.state.searchKey + '&roomID=' + this.state.roomID + '&hotelID=' + this.state.hotelId + '&rateID=' + this.state.rateID+ '&culture=' + this.state.culture+ '&isFailedPayment=' +this.state.isFailedPayment+ '&bookingId=' +this.state.bookingId
      // }
  }
}


  // Step 4: Call the fetch function inside useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
    languageChangeHandler(true);
    fetchStatusHandler();
    fetchCardTypesHnadler();
    fetchRoomDetails();
    getCurrentYearHandler();
    getIpAddressHandler();
  }, []);

  const DEFAULT_CURRENCY = "QAR";
  const DEFAULT_PRICE = 1;
  const isRefundable = false;


const 
  form = useForm();

  const {handleSubmit, watch, value, setvalue, error={}}  =form
const onSubmit = (d) => {
  if(secondForm == 1){
    setSecondForm(2)
  }else{
    makePayment()
     console.log("d", d)
  }
 

};

const transformGuestsToPassengerDetails = (guests = []) => {
  const passengerDetails = [];
  const mainTravellerMap = {};

  guests.forEach((guest, index) => {
    const roomNumber = guest.room || 1;
    const isMainTraveller = !mainTravellerMap[roomNumber];

    if (isMainTraveller) {
      mainTravellerMap[roomNumber] = true;
    }

    passengerDetails.push({
      Age: 0,
      DOB: null,
      FirstName: guest.firstName || "",
      LastName: guest.lastName || "",
      HotelPassengerID: 0,
      IsMainTraveller: isMainTraveller,
      Nationality: "AL",
      PaxOrder: index + 1,
      PaxType: "A",
      RoomNumber: roomNumber,
      Title: guest.title || "",
    });
  });

  return passengerDetails;
};
const saveBookingDetails = async () => {
  var supplierPriceInClientCurrency = 0;
  var supplierBaseFare = 0;
  var taxes = 0;
  var additionalSupplierPrice = 0;
  var taxMarkup = 0;
  var ApplyDiscount = 0;
  var Discount = 0;
  var supplierTax = 0;
  const dateDiff = (endDate, startDate) => {
    if (endDate && startDate) {
      return moment(endDate).diff(moment(startDate), "days");
    } else {
      return "";
    }
  }
  let checkInDate = data?.hotelDetails && data?.hotelDetails.Hotelsearchrequest && data?.hotelDetails.Hotelsearchrequest.ChkInDate ? moment(data?.hotelDetails.Hotelsearchrequest.ChkInDate).format('YYYY-MM-DD') : '';
  let checkOutDate =data?.hotelDetails && data?.hotelDetails.Hotelsearchrequest && data?.hotelDetails.Hotelsearchrequest.ChkOutDate ? moment(data?.hotelDetails.Hotelsearchrequest.ChkOutDate).format('YYYY-MM-DD') : '';

  var nights = dateDiff(checkOutDate, checkInDate);
   data?.hotelDetails.HotelRooms[0].ListOfRoom.forEach(function (room, index) {
    supplierPriceInClientCurrency += ((room.RoomRates[0].RoomPrice * nights) * room.RoomCount);
    supplierBaseFare += room.RoomRates[0].SupplierBaseFare;
    taxes += room.RoomRates[0].EXSurcharge;
    supplierTax += room.RoomRates[0].SupplierTaxes;
    if (room.RoomRates[0].PriceSummary && room.RoomRates[0].PriceSummary.length > 0) {
        room.RoomRates[0].PriceSummary.forEach(function (psummary, pIndex) {
            taxes += psummary.Value
        });
    }
    supplierPriceInClientCurrency += taxes;
    additionalSupplierPrice += ((room.RoomRates[0].PriceMarkup * nights) * room.RoomCount);
    taxMarkup += room.RoomRates[0].TaxMarkup;

    // if (AppliedDiscount) {
    //     Discount = ((supplierPriceInClientCurrency + additionalSupplierPrice + taxMarkup) * AppliedDiscount) / 100;
    // } else {
    //     Discount = ApplyDiscount;
    // }
});

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
  const formData =watch();
  const bookingData = {
    BookingID: 0,
    EmailAddres: formData?.email,
    MobileNumber:formData?.mobile,
    CountryCode: formData?.countryCode,
    TravelRequestId: 0,
    CultureId: 186,
    IsBookingNonRefundable: false,
    Hotelsearchrequest: null,
    BookingToken: null,
    RePriceRequest: false,
    AffliateTDUID: data?.hotelDetails && data?.hotelDetails.wegoClickId ? data?.hotelDetails.wegoClickId : '',
    AffliateID : data?.hotelDetails?.AffiliateId,
    RepriceKey :data?.hotelDetails?.RepriceKey,
    HotelFareDetails: {
      HotelFareDetailID: 0,
      SupplierBaseFare: supplierBaseFare,
      SupplierTaxes: supplierTax,
      SupplierCurrency: data?.hotelDetails?.HotelRooms[0].ListOfRoom[0].RoomRates[0].SupplierCurrency,
      ClientCurrency: data?.hotelDetails?.HotelRooms[0].ListOfRoom[0].RoomRates[0].Currency,
      UserCurrency: data?.hotelDetails?.Hotelsearchrequest.CurrencyCode,
      Supplier2ClientCurrencyExchangeRate: 0.2732,
      Client2UserCurrencyExchangeRate: 0,
      SupplierPriceInClientCurrency: supplierPriceInClientCurrency,
      AdditionalSupplierPrice: additionalSupplierPrice,
      AdditionalSupplierTaxPrice: taxMarkup,
      Discount: Discount,
      AgencyFee: 0,
      BankTransactionFee: 0,
      TotalSellingInClientCurrency: (supplierPriceInClientCurrency + additionalSupplierPrice + additionalSupplierPrice + 0) - Discount,
      TotalSellingInUserCurrency: 0,
      RoundOff: 0,
      TotalSellingWithRoundOff: 0,
      AgencyMarkup: 0,
      AgencyAdditionalMarkup: 0,
      CustomerExchangeRate: 1,
      CustomerPaymentCurrency: data?.hotelDetails?.Hotelsearchrequest.CurrencyCode
    },
    PassengerDetails: transformGuestsToPassengerDetails(formData?.guests),
    PaymentDetails: {
      BookingCreditCardDetail: {
        PaymentID: 0,
        CreditCardID: 0,
        CardType: formData?.cardType,
        CardNumber: formData?.cardNumber,
        CardExpiryMonth: formData?.expiryMonth,
        CardExpiryYear: formData?.expiryYear,
        CardHolderName: formData?.firstName,
        CVVNumber: formData?.cvv,
        IsActive: 1,
        UserID: 0,
        IsCardSelectedForFuturePayment: 0,
        Amount: "22593.31",
        subCardType: formData?.cardType,
        BinCountryCode: "",
        NickName: ""
      },
      BillingInfo: {
        FirstName: formData?.firstName,
        MiddleName: "",
        LastName: formData?.lastName,
        Street1:formData?.street,
        EmailAddress: formData?.email,
        MobileNumber: formData?.mobile,
        IPAddress: "14.99.232.131",
        Address1: "453454",
        Address2: "",
        Country: formData?.country,
        City: formData?.city,
        State: "fghghfgh",
        CountryCode: formData?.countryCode,
        ZipCode: formData?.ZipCode,
        PassportNumber: "",
        BillingPhoneCountry: "",
        AlterNateEmailAddress: ""
      }
    },
    utmSource: "referral",
    utmMedium: "localhost"
  };

  try {
    const response = await axios.post(
      'https://prodapi.myholidays.com/hotelbook/api/book/SaveBookingDetails',
      bookingData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = (response && response.data && response.data == -1 ? '' : response.data).split('-');
    setSaveBookingData({...saveBookingData, bookingId:data?.[0], posId:data?.[1]});
  } catch (error) {
    setPaymentProcess(pre => ({
      ...pre,
      isProcessingPayment: false,
      addProgressClass: false,
      disableButton: false,
      isFailedPayment: "true",
    }));
    if (error.response) {
      // Server responded with status code outside 2xx
      console.error("❌ Booking Error - Response:", error.response.data);
    } else if (error.request) {
      // Request was made but no response
      console.error("❌ Booking Error - No Response:", error.request);
    } else {
      // Something else went wrong
      console.error("❌ Booking Error:", error.message);
    }
  }
};

const paymentAuthRequestHandler = async () => {
  const formData = watch();
  const dummy = {
    // Attempt3D: whiteListApiData?.apiRes?.data,
    Attempt3D:1,
    PaymentMethod: 2,
    TrackID: randomTrackId,
    PaymentCurrency:globalCurrency,
    // data?.hotelDetails?.HotelRooms[0].ListOfRoom[0].RoomRates[0].SupplierCurrency,
    PaymentAmount: data?.hotelDetails?.HotelRooms?.[0]?.TotalPrice,
    Udf1: "25160",
    CardDetail: {
      CardType: formData?.cardType,
      CARDNUMBER:formData?.cardNumber,
      CVV: formData?.cvv,
      CARDEXPIRY: `0${formData?.expiryMonth}/${formData?.expiryYear?.toString().slice(-2)}`,
      CardHolderFirstName: formData?.firstName,
      CardHolderLastName: formData?.firstName
    },
    BillingDetail: {
      Street: formData?.street,
      HouseNumber: "K-23",
      Country: formData?.country,
      City: formData?.city,
      State: formData?.state,
      ZipCode: formData?.zip
    },
    OrderDetail: [
      {
        Description: "Test Hotel - HTL0001"
      }
    ],
    Customer: {
      DialCode: formData?.countryCode,
      ContactNumber:formData?.mobile,
      EmailAddress: formData?.email,
      IPAddress: "14.99.232.132",
      FirstName: formData?.firstName,
      LastName: formData?.lastName
    }
  };
 
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_PAYMENT_URL}/Charge`,
      dummy, // this is the body
      {
        headers: {
          'Authorization': process.env.NEXT_PUBLIC_AUTH_AUTHORIZATION,
          'Content-Type': 'application/json',
        }
      }
    );
    console.log("Decision", response?.data?.Model?.Decision)
    if(response?.data?.Model?.Decision == "REJECT") {
      setPaymentProcess((pre) => ({
        ...pre,
        isProcessingPayment: false,
        addProgressClass: false,
        disableButton: false,
        isFailedPayment: true,
      }));
    }
    return  response.data
  } catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("Payment error response:", error.response?.data);
    setPaymentProcess((pre) => ({
      ...pre,
      isProcessingPayment: false,
      addProgressClass: false,
      disableButton: false,
      isFailedPayment: true,
    }));
    return { apiSucceed: false, apiRes: error.response?.data };
    
  } else {
    console.error("Unexpected error:", error);
    return { apiSucceed: false, apiRes: error };
  }
}
};
 
const globalCurrency = useSelector((state) => state.listing.currency)

 
  const startPaymentFlow = async () => {
   const formData = watch();
   console.log("dataaaa", data, formData);
    const whiteListResponse = await customerWhiteListApi({
      TravelItineraryItemID: saveBookingData?.posId, //--non air
      TravelItineraryID: 0, //-- air
      IsBookingRefundable: data?.hotelDetails?.HotelRooms[0]
      .ListOfRoom[0].RoomRates[0].IsRoomrefundable,
      TotalSellingAmountIUC: GrandTotal ||  DEFAULT_PRICE,
      SellingCurrencyCode: globalCurrency || DEFAULT_CURRENCY,
      EmailAddress: formData?.email,
      FullBinNumber:  formData?.cardNumber,
      FirstFourDigit: null,
      LastFourDigit: null,
      CardHolderName: formData?.firstName,
      MobileNumber: `${formData?.countryCode} ${formData?.mobile}`,
      BookingSourceTypeID: 8,
      DeviceTypeID: window.outerWidth <= 768 ? 4 : 3,
    }) 
    if (whiteListResponse?.apiSucceed) {
      console.log("blocked customer");
      setPaymentProcess((pre) => ({
        ...pre,
        isProcessingPayment: false,
        addProgressClass: false,
        disableButton: false,
        isFailedPayment: false,
      }));

      setWhiteListApiData(whiteListResponse)
      // return;
    }
    let runFraudTool = true;
    if (
      whiteListResponse?.apiSucceed &&
      whiteListResponse.apiRes === whiteListResponseENUM.whiteListed
    ) {
      runFraudTool = false;
    } else if (
      whiteListResponse.apiSucceed &&
      whiteListResponse.apiRes === whiteListResponseENUM.notWhiteListed
    ) {
      runFraudTool = true;
    }
    const chargeApiRes = await paymentAuthRequestHandler() 
     //  &&
    //   (chargeApiRes?.Model?.Decision === "ACCEPT" ||
    //     chargeApiRes?.Model?.IsAttempt3D)
    if (
      `${chargeApiRes?.HttpStatusCode}` === "200"
     
    ) {
      const countryCode =
        Country_Names?.find(
          (i) =>
            i.value.toLowerCase() === data?.nationality?.toLowerCase()
        )?.code || "00";

        console.log("enter the body");

        const guestDetails = {
          adult: [],
          child: []
        };
        
        formData?.guests.forEach(guest => {
          const mappedGuest = {
            guestFirstName: guest.firstName,
            guestLastName: guest.lastName
          };
        
          if (guest.type === "adult") {
            guestDetails.adult.push(mappedGuest);
          } else if (guest.type === "child") {
            guestDetails.child.push({
              ...mappedGuest,
              age: guest.age
            });
          }
        });

        const passengerBody = guestDetails.adult.map(i => {
          return {
            Firstname: i.guestFirstName,
            Lastname: i.guestLastName,
            DateOfBirth: null,
            NationalityCode: formData?.nationality,
            DocumentNumber: "",
            DocumentType: "",
            DocumentIssueDate: null,
            DocumentExpirationDate: null,
            PassengerType: "Adult",
            DocumetType:""
          };
        });
        const childPassengerBody = guestDetails.child.map(i => ({
          Firstname: i.guestFirstName,
            Lastname: i.guestLastName,
            DateOfBirth: null,
            NationalityCode: formData?.nationality,
            DocumentNumber: "",
            DocumentType: "",
            DocumentIssueDate: null,
            DocumentExpirationDate: null,
            PassengerType: "Child",
            DocumetType:""
        }));
const passengerBodyArray = [...passengerBody, ...childPassengerBody];
      const language = "en";
      // const FraudBody = {
      //   trackid: data?.TrackID,
      //   TotalPrice:  data?.hotelDetails?.HotelRooms?.[0]?.TotalPrice,
      //   Currency: data.currency || DEFAULT_CURRENCY,
      //   CustomerIP:data?.UserIPAddress,
      //   DevicePrintingId: data?.TrackID,
      //   bookingId: data?.bookingId,
      //   CountryCode: countryCode,
      //   NumberOfGuests:
      //     data?.adultCount +
      //     data?.childCount ,
      //   passengerBody: passengerBody,
      //   posId: data.posId,
      // };
 
      // let fraudRequestBody = {
      //   TrackID: FraudBody.trackid,
      //   Source: "WEB",
      //   TotalPrice: FraudBody.TotalPrice,
      //   Currency: FraudBody.Currency,
      //   CustomerIP: FraudBody.CustomerIP,
      //   VendorName: "Moneta",
      //   Email: data?.email,
      //   DevicePrintingId: FraudBody.trackid,
      //   CartToken: "",
      //   Udf1: `${FraudBody.posId}-343`,
      //   Udf2: FraudBody.trackid,
      //   Udf3: "Pre-Auth",
      //   BillingAddress: {
      //     FirstName: data?.passengerDetail[0]?.adults[0]?.firstName,
      //     LastName:data?.passengerDetail[0]?.adults[0]?.lastName,
      //     Address1:data?.passengerDetail[0]?.adults[0]?.nationality,
      //     Country: data?.passengerDetail[0]?.adults[0]?.nationality,
      //     CountryCode: FraudBody.CountryCode,
      //     Phone: data?.phone,
      //     City: data?.departureCity,
      //     Province: FraudBody.CountryCode,
      //     ProvinceCode: FraudBody.CountryCode,
      //     ZipCode: '',
      //   },
      //   LineItems: [
      //     {
      //       Title: "fgdfgg",
      //       Price: 4564,
      //       ProductId: 5634545354,
      //       QuantityPurchased: 1,
      //       Sku: null,
      //       Condition: null,
      //       SubCategory: null,
      //       Category: "win",
      //       ProductType: 7,
      //       Brand: null,
      //       DeliveredTo: null,
      //       DeliveredAt: null,
      //       TravelTicketLineItem: null,
      //       AccommodationLineItem: null,
      //     },
      //   ],
      //   PaymentDetails: {
      //     CreditCardBin:  formData?.cardNumber?.toString().slice(0, 6),
      //     CreditCardNumber: `XXXX-XXXX-XXXX-${ formData?.cardNumber
      //       ?.toString()
      //       .slice(-4)}`,
      //     CreditCardCompany: data?.cardType,
      //   },
      //   Customer: {
      //     Email: data?.Email?.toUpperCase(),
      //     // Email : "sunil.kumar@myholidays.com",
      //     VerifiedEmail: true,
      //     FirstName: data?.passengerDetail[0]?.adults[0]?.firstName,
      //     LastName: data?.passengerDetail[0]?.adults[0]?.lastName,
      //     Id: `${FraudBody.bookingId}`,
      //     CreatedAt: new Date().toISOString(),
      //   },
      //   ClientDetails: {
      //     AcceptLanguage: 'en',
      //     UserAgent: null,
      //   },
      //   Passengers: FraudBody.passengerBody,
      // };
 
      let decideBody ={
    "TrackID":randomTrackId,
    "Source": "Mobile",
    "TotalPrice": roomData?.hotelDetails?.HotelRooms?.[0]?.TotalPrice,
    "Currency": "QAR",
    "CustomerIP": "14.99.232.131",
    "VendorName": "Moneta",
    "Email": formData?.email,
    "DevicePrintingId": "IOS-payment_99907347",
    "CartToken": "",
    "ClientDetails": {
      "AcceptLanguage": null,
      "UserAgent": null
  },
    "Udf1": "12298",
    "ActiveFraudToolVendorID":0,
    "Udf2": "",
        "Udf3": "Post-Auth",
    "BillingAddress": {
        "FirstName": formData?.firstName,
        "LastName": formData?.lastName,
        "Address1": formData?.street,
        "Country": formData?.country,
        "CountryCode": formData?.country,
        "Phone": formData?.mobile,
        "City": formData?.city,
        "Province": "Fedsf",
        "ProvinceCode": "Fedsf",
        "ZipCode": formData?.zip,
        "FullName": formData?.firstName + " " + formData?.lastName,
        "Address2":formData?.street
    },
    "LineItems": [
        {
            "AccommodationLineItem": [
                {
                    "Price": roomData?.hotelDetails?.HotelRooms?.[0]?.TotalPrice,
                    "Quantity": 1,
                        "CancellationPolicy": "REFUNDABLE",
                    "Title": "Regional/ Travel Inbound",
                    "Productid": "632910392",
                    "Category": "Travel Insurance",
                    "Brand": "QIC",
                    "ProductType": "Digital",
                    "QuantityPurchased": 1,
                    "AccommodationType": "HOTEL",
                    "CancellationPolicy": "REFUNDABLE",
                    "CheckInDate": data?.hotelDetails && data?.hotelDetails.Hotelsearchrequest && data?.hotelDetails.Hotelsearchrequest.ChkInDate ? moment(data?.hotelDetails.Hotelsearchrequest.ChkInDate).format('YYYY-MM-DD') : '',
                    "CheckOutTime": data?.hotelDetails && data?.hotelDetails.Hotelsearchrequest && data?.hotelDetails.Hotelsearchrequest.ChkOutDate ? moment(data?.hotelDetails.Hotelsearchrequest.ChkOutDate).format('YYYY-MM-DD') : '',
                    "City": "Lagos",
                    "CountryCode": formData?.country,
                    "NumberOfGuests": 3,
                    "Rating": "4",
                    "RoomType": "One Bedroom Suite Sea View 2 adults and2 Children (3 to 12years) or 3 adults,1 Double Bed and 1 Double Sofa Bed,NonSmoking",
                }
            ],
            "Title": "Emergency Medical and Other Expenses",
            "Price": roomData?.hotelDetails?.HotelRooms?.[0]?.TotalPrice,
            "QuantityPurchased": 1,
            "ProductType": "6"
        }
    ],
    "PaymentDetails": {
        "CreditCardBin": "434994",
        "AvsResultCode": "",
        "CvvResultCode": formData?.cvv,
        "CreditCardNumber": formData?.cardNumber,
        "CreditCardCompany": formData?.cardType?.toString() == "1" ? "Visa" : formData?.cardType?.toString(),
    },
    "Customer": {
        "Email": formData?.email,
        "VerifiedEmail": true,
        "FirstName": formData?.firstName,
        "LastName": formData?.lastName,
        "Id": "207119551",
        "CreatedAt": "2021-07-24T13:36:50-04:00",
        "AccountType": "registered",
           "PurchaserOrderCount": 0,
          "OrdersCount": null,
    },
    "FraudToolApiCredentials": null,
    "FraudToolTransactionID": 0,
    "HasError": false,
    "IsAlternateEmailRequired": false,
    "Passengers": passengerBodyArray,
    "TransactionTypeID": 0,
}

// let decideBody = {
//   "TrackID": "TEST_SANYAM_25454003",
//   "Source": "WEB",
//   "TotalPrice": 100,
//   "Currency": "INR",
//   "CustomerIP": "184.146.83.164",
//   "Email": "sanyam.kunwar@affixious.com",
//   "Udf1": "1230373",
//   "Udf2": null,
//   "Udf3": "Post-Auth",
//   "BillingAddress": {
//       "FirstName": null,
//       "LastName": null,
//       "Address1": "Unit 111",
//       "City": "Toronto",
//       "Country": "",
//       "CountryCode": "CA",
//       "Phone": "1 905257589",
//       "Address2": "216 Oak Park Boulevard, ",
//       "ZipCode": "0000",
//       "ProvinceCode": "",
//       "FullName": null,
//       "Province": "CA"
//   },
//   "Customer": {
//       "FirstName": "Sanyam",
//       "LastName": "Kunwar",
//       "Id": null,
//       "OrdersCount": null,
//       "Email": "sanyam.kunwar@affixious.com",
//       "VerifiedEmail": true,
//       "CreatedAt": null,
//       "AccountType": null,
//       "CustomerID": null,
//       "PurchaserOrderCount": 0
//   },
//   "PaymentDetails": {
//       "AvsResultCode": null,
//       "CvvResultCode": null,
//       "CreditCardBin": "452070",
//       "CreditCardCompany": "VISA",
//       "CreditCardNumber": "XXXX-XXXX-XXXX-9232"
//   },
//   "LineItems": [
//       {
//           "Title": "Villa Doris Suites",
//           "Price": 1464.44,
//           "ProductId": null,
//           "QuantityPurchased": 1,
//           "Sku": null,
//           "Condition": null,
//           "SubCategory": null,
//           "Category": null,
//           "ProductType": 6,
//           "Brand": null,
//           "DeliveredTo": null,
//           "DeliveredAt": null,
//           "TravelTicketLineItem": null,
//           "AccommodationLineItem": [
//               {
//                   "RoomType": "One Bedroom Suite Sea View 2 adults and2 Children (3 to 12years) or 3 adults,1 Double Bed and 1 Double Sofa Bed,NonSmoking",
//                   "City": "Lagos",
//                   "CountryCode": "PT",
//                   "CheckInDate": data?.hotelDetails && data?.hotelDetails.Hotelsearchrequest && data?.hotelDetails.Hotelsearchrequest.ChkInDate ? moment(data?.hotelDetails.Hotelsearchrequest.ChkInDate).format('YYYY-MM-DD') : '',
//                   "CheckOutTime": data?.hotelDetails && data?.hotelDetails.Hotelsearchrequest && data?.hotelDetails.Hotelsearchrequest.ChkOutDate ? moment(data?.hotelDetails.Hotelsearchrequest.ChkOutDate).format('YYYY-MM-DD') : '',
//                   "Rating": "4",
//                   "NumberOfGuests": 3,
//                   "CancellationPolicy": "REFUNDABLE",
//                   "AccommodationType": "HOTEL",
//                   "Title": null,
//                   "Price": null,
//                   "ProductId": null,
//                   "QuantityPurchased": null,
//                   "Sku": null,
//                   "Condition": null,
//                   "SubCategory": null,
//                   "Category": null,
//                   "ProductType": null,
//                   "Brand": null,
//                   "DeliveredTo": null,
//                   "DeliveredAt": null,
//                   "TravelTicketLineItem": null,
//                   "AccommodationLineItem": null
//               }
//           ]
//       }
//   ],
//   "Passengers": [
//       {
//           "Firstname": "Sanyam",
//           "Lastname": "Kunwar",
//           "DateOfBirth": "2005-06-02T16:18:19.593",
//           "NationalityCode": "CA",
//           "insuranceType": null,
//           "insurancePrice": null,
//           "DocumentNumber": null,
//           "DocumetType": null,
//           "DocumentIssueDate": null,
//           "DocumentExpirationDate": null,
//           "PassengerType": "ADULT",
//           "DocumentType": null
//       },
//       {
//           "Firstname": "Anil",
//           "Lastname": "Kunwar",
//           "DateOfBirth": "2005-06-02T16:18:19.593",
//           "NationalityCode": "CA",
//           "insuranceType": null,
//           "insurancePrice": null,
//           "DocumentNumber": null,
//           "DocumetType": null,
//           "DocumentIssueDate": null,
//           "DocumentExpirationDate": null,
//           "PassengerType": "ADULT",
//           "DocumentType": null
//       },
//       {
//           "Firstname": "Lakshya",
//           "Lastname": "Kunwar",
//           "DateOfBirth": "2021-05-29T16:18:19.593",
//           "NationalityCode": "CA",
//           "insuranceType": null,
//           "insurancePrice": null,
//           "DocumentNumber": null,
//           "DocumetType": null,
//           "DocumentIssueDate": null,
//           "DocumentExpirationDate": null,
//           "PassengerType": "CHILD",
//           "DocumentType": null
//       }
//   ],
//   "IsAlternateEmailRequired": false,
//   "CartToken": null,
//   "DevicePrintingId": "6dc116d3-c3a1-4115-a8f0-f88937a329e6",
//   "FraudToolApiCredentials": null,
//   "TransactionTypeID": 0,
//   "ActiveFraudToolVendorID": 0,
//   "Message": null,
//   "FraudToolTransactionID": 0,
//   "VendorReferenceNumber": null,
//   "ClientDetails": {
//       "AcceptLanguage": null,
//       "UserAgent": null
//   },
//   "CustomerOrderRequest": null,
//   "HasError": false,
//   "Errors": []
// }

      //chargeApiRes?.Model?.IsAttempt3D === true
      if (chargeApiRes?.Model?.IsAttempt3D === true) {
        // do 3d payment work here
        const obj = {
          bookingId: router?.query?.id,
          culture: 'GB',
          wegoClickId: '',
          failedURL: window.location.href,
          posId: data.posId,
          whiteListId: whiteListResponse?.apiRes?.data || 0,
        };
 
        var dataObj = CryptoJS.AES.encrypt(
          JSON.stringify(obj),
          process.env.NEXT_PUBLIC_ENC_SECRET_KEY
        ).toString();
       let encData = CryptoJS.enc.Base64.stringify(
  CryptoJS.enc.Utf8.parse(dataObj)
);
 
        // localStorage.setItem(FRAUD_BODY, JSON.stringify(fraudRequestBody));
 
        // Generate3DPaymentForms(
        //   chargeApiRes.apiRes?.data?.Model?.Acs,
        //   chargeApiRes.apiRes?.data?.Model?.Pareq,
        //   data.TrackID,
        //   `https://www.myholidays.com/hotels/api/3DPaymentResponse?encdata=${encData}`
        // );
 
         const url = chargeApiRes?.Model?.Acs
    const pareq = chargeApiRes?.Model?.Pareq
    const trackId = data.TrackID;
    const returnUrl =  `https://www.myholidays.com/hotels/api/3DPaymentResponse?encdata=${encData}`;
 
    // Construct query string with data
    const query = new URLSearchParams({
      url,
      pareq,
      trackId,
      returnUrl,
    }).toString();
 
    router.push(`/hotelpayment/Generate3DPaymentForm?${query}`)
 
        // router.push(`${process.env.NEXT_PUBLIC_BASE_DOMAIN_NAME}/travel/completePayment?encdata=${encData}`);
        //           `${process.env.NEXT_PUBLIC_SELF_URL}/hotels/api/3DPaymentResponse?encdata=${encData}`
 
        return;
      }
 
      if (runFraudTool) {
        const decideApiRes = await FraudToolDecideApi(
          decideBody,
          whiteListResponse?.apiRes?.data || 0
        )
        console.log("decide api resssponse", JSON.stringify(decideApiRes));
 
        if (
          decideApiRes?.apiSucceed &&
          decideApiRes?.apiRes?.data?.status === "APPROVED"
        ) {
          // make booking here
          const bookRes = await makeBooking(data.bookingId) 
          // 3 => confirm
          if (
            bookRes?.apiSucceed &&
            bookRes?.apiRes?.data?.bookingStatus == 3
          ) {
            const [paymentfullfilRes, paymentCapRes] = await Promise.all([
              runFraudTool
                ? paymentFullfill(
                    decideApiRes.apiRes.data.model.trackID,
                    decideApiRes.apiRes.data.model.id
                  )
                : Promise.resolve("full fill not run"),
              paymentCapture(
                chargeApiRes?.Model.TrackID,
                chargeApiRes?.Model.ID
              ),
            ]);
 
            console.log("payment fullfil response", paymentfullfilRes);
            console.log("payment cap res", paymentCapRes);
            paymentSuccess(data);
 
            // redirect to confirmation page
            const confirmCipherObj = {
              bookingId: data.bookingId,
              culture: 'GB',
              bookingStatus: bookRes.apiRes.data.BookingStatus,
            };
 
            // if (this.state.wegoClickId) {
            //   confirmCipherObj.wego_click_id = this.state.wegoClickId;
            // }
            console.log("confirm obj", confirmCipherObj);
            const cipherObj = CryptoJS.AES.encrypt(
              JSON.stringify(confirmCipherObj),
              process.env.NEXT_PUBLIC_ENC_SECRET_KEY
            ).toString();
            let encData = CryptoJS.enc.Base64.stringify(
              CryptoJS.enc.Utf8.parse(cipherObj)
            );
            setStep(3)
          } else {
            // book api failed
 
            const  [fraudToolOrderCancelRes, paymentVoidRes] = await Promise.all(
              [
                runFraudTool
                  ? paymentFraudToolOrderCancel(
                      decideApiRes.apiRes.data.model.trackID,
                      decideApiRes.apiRes.data.model.id
                    )
                  : Promise.resolve("payment fraud order cancel not run"),
                paymentVoidHandler(
                  chargeApiRes?.Model.TrackID,
                  chargeApiRes?.Model.ID
                ),
              ]
            );
            paymentFail(data, "Payment fraud");
 
            console.log(
              "payment fraud tool order cancel res",
              fraudToolOrderCancelRes
            );
            console.log("payment void res", paymentVoidRes);
            // redirect user to listing page
 
            window.location.href = "https://hotel.myholidays.com/";
           
          }
        } else {
          // call void api here
 
          const voidResponse = await paymentVoidHandler(
            chargeApiRes?.Model.TrackID,
            chargeApiRes?.Model.ID
          );
          console.log("void response", voidResponse);
          paymentFail(data, "Fail due to void");
 
          setPaymentProcess(pre => ({
            ...pre,
            isProcessingPayment: false,
            addProgressClass: false,
            disableButton: false,
            isFailedPayment: "true",
          }));
        }
        // if end run fraudtool
      } else {
        // apple pay logic here
        // make booking here
        const bookRes = await makeBooking(data.bookingId)
        // 3 => confirm
        if (bookRes?.apiSucceed && bookRes?.apiRes?.data?.bookingStatus === 3) {
          const paymentCapRes = await paymentCapture(
            chargeApiRes?.Model.TrackID,
            chargeApiRes?.Model.ID
          );
          console.log("payment cap res", paymentCapRes);
 
          // redirect to confirmation page
          const confirmCipherObj = {
            bookingId: data.bookingId,
            wego_click_id : data?.wego_click_id,
            culture: 'GB',
            bookingStatus: bookRes.apiRes.data.BookingStatus,
          };
 
          if (state?.wegoClickId) {
            confirmCipherObj.wego_click_id = state?.wegoClickId;
          }
          console.log("confirm obj", confirmCipherObj);
          const cipherObj = CryptoJS.AES.encrypt(
            JSON.stringify(confirmCipherObj),
            process.env.NEXT_PUBLIC_ENC_SECRET_KEY
          ).toString();
          let encData = CryptoJS.enc.Base64.stringify(
            CryptoJS.enc.Utf8.parse(cipherObj)
          );
          router.push({
            pathname: "/hotelconfirmation",
            query: { enc: encData },
          });
     
        }
     
        else {
       
          const [fraudToolOrderCancelRes, paymentVoidRes] = await paymentVoidHandler(
            chargeApiRes?.Model.TrackID,
            chargeApiRes?.Model.ID
          )
       
 
 
          console.log(
            "payment fraud tool order cancel res",
            fraudToolOrderCancelRes
          );
          console.log("payment void res", paymentVoidRes);
          // redirect user to listing page
 
          window.location.href = `/travel/fcgfgfd`;
          // window.history.back()
          //  this.setState({isProcessingPayment: false,addProgressClass: false,disableButton: false,})
        }
      }
 
 
     
    } else {
      console.log("error handling auth");
      paymentFail(data, "failed due to auth");
 
      setPaymentProcess(pre => ({
        ...pre,
        isProcessingPayment: false,
        addProgressClass: false,
        disableButton: false,
        isFailedPayment: "true",
      }));
    }

  }

const formData = watch();

// console.log("finalFormData", formData)
const dumData  = {
  "CompanyId": 2,
  "PartnerSalesChanelId": 19,
  "TenantID": 1,
  "DepartureDate": "2025-05-31",
  "DepartureCity": "gfer",
  "NoOfAdult": 1,
  Address: "dgfdgdf",
  "NoOfChild": 0,
  "ExtraBed": false,
  "NoOfRoom": "1",
  "CountryCode": "IN",
  "MobileNo": "4545454545",
  "DialCode": "+91",
  "Nationality": "China",
  "Email": "eraa@gmail.com",
  "UserIPAddress": "14.99.232.131",
  "PackageDescription": "<h2>Lugano Zurich Bern Lucerne Tour Package for 8 Days 7 Nights: Unveil the Treasures of Switzerland</h2><p>Indulge in the mesmerizing allure of <strong>Switzerland tour packages</strong>. From the Italian charm of Lugano to the historical treasures of Zurich, Bern, and Lucerne, this unforgettable itinerary promises a delightful blend of nature, culture, and elegance.</p>",
  "passengerDetail": [
    {
      "adultCount": 1,
      "childCount": "",
      "extraBed": "false",
   
        "adults": [
          {
            "firstName": "fdgfd",
            "lastName": "fdgdfgfdg",
            "passportNumber": "3434343434343434",
            "passportCity": "rtyhrthg",
            "title": "Mr.",
            "dateOfBirth": {
              "day": "15",
              "month": "October",
              "year": "2001"
            },
            "nationality": "Israel",
            "passportCountry": "Jamaica",
            "passportIssue": {
              "day": "31",
              "month": "November",
              "year": "2021"
            },
            "passportExpiry": {
              "day": "31",
              "month": "December",
              "year": "2025"
            }
          }
        ],
        "childs": [
 
        ]
     
    }
  ],
  "paymentDetail": {
    "CardNumber":  formData?.cardNumber,
    "ExpMonth": "February",
    "ExpYear": "2027",
    "cvv": "456",
    "Name": "gfhgfhgf",
    "SubTotal": "NaN",
    "Total": "NaN",
    "BaseCurrency": "QAR",
    "SellingCurrency": "QAR",
    "BuyingCurrency": "QAR"
  }

  
}
 

const makePayment = () => {
  saveBookingDetails();
  startPaymentFlow(dumData);
}



var result = data?.hotelDetails ? data?.hotelDetails : "";
var TotalRoomPrice=0,RoomCount=0,SubTotal=0,tax=0,GrandTotal=0,isPayAtHotel=false;
var Currency;

result.HotelRooms &&
  result.HotelRooms.length > 0 &&
  result.HotelRooms.map((props, i) => (
  props.ListOfRoom &&
  props.ListOfRoom.length > 0 &&
  props.ListOfRoom.map((roomProp, j) => (RoomCount=roomProp.RoomCount,
    roomProp.RoomRates &&
    roomProp.RoomRates.length > 0 &&
    roomProp.RoomRates.map((roomRates, k) => (TotalRoomPrice=roomRates.TotalRoomPrice,Currency =roomRates.Currency,isPayAtHotel = roomRates.IsPayAtHotel,
    roomRates.PriceSummary &&
    roomRates.PriceSummary.length > 0 &&
    roomRates.PriceSummary.map((price,p) => (tax += price.Value)
    ))
    )
    ))
  ));

SubTotal = RoomCount * TotalRoomPrice;
GrandTotal= SubTotal+ tax;
const formatCurrency = (amount) => {
  const amountStr = amount.toString();
  
  // If the number is less than 4 digits, just return it as is
  if (amountStr.length < 4) return amountStr;
  
  // For numbers with more than 3 digits, add commas every 3 digits from the right
  const formattedRest = amountStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  
  return formattedRest;
  };
  
// var discountTotal = GrandTotal * this.props.AppliedDiscount;
  // var totalDiscount = discountTotal/100;
  // var DiscountedTotal = GrandTotal - totalDiscount

var savedDiscountPay = savedDiscount;
const renderAlert = () => {
  return <div className="flex items-center justify-center w-full my-2">
    <Alert
      color="danger"
      description={"Oops! Something went wrong with your payment. Please check your payment details and try again."}
      // endContent={
      //   <Button color="danger" size="sm" variant="flat">
      //     Upgrade
      //   </Button>
      // }
      title="Payment Failed"
      variant="faded"
    />
  </div>
  
}

  return (
    <Suspense fallback={<div>Loading...</div>}>
            <Head>
          <meta name="google" content="notranslate"/>
          <title>MyHolidays Hotel Payment</title>
          <link href={`/hotels/static/styles/${valueSet.cultureStylePath}/hotelpayment.css`} rel="stylesheet" />
          <link href={`/hotels/static/styles/${valueSet?.cultureStylePath}/common.css`} rel="stylesheet" />
          {Analytics()}
           {GTag()}
        </Head>
        <GTagIframe/>
    <form onSubmit={handleSubmit(onSubmit)} >
    <ReviewPayment globalCurrency={globalCurrency} />

      <div className="mx-auto container px-2 xl:px-0">
     
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          
          <div className="lg:col-span-2">

         
            
            <div className="space-y-6">
               
              <HotelDetails data={data} hotelDetailsInfo={hotelDetailsInfo} globalCurrency={globalCurrency} />
              {paymentProcess?.isFailedPayment ? 
          renderAlert():""}
              
              {secondForm  == 1 &&
              <>
              <ContactDetails  form={form}  globalCurrency={globalCurrency } />
              <GuestDetails secondForm={secondForm} setSecondForm={setSecondForm}  form={form} data={data} RoomCount={RoomCount} globalCurrency={globalCurrency}  />
              </>
}
              {secondForm == 2 &&
              <PaymentForm form={form} cardTypes={cardTypes} data={data} globalCurrency={globalCurrency} />}
              <div className="flex flex-col gap-4 p-4 border shadow-xl">
          <div className="flex items-start gap-2">
            <label htmlFor="terms" className="text-sm">
              I N/A, have read and accepted the{" "}
              <span className="text-primary cursor-pointer">
                <a href="/termsofuse">
                  Terms & Conditions
                </a>
              </span>{" "}
              associated with this fare. I agree to pay a total amount of {" "}
              {Currency} {formatCurrency(Math.ceil(GrandTotal-savedDiscountPay))}
            </label>
           
          </div>

          {/* {error && <p className="text-danger text-sm">{error}</p>} */}

          <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
            <div></div>
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold">{Currency} {formatCurrency(Math.ceil(GrandTotal-savedDiscountPay))}</span>
              <Button
              type="submit"
                size="lg"
                // onPress={makePayment}
                endContent={<Icon icon="lucide:chevron-right" />}
                className="min-w-[120px] rounded-[5px] bg-[#b81a52] text-white"
              >
                {secondForm  == 2 ? "Make Payment"  : "Continue"}
              </Button>
            </div>
          </div>
        </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <PriceDetails  data={data} globalCurrency={globalCurrency} />           
          </div>
        </div>
      </div>
      </form>
     </Suspense >
  );
}