"use client"

import axios from "axios";
import moment from "moment";

export const getIPAddress = () => {
    return axios.get('https://api.ipify.org/?format=json');
}

// src/api/applePayAPI.js

export const fetchApplePayStatus = async () => {
    try {
      const response = await fetch('https://prodapi.myholidays.com/apple-pay/check-status');
  
      if (!response.ok) {
        throw new Error('Failed to fetch Apple Pay status');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      // Log and rethrow to let the caller handle it
      console.error('Error fetching Apple Pay status:', error);
      throw error;
    }
  };

export const fetchCardTypes = async ({
  AffiliateID = '',
  Browser,
  PaymentCurrency,
  PaymentSecretKey,
}) => {
  try {
    const response = await axios.post(
      'https://prodapi.myholidays.com/paymentcardtype/api/TransactionServices/GetPaymentCardTypes',
      {
        AffiliateID,
        Browser,
        PaymentCurrency,
        PaymentSecretKey,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = response.data;
    const typesObj = result?.Cards;
    return typesObj ? Object.values(typesObj) : [];
  } catch (error) {
    console.error('Error fetching card types:', error);
    throw error;
  }
};

export const getSelectedRoomDetails = async ({
  SearchKey,
  ROOMID,
  HotelID,
  rateID,
}) => {
  const url = 'https://prodapi.myholidays.com/hotelsearch/api/search/SelectedRoomv2';

  try {
    const response = await axios.get(url, {
      params: {
        SearchKey,
        ROOMID,
        HotelID,
        rateID,
      },
    });

    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch room details:', error);
    throw error;
  }
};

 export const  getBookingDetails = (bookingId) => {
  return axios.get(
    "https://prodapi.myholidays.com/hotelsearch/api/search/GetBookingDetails?bookingId=" + bookingId,
    { headers: { Token: AUTHORIZATION_TOKEN } }
  );
}


 const paymentWhiteListRequestHandler = (requestBody) => {
  return axios.post(process.env.NEXT_PUBLIC_PAYMENTWHITELISTAPI, requestBody, {
    headers: {
      // Authorization: process.env.NEXT_PUBLIC_AUTH_AUTHORIZATION,
      "Content-Type": "application/json",
    },
  });
};

export const customerWhiteListApi = (fraudRequestBody) => {
  return new Promise(async (resolve, _) => {
    try {

      console.log({fraudRequestBody})
      const whiteListApiRes = await paymentWhiteListRequestHandler(
        fraudRequestBody
      );
      // console.log("whiteListApiRes",JSON.stringify(whiteListApiRes))
      resolve({ apiSucceed: true, apiRes: whiteListApiRes});
    } catch (error) {
      console.log("eror", error);
      resolve({ apiSucceed: false, apiRes: error });
    }
  });
};

const fraudToolRequestHandler = (fraud) => {
  let axiosConfig = {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_AUTH_FRAUD_AUTHRIZATION,
      Username: process.env.NEXT_PUBLIC_FRAUDTOOL_USERNAME,
      Password: process.env.NEXT_PUBLIC_FRAUDTOOL_PASSWORD,
      MerchantCode: process.env.NEXT_PUBLIC_FRAUDTOOL_MERCHANT_CODE,
      "Content-Type": "application/json",
    },
  };

  return axios.post(
    `${process.env.NEXT_PUBLIC_FRAUDTOOL_API_URL}/decide`,
    fraud,
    axiosConfig
  );
};

export const FraudToolDecideApi = (fraudRequestBody,whiteListId) => {
  return new Promise(async (resolve, _) => {
    try {

      if(whiteListId === whiteListResponseENUM.whiteLIsted){
        console.log('skipping fraud tool')
        resolve({ apiSucceed: true, apiRes: {data:{status: "APPROVED"}} })

      }else{
        console.log("decide api body", fraudRequestBody);
        const DecideApiRes = await fraudToolRequestHandler(
          fraudRequestBody
        );
        // console.log("DecideApiRes api res", JSON.stringify(DecideApiRes));
        resolve({ apiSucceed: true, apiRes: DecideApiRes });

      }

    } catch (error) {
      console.log("eror", error);
      resolve({ apiSucceed: false, apiRes: error });
    }
  });
};


const BookingEnable = (bookingId) => {
  return axios.get(`${BOOKING_API_URL}/api/book/book?BookingId=${bookingId}`);
}

export const makeBooking = (bookingId) => {
  return new Promise(async (resolve) => {
    try {
      const res = await BookingEnable(bookingId);
      resolve({ apiSucceed: true, apiRes: res });
    } catch (error) {
      resolve({ apiSucceed: false, apiRes: error });
    }
  });
};

const paymentCaptureRequestHandler = (trackid, id) => {
  let axiosConfig = {
      headers: {
          Authorization: process.env.NEXT_PUBLIC_AUTH_AUTHORIZATION,
          "Content-Type": "application/json",
        },
  }; 
  let request = {
      TrackID:trackid,
      ID:id,
  }
  return axios.post(`${process.env.NEXT_PUBLIC_PAYMENT_URL}/capture`,request,axiosConfig)
}


export const paymentCapture = async (trackid, Id) => {
  return new Promise(async (resolve, _) => {
    try {
      let paymentCapRes = await paymentCaptureRequestHandler(
        trackid,
        Id
      );
      resolve({ apiSucceed: true, apiRes: paymentCapRes });
      //   if (
      //     paymentCapRes &&
      //     paymentCapRes.data &&
      //     paymentCapRes.data.Model &&
      //     paymentCapRes.data.Model.Status === "CAPTURED"
      //   ) {
      //     window.localStorage.removeItem("paxDetail");
      //     // history.replace(`/ibe/flightconfirmation?id=${urn}&culture=${props.cul ? props.cul : 'en' }&cur=${props.fairCurrency}`)
      //     window.location.href = `${
      //       process.env.REACT_APP_FLIGHTCONFIRMATION_URL
      //     }id=${urn}&culture=${props.cul ? props.cul : "en"}`;
      //   } else {
      //     await ApiService.paymentVoidHandler(tripid, Id);
      //     props.setPnrFailLoad(true);
      //   }
    } catch (error) {
      console.log("something went wrong in the payment capture.", error);
      resolve({ apiSucceed: false, apiRes: error });
    }
  });
};

const paymentVoid = (trackid, id) => {
  let axiosConfig = {
      headers: {
          Authorization: process.env.NEXT_PUBLIC_AUTH_AUTHORIZATION,
          "Content-Type": "application/json",
        },
  };
  let request = {
      TrackID:trackid,
      ID:id,
  }
  return axios.post(`${process.env.NEXT_PUBLIC_PAYMENT_URL}/voidcharge`,request,axiosConfig)  
}


export const paymentVoidHandler = async (TrackID, id) => {
  return new Promise(async (resolve, _) => {
    try {
      let res = await paymentVoid(
        TrackID,
        id
      );
      resolve({ apiSucceed: true, apiRes: res });
    } catch (error) {
      console.log("something went wrong in the payment void.", error);
      resolve({ apiSucceed: false, apiRes: error });
    }
  });
};


function isMobileDevice() {
  try{
    const userAgent = navigator.userAgent.toLowerCase();
    return /iphone|ipod|android|blackberry|windows phone|iemobile|mobile/.test(userAgent);
  }catch(e){
    console.log({e});
  }
 
}


export function paymentFail(props,msg) {
  try {
    
    console.log("paymenthotelfail", props,msg);
    // const total = localStorage.getItem('grandTotal')
    // console.log({total});
    // const cardType =props.cardTypes.filter(card => card.value == props.cardType);
    // const selectedText = cardType.length > 0 ? cardType[0].text : null;
    
    if(window && window.smartech){
      window.smartech("dispatch", "payment_failed", {
        refid: props.bookingId||'',
        // hotelcode: props.paymentInformationDetail.MYHHotelCode||'',
        // hotelName:hotelName || '',
        category_name: 'Hotel',
        discount_amt: 0,
        amount:parseFloat(props.grandTotal),
        payment_mode: 'Card',
        // cardHolder_name: props.cardName || '',
        retry: 1,
        error: msg || "",
        source: isMobileDevice() ? 'Mweb' : 'web',
      })
    }
    
  } catch (error) {
    console.log("paymentfail netcore issue",error);
  }
}


export const Country_Names =[
  {
      "value": "Afghanistan",
      "text": "Afghanistan",
      "id": "1",
      "code": "AF"
  },
  {
      "value": "Albania",
      "text": "Albania",
      "id": "2",
      "code": "AL"
  },
  {
      "value": "Algeria",
      "text": "Algeria",
      "id": "3",
      "code": "DZ"
  },
  {
      "value": "American Samoa",
      "text": "American Samoa",
      "id": "4",
      "code": "AS"
  },
  {
      "value": "Andorra",
      "text": "Andorra",
      "id": "5",
      "code": "AD"
  },
  {
      "value": "Angola",
      "text": "Angola",
      "id": "6",
      "code": "AO"
  },
  {
      "value": "Anguilla",
      "text": "Anguilla",
      "id": "7",
      "code": "AI"
  },
  {
      "value": "Antarctica",
      "text": "Antarctica",
      "id": "8",
      "code": "AQ"
  },
  {
      "value": "Antigua and Barbuda",
      "text": "Antigua and Barbuda",
      "id": "9",
      "code": "AG"
  },
  {
      "value": "Argentina",
      "text": "Argentina",
      "id": "10",
      "code": "AR"
  },
  {
      "value": "Armenia",
      "text": "Armenia",
      "id": "11",
      "code": "AM"
  },
  {
      "value": "Aruba",
      "text": "Aruba",
      "id": "12",
      "code": "AW"
  },
  {
      "value": "Australia",
      "text": "Australia",
      "id": "13",
      "code": "AU"
  },
  {
      "value": "Austria",
      "text": "Austria",
      "id": "14",
      "code": "AT"
  },
  {
      "value": "Azerbaijan",
      "text": "Azerbaijan",
      "id": "15",
      "code": "AZ"
  },
  {
      "value": "Bahamas",
      "text": "Bahamas",
      "id": "16",
      "code": "BS"
  },
  {
      "value": "Bahrain",
      "text": "Bahrain",
      "id": "17",
      "code": "BH"
  },
  {
      "value": "Bangladesh",
      "text": "Bangladesh",
      "id": "18",
      "code": "BD"
  },
  {
      "value": "Barbados",
      "text": "Barbados",
      "id": "19",
      "code": "BB"
  },
  {
      "value": "Belarus",
      "text": "Belarus",
      "id": "20",
      "code": "BY"
  },
  {
      "value": "Belgium",
      "text": "Belgium",
      "id": "21",
      "code": "BE"
  },
  {
      "value": "Belize",
      "text": "Belize",
      "id": "22",
      "code": "BZ"
  },
  {
      "value": "Benin",
      "text": "Benin",
      "id": "23",
      "code": "BJ"
  },
  {
      "value": "Bermuda",
      "text": "Bermuda",
      "id": "24",
      "code": "BM"
  },
  {
      "value": "Bhutan",
      "text": "Bhutan",
      "id": "25",
      "code": "BT"
  },
  {
      "value": "Bolivia",
      "text": "Bolivia",
      "id": "26",
      "code": "BO"
  },
  {
      "value": "Bosnia and Herzegovina",
      "text": "Bosnia and Herzegovina",
      "id": "27",
      "code": "BA"
  },
  {
      "value": "Botswana",
      "text": "Botswana",
      "id": "28",
      "code": "BW"
  },
  {
      "value": "Bouvet Island",
      "text": "Bouvet Island",
      "id": "29",
      "code": "BV"
  },
  {
      "value": "Brazil",
      "text": "Brazil",
      "id": "30",
      "code": "BR"
  },
  {
      "value": "British Indian Ocean Territory",
      "text": "British Indian Ocean Territory",
      "id": "31",
      "code": "IO"
  },
  {
      "value": "British Virgin Islands",
      "text": "British Virgin Islands",
      "id": "32",
      "code": "VG"
  },
  {
      "value": "Brunei",
      "text": "Brunei",
      "id": "33",
      "code": "BN"
  },
  {
      "value": "Bulgaria",
      "text": "Bulgaria",
      "id": "34",
      "code": "BG"
  },
  {
      "value": "Burkina Faso",
      "text": "Burkina Faso",
      "id": "35",
      "code": "BF"
  },
  {
      "value": "Burundi",
      "text": "Burundi",
      "id": "36",
      "code": "BI"
  },
  {
      "value": "Cambodia",
      "text": "Cambodia",
      "id": "37",
      "code": "KH"
  },
  {
      "value": "Cameroon",
      "text": "Cameroon",
      "id": "38",
      "code": "CM"
  },
  {
      "value": "Canada",
      "text": "Canada",
      "id": "39",
      "code": "CA"
  },
  {
      "value": "Cape Verde",
      "text": "Cape Verde",
      "id": "40",
      "code": "CV"
  },
  {
      "value": "Cayman Islands",
      "text": "Cayman Islands",
      "id": "41",
      "code": "KY"
  },
  {
      "value": "Central African Republic",
      "text": "Central African Republic",
      "id": "42",
      "code": "CF"
  },
  {
      "value": "Chad",
      "text": "Chad",
      "id": "43",
      "code": "TD"
  },
  {
      "value": "Chile",
      "text": "Chile",
      "id": "44",
      "code": "CL"
  },
  {
      "value": "China",
      "text": "China",
      "id": "45",
      "code": "CN"
  },
  {
      "value": "Christmas Island",
      "text": "Christmas Island",
      "id": "46",
      "code": "CX"
  },
  {
      "value": "Cocos [Keeling] Islands",
      "text": "Cocos[Keeling] Islands",
      "id": "47",
      "code": "CO"
  },
  {
      "value": "Colombia",
      "text": "Colombia",
      "id": "48",
      "code": "CO"
  },
  {
      "value": "Comoros",
      "text": "Comoros",
      "id": "49",
      "code": "KM"
  },
  {
      "value": "Cook Islands",
      "text": "Cook Islands",
      "id": "50",
      "code": "CK"
  },
  {
      "value": "Costa Rica",
      "text": "Costa Rica",
      "id": "51",
      "code": "CR"
  },
  {
      "value": "Croatia",
      "text": "Croatia",
      "id": "52",
      "code": "HR"
  },
  {
      "value": "Cuba",
      "text": "Cuba",
      "id": "53",
      "code": "CU"
  },
  {
      "value": "Curacao",
      "text": "Curacao",
      "id": "54",
      "code": "CW"
  },
  {
      "value": "Cyprus",
      "text": "Cyprus",
      "id": "55",
      "code": "CY"
  },
  {
      "value": "Czech Republic",
      "text": "Czech Republic",
      "id": "56",
      "code": "CZ"
  },
  {
      "value": "Democratic Republic of the Congo",
      "text": "Democratic Republic of the Congo",
      "id": "57",
      "code": "CD"
  },
  {
      "value": "Denmark",
      "text": "Denmark",
      "id": "58",
      "code": "DK"
  },
  {
      "value": "Djibouti",
      "text": "Djibouti",
      "id": "59",
      "code": "DJ"
  },
  {
      "value": "Dominica",
      "text": "Dominica",
      "id": "60",
      "code": "DM"
  },
  {
      "value": "Dominican Republic",
      "text": " Dominican Republic",
      "id": "61",
      "code": "DE"
  },
  {
      "value": "East Timor",
      "text": "East Timor",
      "id": "62",
      "code": "TL"
  },
  {
      "value": "Ecuador",
      "text": "Ecuador",
      "id": "63",
      "code": "EC"
  },
  {
      "value": "Egypt",
      "text": "Egypt",
      "id": "64",
      "code": "EG"
  },
  {
      "value": "El Salvador",
      "text": "El Salvador",
      "id": "65",
      "code": "SV"
  },
  {
      "value": "Equatorial Guinea",
      "text": "Equatorial Guinea",
      "id": "66",
      "code": "GQ"
  },
  {
      "value": "Eritrea",
      "text": "Eritrea",
      "id": "67",
      "code": "ER"
  },
  {
      "value": "Estonia",
      "text": "Estonia",
      "id": "68",
      "code": "EE"
  },
  {
      "value": "Ethiopia",
      "text": "Ethiopia",
      "id": "69",
      "code": "ET"
  },
  {
      "value": "Falkland Islands",
      "text": "Falkland Islands",
      "id": "70",
      "code": "FK"
  },
  {
      "value": "Faroe Islands",
      "text": "Faroe Islands",
      "id": "71",
      "code": "FO"
  },
  {
      "value": "Federal Republic of Somalia",
      "text": "Federal Republic of Somalia",
      "id": "72",
      "code": "SO"
  },
  {
      "value": "Federated States of Micronesia",
      "text": "Federated States of Micronesia",
      "id": "73",
      "code": "FM"
  },
  {
      "value": "Fiji",
      "text": "Fiji",
      "id": "74",
      "code": "FJ"
  },
  {
      "value": "Finland",
      "text": "Finland",
      "id": "75",
      "code": "FI"
  },
  {
      "value": "France",
      "text": "France",
      "id": "76",
      "code": "FR"
  },
  {
      "value": "French Guiana",
      "text": "French Guiana",
      "id": "77",
      "code": "GF"
  },
  {
      "value": "French Polynesia",
      "text": "French Polynesia",
      "id": "78",
      "code": "FP"
  },
  {
      "value": "French Southern Territories",
      "text": "French Southern Territories",
      "id": "79",
      "code": "TF"
  },
  {
      "value": "Gabon",
      "text": "Gabon",
      "id": "80",
      "code": "GA"
  },
  {
      "value": "Gambia",
      "text": "Gambia",
      "id": "81",
      "code": "GM"
  },
  {
      "value": "Georgia",
      "text": "Georgia",
      "id": "82",
      "code": "GG"
  },
  {
      "value": "Germany",
      "text": "Germany",
      "id": "83",
      "code": "DE"
  },
  {
      "value": "Ghana",
      "text": "Ghana",
      "id": "84",
      "code": "GH"
  },
  {
      "value": "Gibraltar",
      "text": "Gibraltar",
      "id": "85",
      "code": "GI"
  },
  {
      "value": "Greece",
      "text": "Greece",
      "id": "86",
      "code": "GR"
  },
  {
      "value": "Greenland",
      "text": "Greenland",
      "id": "87",
      "code": "GL"
  },
  {
      "value": "Grenada",
      "text": "Grenada",
      "id": "88",
      "code": "GD"
  },
  {
      "value": "Guadeloupe",
      "text": "Guadeloupe",
      "id": "89",
      "code": "GP"
  },
  {
      "value": "Guam",
      "text": "Guam",
      "id": "90",
      "code": "GU"
  },
  {
      "value": "Guatemala",
      "text": "Guatemala",
      "id": "91",
      "code": "GT"
  },
  {
      "value": "Guernsey",
      "text": "Guernsey",
      "id": "92",
      "code": "GG"
  },
  {
      "value": "Guinea",
      "text": "Guinea",
      "id": "93",
      "code": "GN"
  },
  {
      "value": "Guinea",
      "text": "Guinea",
      "id": "94",
      "code": "GN"
  },
  {
      "value": "Guyana",
      "text": "Guyana",
      "id": "95",
      "code": "GY"
  },
  {
      "value": "Haiti",
      "text": "Haiti",
      "id": "96",
      "code": "HT"
  },
  {
      "value": "Heard Island and McDonald Islands",
      "text": "Heard Island and McDonald Islands",
      "id": "97",
      "code": "HM"
  },
  {
      "value": "Honduras",
      "text": "Honduras",
      "id": "98",
      "code": "HN"
  },
  {
      "value": "Hong Kong",
      "text": "Hong Kong",
      "id": "99",
      "code": "HK"
  },
  {
      "value": "Hungary",
      "text": "Hungary",
      "id": "100",
      "code": "HU"
  },
  {
      "value": "Iceland",
      "text": "Iceland",
      "id": "101",
      "code": "IS"
  },
  {
      "value": "India",
      "text": "India",
      "id": "102",
      "code": "IN"
  },
  {
      "value": "Indonesia",
      "text": "Indonesia",
      "id": "103",
      "code": "ID"
  },
  {
      "value": "Iran",
      "text": "Iran",
      "id": "104",
      "code": "IR"
  },
  {
      "value": "Iraq",
      "text": "Iraq",
      "id": "105",
      "code": "IQ"
  },
  {
      "value": "Ireland",
      "text": "Ireland",
      "id": "106",
      "code": "IE"
  },
  {
      "value": "Isle of Man",
      "text": "Isle of Man",
      "id": "107",
      "code": "IM"
  },
  {
      "value": "Israel",
      "text": "Israel",
      "id": "108",
      "code": "IL"
  },
  {
      "value": "Italy",
      "text": "Italy",
      "id": "109",
      "code": "IT"
  },
  {
      "value": "Ivory Coast",
      "text": "Ivory Coast",
      "id": "110",
      "code": "CI"
  },
  {
      "value": "Jamaica",
      "text": "Jamaica",
      "id": "111",
      "code": "JM"
  },
  {
      "value": "Japan",
      "text": "Japan",
      "id": "112",
      "code": "JP"
  },
  {
      "value": "Jersey",
      "text": "Jersey",
      "id": "113",
      "code": "JE"
  },
  {
      "value": "Jordan",
      "text": "Jordan",
      "id": "114",
      "code": "JO"
  },
  {
      "value": "Kazakhstan",
      "text": "Kazakhstan",
      "id": "115",
      "code": "KZ"
  },
  {
      "value": "Kenya",
      "text": "Kenya",
      "id": "116",
      "code": "KE"
  },
  {
      "value": "Kiribati",
      "text": "Kiribati",
      "id": "117",
      "code": "KI"
  },
  {
      "value": "Kosovo",
      "text": "Kosovo",
      "id": "118",
      "code": "RS"
  },
  {
      "value": "Kuwait",
      "text": "Kuwait",
      "id": "119",
      "code": "KW"
  },
  {
      "value": "Kyrgyzstan",
      "text": "Kyrgyzstan",
      "id": "120",
      "code": "KG"
  },
  {
      "value": "Laos",
      "text": "Laos",
      "id": "121",
      "code": "LA"
  },
  {
      "value": "Latvia",
      "text": "Latvia",
      "id": "122",
      "code": "LV"
  },
  {
      "value": "Lebanon",
      "text": "Lebanon",
      "id": "123",
      "code": "LB"
  },
  {
      "value": "Lesotho",
      "text": "Lesotho",
      "id": "124",
      "code": "LS"
  },
  {
      "value": "Liberia",
      "text": "Liberia",
      "id": "125",
      "code": "LR"
  },
  {
      "value": "Libya",
      "text": "Libya",
      "id": "126",
      "code": "LY"
  },
  {
      "value": "Liechtenstein",
      "text": "Liechtenstein",
      "id": "127",
      "code": "LI"
  },
  {
      "value": "Lithuania",
      "text": "Lithuania",
      "id": "128",
      "code": "LT"
  },
  {
      "value": "Luxembourg",
      "text": "Luxembourg",
      "id": "129",
      "code": "LU"
  },
  {
      "value": "Macao",
      "text": "Macao",
      "id": "130",
      "code": "MO"
  },
  {
      "value": "Macedonia",
      "text": "Macedonia",
      "id": "131",
      "code": "MK"
  },
  {
      "value": "Madagascar",
      "text": "Madagascar",
      "id": "132",
      "code": "MG"
  },
  {
      "value": "Malawi",
      "text": "Malawi",
      "id": "133",
      "code": "MW"
  },
  {
      "value": "Malaysia",
      "text": "Malaysia",
      "id": "134",
      "code": "MY"
  },
  {
      "value": "Maldives",
      "text": "Maldives",
      "id": "135",
      "code": "MV"
  },
  {
      "value": "Mali",
      "text": "Mali",
      "id": "136",
      "code": "ML"
  },
  {
      "value": "Malta",
      "text": "Malta",
      "id": "137",
      "code": "MT"
  },
  {
      "value": "Marshall Islands",
      "text": "Marshall Islands",
      "id": "138",
      "code": "MH"
  },
  {
      "value": "Martinique",
      "text": "Martinique",
      "id": "139",
      "code": "MQ"
  },
  {
      "value": "Mauritania",
      "text": "Mauritania",
      "id": "140",
      "code": "MR"
  },
  {
      "value": "Mauritius",
      "text": "Mauritius",
      "id": "141",
      "code": "MU"
  },
  {
      "value": "Mayotte",
      "text": "Mayotte",
      "id": "142",
      "code": "YT"
  },
  {
      "value": "Mexico",
      "text": "Mexico",
      "id": "143",
      "code": "MX"
  },
  {
      "value": "Micronesia",
      "text": "Micronesia",
      "id": "144",
      "code": "FM"
  },
  {
      "value": "Moldova",
      "text": "Moldova",
      "id": "145",
      "code": "MD"
  },
  {
      "value": "Monaco",
      "text": "Monaco",
      "id": "146",
      "code": "MC"
  },
  {
      "value": "Mongolia",
      "text": "Mongolia",
      "id": "147",
      "code": "MN"
  },
  {
      "value": "Montenegro",
      "text": "Montenegro",
      "id": "148",
      "code": "ME"
  },
  {
      "value": "Montserrat",
      "text": "Montserrat",
      "id": "149",
      "code": "MS"
  },
  {
      "value": "Morocco",
      "text": "Morocco",
      "id": "150",
      "code": "MA"
  },
  {
      "value": "Mozambique",
      "text": "Mozambique",
      "id": "151",
      "code": "MZ"
  },
  {
      "value": "Myanmar [Burma]",
      "text": "Myanmar[Burma]",
      "id": "152",
      "code": "MY"
  },
  {
      "value": "Namibia",
      "text": "Namibia",
      "id": "153",
      "code": "NA"
  },
  {
      "value": "NATO countries",
      "text": "NATO countries",
      "id": "154",
      "code": "NT"
  },
  {
      "value": "Nauru",
      "text": "Nauru",
      "id": "155",
      "code": "NR"
  },
  {
      "value": "Nepal",
      "text": "Nepal",
      "id": "156",
      "code": "NP"
  },
  {
      "value": "Netherlands",
      "text": "Netherlands",
      "id": "157",
      "code": "NL"
  },
  {
      "value": "New Caledonia",
      "text": "New Caledonia",
      "id": "158",
      "code": "NC"
  },
  {
      "value": "New Zealand",
      "text": "New Zealand",
      "id": "159",
      "code": "NZ"
  },
  {
      "value": "Nicaragua",
      "text": "Nicaragua",
      "id": "160",
      "code": "NI"
  },
  {
      "value": "Niger",
      "text": "Niger",
      "id": "161",
      "code": "NE"
  },
  {
      "value": "Nigeria",
      "text": "Nigeria",
      "id": "162",
      "code": "NG"
  },
  {
      "value": "Niue",
      "text": "Niue",
      "id": "163",
      "code": "NU"
  },
  {
      "value": "Norfolk Island",
      "text": "Norfolk Island",
      "id": "164",
      "code": "NF"
  },
  {
      "value": "North Korea",
      "text": "North Korea",
      "id": "165",
      "code": "KN"
  },
  {
      "value": "Northern Mariana Islands",
      "text": "Northern Mariana Islands",
      "id": "166",
      "code": "MP"
  },
  {
      "value": "Norway",
      "text": "Norway",
      "id": "167",
      "code": "NO"
  },
  {
      "value": "Oman",
      "text": "Oman",
      "id": "168",
      "code": "OM"
  },
  {
      "value": "Pakistan",
      "text": "Pakistan",
      "id": "169",
      "code": "PK"
  },
  {
      "value": "Palau",
      "text": "Palau",
      "id": "170",
      "code": "PW"
  },
  {
      "value": "Palestine",
      "text": "Palestine",
      "id": "171",
      "code": "PS"
  },
  {
      "value": "Panama",
      "text": "Panama",
      "id": "172",
      "code": "PA"
  },
  {
      "value": "Papua New Guinea",
      "text": "Papua New Guinea",
      "id": "173",
      "code": "PG"
  },
  {
      "value": "Paraguay",
      "text": "Paraguay",
      "id": "174",
      "code": "PY"
  },
  {
      "value": "Peru",
      "text": "Peru",
      "id": "175",
      "code": "PE"
  },
  {
      "value": "Philippines",
      "text": "Philippines",
      "id": "176",
      "code": "PH"
  },
  {
      "value": "Pitcairn Islands",
      "text": "Pitcairn Islands",
      "id": "177",
      "code": "PN"
  },
  {
      "value": "Poland",
      "text": "Poland",
      "id": "178",
      "code": "PL"
  },
  {
      "value": "Portugal",
      "text": "Portugal",
      "id": "179",
      "code": "PT"
  },
  {
      "value": "Puerto Rico",
      "text": "Puerto Rico",
      "id": "180",
      "code": "PR"
  },
  {
      "value": "Qatar",
      "text": "Qatar",
      "id": "181",
      "code": "QA"
  },
  {
      "value": "Republic of the Congo",
      "text": "Republic of the Congo",
      "id": "182",
      "code": "CG"
  },
  {
      "value": "Reunion",
      "text": "Reunion",
      "id": "183",
      "code": "RE"
  },
  {
      "value": "Romania",
      "text": "Romania",
      "id": "184",
      "code": "RO"
  },
  {
      "value": "Russia",
      "text": "Russia",
      "id": "185",
      "code": "RU"
  },
  {
      "value": "Rwanda",
      "text": "Rwanda",
      "id": "186",
      "code": "RW"
  },
  {
      "value": "Saint Helena",
      "text": "Saint Helena",
      "id": "187",
      "code": "SH"
  },
  {
      "value": "Saint Kitts and Nevis",
      "text": "Saint Kitts and Nevis",
      "id": "188",
      "code": "KN"
  },
  {
      "value": "Saint Lucia",
      "text": "Saint Lucia",
      "id": "189",
      "code": "LC"
  },
  {
      "value": "Saint Martin",
      "text": "Saint Martin",
      "id": "190",
      "code": "MF"
  },
  {
      "value": "Saint Pierre and Miquelon",
      "text": "Saint Pierre and Miquelon",
      "id": "191",
      "code": "PM"
  },
  {
      "value": "Saint Vincent and the Grenadines",
      "text": "Saint Vincent and the Grenadines",
      "id": "192",
      "code": "VC"
  },
  {
      "value": "San Marino",
      "text": "San Marino",
      "id": "193",
      "code": "SM"
  },
  {
      "value": "Sao Tome and Principe",
      "text": "Sao Tome and Principe",
      "id": "194",
      "code": "SA"
  },
  {
      "value": "Saudi Arabia",
      "text": "Saudi Arabia",
      "id": "195",
      "code": "SA"
  },
  {
      "value": "Senegal",
      "text": "Senegal",
      "id": "196",
      "code": "SN"
  },
  {
      "value": "Serbia",
      "text": "Serbia",
      "id": "197",
      "code": "RS"
  },
  {
      "value": "Seychelles",
      "text": "Seychelles",
      "id": "198",
      "code": "SC"
  },
  {
      "value": "Sierra Leone",
      "text": "Sierra Leone",
      "id": "199",
      "code": "SL"
  },
  {
      "value": "Singapore",
      "text": "Singapore",
      "id": "200",
      "code": "SG"
  },
  {
      "value": "Sint Maarten",
      "text": "Sint Maarten",
      "id": "201",
      "code": "SX"
  },
  {
      "value": "Slovakia",
      "text": "Slovakia",
      "id": "202",
      "code": "SK"
  },
  {
      "value": "Slovenia",
      "text": "Slovenia",
      "id": "203",
      "code": "SI"
  },
  {
      "value": "Solomon Islands",
      "text": "Solomon Islands",
      "id": "204",
      "code": "SB"
  },
  {
      "value": "Somalia",
      "text": "Somalia",
      "id": "205",
      "code": "SO"
  },
  {
      "value": "South Africa",
      "text": "South Africa",
      "id": "206",
      "code": "ZA"
  },
  {
      "value": "South Korea",
      "text": "South Korea",
      "id": "207",
      "code": "KR"
  },
  {
      "value": "South Sudan",
      "text": "South Sudan",
      "id": "208",
      "code": "SS"
  },
  {
      "value": "Spain",
      "text": "Spain",
      "id": "209",
      "code": "ES"
  },
  {
      "value": "Sri Lanka",
      "text": "Sri Lanka",
      "id": "210",
      "code": "LK"
  },
  {
      "value": "Sudan",
      "text": "Sudan",
      "id": "211",
      "code": "SD"
  },
  {
      "value": "Suriname",
      "text": "Suriname",
      "id": "212",
      "code": "SR"
  },
  {
      "value": "Svalbard",
      "text": "Svalbard",
      "id": "213",
      "code": "SJ"
  },
  {
      "value": "Swaziland",
      "text": "Swaziland",
      "id": "214",
      "code": "SZ"
  },
  {
      "value": "Sweden",
      "text": "Sweden",
      "id": "215",
      "code": "SE"
  },
  {
      "value": "Switzerland",
      "text": "Switzerland",
      "id": "216",
      "code": "CH"
  },
  {
      "value": "Syria",
      "text": "Syria",
      "id": "217",
      "code": "SY"
  },
  {
      "value": "Taiwan",
      "text": "Taiwan",
      "id": "218",
      "code": "TW"
  },
  {
      "value": "Tajikistan",
      "text": "Tajikistan",
      "id": "219",
      "code": "TJ"
  },
  {
      "value": "Tanzania",
      "text": "Tanzania",
      "id": "220",
      "code": "TZ"
  },
  {
      "value": "Thailand",
      "text": "Thailand",
      "id": "221",
      "code": "TH"
  },
  {
      "value": "Togo",
      "text": "Togo",
      "id": "222",
      "code": "TG"
  },
  {
      "value": "Tonga",
      "text": "Tonga",
      "id": "223",
      "code": "TO"
  },
  {
      "value": "Trinidad and Tobago",
      "text": "Trinidad and Tobago",
      "id": "224",
      "code": "TT"
  },
  {
      "value": "Tunisia",
      "text": "Tunisia",
      "id": "225",
      "code": "TN"
  },
  {
      "value": "Turkey",
      "text": "Turkey",
      "id": "226",
      "code": "TR"
  },
  {
      "value": "Turkmenistan",
      "text": "Turkmenistan",
      "id": "227",
      "code": "TM"
  },
  {
      "value": "Turks and Caicos Islands",
      "text": "Turks and Caicos Islands",
      "id": "228",
      "code": "TC"
  },
  {
      "value": "Tuvalu",
      "text": "Tuvalu",
      "id": "229",
      "code": "TV"
  },
  {
      "value": "Uganda",
      "text": "Uganda",
      "id": "230",
      "code": "UG"
  },
  {
      "value": "Ukraine",
      "text": "Ukraine",
      "id": "231",
      "code": "UA"
  },
  {
      "value": "United Arab Emirates",
      "text": "United Arab Emirates",
      "id": "232",
      "code": "AE"
  },
  {
      "value": "United Kingdom",
      "text": "United Kingdom",
      "id": "233",
      "code": "GB"
  },
  {
      "value": "United States of America",
      "text": "United States of America",
      "id": "234",
      "code": "US"
  },
  {
      "value": "United States Virgin Islands",
      "text": "United States Virgin Islands",
      "id": "235",
      "code": "VI"
  },
  {
      "value": "Uruguay",
      "text": "Uruguay",
      "id": "236",
      "code": "UY"
  },
  {
      "value": "Uzbekistan",
      "text": "Uzbekistan",
      "id": "237",
      "code": "UZ"
  },
  {
      "value": "Vanuatu",
      "text": "Vanuatu",
      "id": "238",
      "code": "VU"
  },
  {
      "value": "Vatican City",
      "text": "Vatican City",
      "id": "239",
      "code": "VA"
  },
  {
      "value": "Venezuela",
      "text": "Venezuela",
      "id": "240",
      "code": "VE"
  },
  {
      "value": "Vietnam",
      "text": "Vietnam",
      "id": "241",
      "code": "VN"
  },
  {
      "value": "Wallis and Futuna",
      "text": "Wallis and Futuna",
      "id": "242",
      "code": "WF"
  },
  {
      "value": "Yemen",
      "text": "Yemen",
      "id": "243",
      "code": "YE"
  },
  {
      "value": "Zambia",
      "text": "Zambia",
      "id": "244",
      "code": "ZM"
  },
  {
      "value": "Zimbabwe",
      "text": "Zimbabwe",
      "id": "245",
      "code": "ZW"
  }
]

export const whiteListResponseENUM = {
    whiteListed : 1,
    notWhiteListed : 2,
    blockedCustomer: 3
  
  }

  export const FRAUD_BODY = 'fraudBody'

  
 const  getFraudToolFulfillHandler = (trackid, id) => {
    let request = {
        TrackID: trackid,
        ID: id,
    }
    let axiosConfig = {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_AUTH_FRAUD_AUTHRIZATION,
          Username: process.env.NEXT_PUBLIC_FRAUDTOOL_USERNAME,
          Password: process.env.NEXT_PUBLIC_FRAUDTOOL_PASSWORD,
          MerchantCode: process.env.NEXT_PUBLIC_FRAUDTOOL_MERCHANT_CODE,
          "Content-Type": "application/json",
        },
    };
    return axios.post(`${process.env.NEXT_PUBLIC_FRAUDTOOL_API_URL}/fulfill`,request,axiosConfig);
  }

  export const paymentFullfill = async (TrackID, id) => {
    return new Promise(async (resolve, _) => {
      try {
        let paymentFullFilRes = await getFraudToolFulfillHandler(
          TrackID,
          id
        );
        resolve({ apiSucceed: true, apiRes: paymentFullFilRes });
      } catch (error) {
        console.log("something went wrong in the payment fullfil.", error);
        resolve({ apiSucceed: false, apiRes: error });
      }
    });
  };


  export function paymentSuccess(props) {
    try {
      
      console.log("paymenthotelsuccess", props);
  
      const data = localStorage.getItem('ipData')
      const cont = JSON.parse(data)
      let reg;
      let country = data?.hotelDetails?.Country;
      if(country.includes(',')){
        country = country.split(', ')[1]
      }
      if(country == cont?.country_name){
        reg = 'domestic'      
      }else{
        reg = 'International'
      }
      function formatt(date) {
        const year = date?.substring(0, 4);
        const month = date?.substring(4, 6);
        const day = date?.substring(6, 8);
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      }
      var checkIn = formatt(data?.hotelDetails?.Hotelsearchrequest?.ChkInDate);
      var checkOut = formatt(data?.hotelDetails?.Hotelsearchrequest?.ChkOutDate)
      // const cardType =props.cardTypes.filter(card => card.value == props.cardType);
      // const selectedText = cardType.length > 0 ? cardType[0].text : null;
     
      if(window && window.smartech){
        window.smartech("dispatch", "payment_success", {
          refid: props?.bookingId || '',
          // hotelcode: props.hotelDetails.MYHHotelCode||'',
          // hotelName:hotelName || '',
          category_name: 'Hotel',
          discount_amt: 0,
          amount: parseFloat(props?.grandTotal),
          payment_mode: 'Card',
          retry: 1,
          source: isMobileDevice() ? 'Mweb' : 'web'
        })
  
        window.smartech("dispatch", "hotel_checkout_initiated",{
          src:cont?.city,
          des:data?.hotelDetails?.HotelName,
          city:data?.hotelDetails?.City,
          country:data?.hotelDetails?.Country,
          region:reg,
          checkin_date:checkIn,
          checkout_date:checkOut,
          rooms:data?.hotelDetails?.HotelRooms?.[0]?.ListOfRoom[0]?.RoomCount,
          adult:data?.hotelDetails?.HotelRooms?.[0]?.ListOfRoom[0]?.RoomAdult,
          child:data?.hotelDetails?.HotelRooms?.[0]?.ListOfRoom[0]?.RoomChild,
          source: isMobileDevice() ? 'Mweb' : 'web'
        })
  
        window.smartech("dispatch", "hotel_booked", {
          hotel_name: data?.hotelDetails?.HotelName,
          city: data?.hotelDetails?.City,
          country: data?.hotelDetails?.Country,
          region: reg,
          discount_applied: data?.AppliedDiscount,
          coupon_type:'',
          checkin_date: checkIn,
          checkout_date: checkOut,
          booking_method: card,
          rooms:data?.hotelDetails?.HotelRooms?.[0]?.ListOfRoom?.[0]?.RoomCount,
          adult:data?.hotelDetails?.HotelRooms?.[0]?.ListOfRoom?.[0]?.RoomAdult,
          child:data?.hotelDetails?.HotelRooms?.[0]?.ListOfRoom?.[0]?.RoomChild,
          amount: parseFloat(props?.grandTotal),
          source: isMobileDevice() ? 'Mweb' : 'web'
          })
      }
      
    } catch (error) {
      console.log("netcore payment success error", error);      
    }
  }


  

 const  getFraudToolOrderCancelHandler = (trackid, id) => {
    let request = {
        TrackID: trackid,
        ID: id,
        Description: "booking Creation failed."
    }
    let axiosConfig = {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_AUTH_FRAUD_AUTHRIZATION,
          Username: process.env.NEXT_PUBLIC_FRAUDTOOL_USERNAME,
          Password: process.env.NEXT_PUBLIC_FRAUDTOOL_PASSWORD,
          MerchantCode: process.env.NEXT_PUBLIC_FRAUDTOOL_MERCHANT_CODE,
          "Content-Type": "application/json",
        },
    };
    return axios.post(`${process.env.NEXT_PUBLIC_FRAUDTOOL_API_URL}/cancel`,request,axiosConfig);
  }


  export const paymentFraudToolOrderCancel = async (TrackID, id) => {
    return new Promise(async (resolve, _) => {
      try {
        let res = await getFraudToolOrderCancelHandler(
          TrackID,
          id
        );
        resolve({ apiSucceed: true, apiRes: res });
      } catch (error) {
        console.log("something went wrong in the fraud tool cancel order.", error);
        resolve({ apiSucceed: false, apiRes: error });
      }
    });
  };


  export const formatCurrency = (amount) => {
    const amountStr = amount?.toString();
    
    // If the number is less than 4 digits, just return it as is
    if (amountStr?.length < 4) return amountStr;
    
    // For numbers with more than 3 digits, add commas every 3 digits from the right
    const formattedRest = amountStr?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    
    return formattedRest;
  };

  export const nearByPlaces = [
  {
    id: "chkairport",
    value: "airport",
    label: "Near by Airports",
    checked: false
  },
  {
    id: "chkpark",
    value: "amusement_park",
    label: "Amusement Parks",
    checked: false
  },
  {
    id: "chkMall",
    value: "shopping_mall",
    label: "Shopping malls",
    checked: false
  },
  {
    id: "chkbar",
    value: "bar",
    label: "Bar",
    checked: false
  },
  {
    id: "chkbustation",
    value: "bus_station",
    label: "Bus station",
    checked: false
  },
  {
    id: "chkcarrental",
    value: "car_rental",
    label: "Car rental",
    checked: false
  },
  {
    id: "chkcityhall",
    value: "city_hall",
    label: "City Hall",
    checked: false
  },
  {
    id: "chkembassy",
    value: "embassy",
    label: "Embassy",
    checked: false
  },
  {
    id: "chkhospital",
    value: "hospital",
    label: "Hospital",
    checked: false
  },
  {
    id: "chkmosque",
    value: "mosque",
    label: "Mosque",
    checked: false
  },
  {
    id: "chkmuseum",
    value: "museum",
    label: "Museum",
    checked: false
  },
  {
    id: "chknightclub",
    value: "night_club",
    label: "Night club",
    checked: false
  },
  {
    id: "chkrestaurant",
    value: "restaurant",
    label: "Restaurant",
    checked: false
  },
  {
    id: "chkspa",
    value: "spa",
    label: "Spa",
    checked: false
  },
  {
    id: "chkstadium",
    value: "stadium",
    label: "Stadium",
    checked: false
  },
  {
    id: "chksubway",
    value: "subway_station",
    label: "Subway station",
    checked: false
  },
  {
    id: "chksupermarket",
    value: "supermarket",
    label: "Supermarket",
    checked: false
  },
  {
    id: "chktrainstation",
    value: "train_station",
    label: "Train Station",
    checked: false
  }
];

export const mapDefaultZoom = 11;

export const DEFAULT_CURRENCY_CODE = "QAR";

export const STAR_RATING = {
  0: "Unrated",
  1: "1 Star",
  2: "2 Stars",
  3: "3 Stars",
  4: "4 Stars",
  5: "5 Stars"
};

export const HOTEL_AMINITIES = {
  "PF": "Pet Friendly",
  "AC": "Air Conditioning",
  "SPA": "SPA",
  "GOLF": "Golf",
  "CASINO": "Casino",
  "WIFI": "Wifi",
  "BF": "Breakfast",
  "GYM": "Gym",
  "BAR": "Bar",
  "WHEELCHAIR": "Wheelchair",
  "PARKING": "Parking",
  "RS": "Room Service",
  "BC": "Business Center",
  "POOL": "Pool",
  "ASHUTTLE": "Airport Shuttle",
  "MULTILINGUAL": "Multilingual Staff",
  "DOC": "Doctor on Call",
  "NS": "Non-Smoking",
  "BS": "Baby Sitting",
  "LAUNDRY": "Laundry",
  "RESTRO": "Restaurant",
  "HK": "House Keeping",
  "AS": "Airport Shuttle",
  "24FD": "24/7 Front Desk"
};

export const MORE_FILTER_OPTIONS = {
  pets: "Pet Friendly",
  nonallergic: "Allergic Friendly"
};

export const DEFAULT_PRICE_SORTING = "reco";

export const DEFAULT_PER_PAGE_SIZE = 20;

export const DEFAULT_NUMBER_OF_ROOM = "1";

export const DEFAULT_CURRENCY_SYMBOL = {
  "INR": "₹",
  "AED": "AED",
  "AOA": "Kz",
  "ARS": "$",
  "AUD": "AU$",
  "AZN": "AZN",
  "BDT": "Tk",
  "BGN": "лв",
  "BHD": "лв",
  "BRL": "R$",
  "BYR": "p.",
  "CAD": "C$",
  "CHF": "CHF",
  "CLP": "$",
  "CNY": "¥",
  "COP": "$",
  "DKK": "kr",
  "EGP": "EGP",
  "EUR": "€",
  "GBP": "£",
  "HKD": "$",
  "HRK": "HRK",
  "HUF": "Ft",
  "IDR": "Rp",
  "ILS": "₪",
  "JOD": "JOD",
  "JPY": "￥",
  "KWD": "KWD",
  "KZT": "KZT",
  "LKR": "LKR",
  "MXN": "$",
  "MYR": "RM",
  "NGN": "₦",
  "NOK": "kr",
  "NPR": "NPR",
  "NZD": "NZ$",
  "OMR": "OMR",
  "PEN": "S/.",
  "PHP": "₱1,",
  "PLN": "zł",
  "QAR": "QAR",
  "RON": "lei",
  "RSD": "RSD",
  "RUB": "руб.",
  "SAR": "SAR",
  "SEK": "kr",
  "SGD": "S$",
  "THB": "฿",
  "TRY": "TL",
  "TWD": "NT$",
  "UAH": "UAH",
  "USD": "$",
  "VND": "đ",
  "ZAR": "R",
}

export const CURRENCY_LIST = [
  { value: "INR", currency: "INR", image: "in" },
  { value: "AED", currency: "AED", image: "ae" },
  { value: "AOA", currency: "AOA", image: "ao" },
  { value: "AUD", currency: "AUD", image: "au" },
  { value: "AZN", currency: "AZN", image: "az" },
  { value: "BDT", currency: "BDT", image: "bd" },
  { value: "BGN", currency: "BGN", image: "bg" },
  { value: "BHD", currency: "BHD", image: "bh" },
  { value: "BRL", currency: "BRL", image: "br" },
  { value: "BYR", currency: "BYR", image: "by" },
  { value: "CAD", currency: "CAD", image: "ca" },
  { value: "CHF", currency: "CHF", image: "ch" },
  { value: "CLP", currency: "CLP", image: "cl" },
  { value: "CNY", currency: "CNY", image: "cn" },
  { value: "COP", currency: "COP", image: "co" },
  { value: "DKK", currency: "DKK", image: "dk" },
  { value: "EGP", currency: "EGP", image: "eg" },
  { value: "EUR", currency: "EUR", image: "eu" },
  { value: "GBP", currency: "GBP", image: "gb" },
  { value: "HKD", currency: "HKD", image: "hk" },
  { value: "HRK", currency: "HRK", image: "hr" },
  { value: "HUF", currency: "HUF", image: "hu" },
  { value: "IDR", currency: "IDR", image: "id" },
  { value: "ILS", currency: "ILS", image: "il" },
  { value: "JOD", currency: "JOD", image: "jo" },
  { value: "JPY", currency: "JPY", image: "jp" },
  { value: "KWD", currency: "KWD", image: "kw" },
  { value: "KZT", currency: "KZT", image: "kz" },
  { value: "LKR", currency: "LKR", image: "lk" },
  { value: "MXN", currency: "MXN", image: "mx" },
  { value: "MYR", currency: "MYR", image: "my" },
  { value: "NGN", currency: "NGN", image: "ng" },
  { value: "NOK", currency: "NOK", image: "no" },
  { value: "NPR", currency: "NPR", image: "np" },
  { value: "NZD", currency: "NZD", image: "nz" },
  { value: "OMR", currency: "OMR", image: "om" },
  { value: "PEN", currency: "PEN", image: "pe" },
  { value: "PHP", currency: "PHP", image: "ph" },
  { value: "PLN", currency: "PLN", image: "pl" },
  { value: "QAR", currency: "QAR", image: "qa" },
  { value: "RON", currency: "RON", image: "ro" },
  { value: "RSD", currency: "RSD", image: "rs" },
  { value: "RUB", currency: "RUB", image: "ru" },
  { value: "SAR", currency: "SAR", image: "sa" },
  { value: "SEK", currency: "SEK", image: "se" },
  { value: "SGD", currency: "SGD", image: "sg" },
  { value: "THB", currency: "THB", image: "th" },
  { value: "TRY", currency: "TRY", image: "tr" },
  { value: "TWD", currency: "TWD", image: "tw" },
  { value: "UAH", currency: "UAH", image: "ua" },
  { value: "USD", currency: "USD", image: "us" },
  { value: "VND", currency: "VND", image: "vn" },
  { value: "ZAR", currency: "ZAR", image: "za" },
  { value: "KRW", currency: "KRW", image: "kr" },
];

export const DATE_PICKER_MONTHS = 2;

export const DATE_PICKER_MONTHS_GROUP_BOOKING = 1;

export const DATE_PICKER_DATE_FORMAT = "dd MMM yyyy";

export const CULTURE = "en-GB";

export const CULTURE_LIST = [
  { value: "en-GB", text: "English" },
  // {value: 'fr-fr', text:'Franais'},
  // {value: 'es-es', text:'Espaol'},
  // {value: 'de-de', text:'Deutsche'},
  // {value: 'pt-pt', text:'Portugus'},
  { value: 'ar-QA', text: 'العربية' },
  // {value: "it-it", text: "Italiano" }
];

export const CULTURE_LABEL_LIST = {
  'en-GB': "English",
  'it-it': "Italiano",
  'fr-fr': "Franais",
  'es-es': "Espaol",
  'de-de': "Deutsche",
  'pt-pt': "Portugus",
  'ar-QA': "العربية"
};

export const CULTURE_LOCALE = {
  'en-GB': "en",
  'it-it': "it",
  'fr-fr': "fr",
  'es-es': "es",
  'de-de': "de",
  'pt-pt': "pt",
  'ar-QA': "ar"
};

export const CULTURE_LOCALE_CURRENT_GET = {
  'en': "en-GB",
  'it': "it-it",
  'fr': "fr-fr",
  'es': "es-es",
  'de': "de-de",
  'pt': "pt-pt",
  'ar': "ar-QA"
};

export const CULTURE_STYLE_PATH = {
  'en-GB': "lefttoright",
  'it-IT': "lefttoright",
  'fr-FR': "lefttoright",
  'pt-PT': "lefttoright",
  'es-ES': "lefttoright",
  'de-DE': "lefttoright",
  'ar-QA': "righttoleft"
};

export const DATE_PATH = {
  'en-GB': "en",
  'ar-QA': "ar",
  // 'it-it': "it"
};

export const Stops = [
  { value: "Non Stop", text: "Non Stop" },
  { value: "1 Stop", text: "1 Stop" },
  { value: "2 Stop", text: "2 Stop" },
];

export const Departure = [
  { value: "Early Morning", text: "Early Morning", time: "12.00 am - 4.59 am" },
  { value: "Morning", text: "Morning", time: "5.00 am - 11.59 am" },
  { value: "Afternoon", text: "Afternoon", time: "12.00pm - 5.59pm" },
  { value: "Evening", text: "vening", time: "6.00 am - 11.59 pm" },
];

export const Airlines = [
  { value: "Multiple Carrier", text: "Multiple Carrier" },
  { value: "Air India", text: "Air India" },
  { value: "Flydubai", text: "Flydubai" },
  { value: "Oman_Air", text: "Oman_Air" },
];
export const Airport = [
  { value: "Colombo, LK", text: "Colombo, LK", name: "Bandaranaike Intl Arpt (CMB)" },
  { value: "Muscat, OM", text: "Muscat, OM", name: "Seeb Intl (MCT)" },
  { value: "Kochi (Cochin), Kerla, IN", text: "Kochi (Cochin), Kerla, IN", name: "Kochi Intl Arpt (COK)" },
  { value: "Kuala Lumpur, MY", text: "Kuala Lumpur, MY", name: "Kuala Lumpur International Arpt (KUL" },
];

export const No_Of_Adult = 1;
export const No_Of_Child = 0;
export const No_Of_Infant = 0;
export const Default_Travel_Class = 0;


export const Card_type = [
  { value: "1", text: "Visa Card Credit", id: '1' },
  { value: "2", text: "MasterCard Credit", id: '2' },
  { value: "5", text: "Diner Club Card Credit", id: '3' },
  { value: "6", text: "Visa Card Debit", id: '4' },
  { value: "7", text: "MasterCard Debit", id: '5' },
  { value: "10", text: "Visa Electron", id: '6' },
  { value: "12", text: "American Express", id: '7' },
  { value: "13", text: "JCB Credit Card", id: '8' }
]


export const Name_prefix = [
  { value: "", text: "Title" },
  { value: "Mr", text: "Mr" },
  { value: "Miss", text: "Miss" },
  { value: "Mrs", text: "Mrs" },
  { value: "Master", text: "Master" },
]

export const Country_telcode = [
  { value: "+93", text: "Afghanistan (+93)", id: '1' },
  { value: "+355", text: "Albania (+355)", id: '2' },
  { value: "+213", text: "Algeria (+213)", id: '3' },
  { value: "+1-684", text: "American Samoa (+1-684)", id: '4' },
  { value: "+376", text: "Andorra (+376)", id: '5' },
  { value: "+244", text: "Angola (+244)", id: '6' },
  { value: "+1-264", text: "Anguilla (+1-264)", id: '7' },
  { value: "+672", text: "Antarctica (+672)", id: '8' },
  { value: "+1-268", text: "Antigua and Barbuda (+1-268)", id: '9' },
  { value: "+54", text: "Argentina (+54)", id: '10' },
  { value: "+374", text: "Armenia (+374)", id: '11' },
  { value: "+297", text: "Aruba (+297)", id: '12' },
  { value: "+61", text: "Australia (+61)", id: '13' },
  { value: "+43", text: "Austria (+43)", id: '14' },
  { value: "+994", text: "Azerbaijan (+994)", id: '15' },
  { value: "+1-242", text: "Bahamas (+1-242)", id: '16' },
  { value: "+973", text: "Bahrain (+973)", id: '17' },
  { value: "+880", text: "Bangladesh (+880)", id: '18' },
  { value: "+1-246", text: "Barbados (+1-246)", id: '19' },
  { value: "+375", text: "Belarus (+375)", id: '20' },
  { value: "+32", text: "Belgium (+32)", id: '21' },
  { value: "+501", text: "Belize (+501)", id: '22' },
  { value: "+229", text: "Benin (+229)", id: '23' },
  { value: "+1-441", text: "Bermuda (+1-441)", id: '24' },
  { value: "+975", text: "Bhutan (+975)", id: '25' },
  { value: "+591", text: "Bolivia, Plurinational State of (+591)", id: '26' },
  { value: "+387", text: "Bosnia and Herzegovina (+387)", id: '27' },
  { value: "+267", text: "Botswana (+267)", id: '28' },
  { value: "+55", text: "Brazil (+55)", id: '29' },
  { value: "+246", text: "British Indian Ocean Territory (+246)", id: '30' },
  { value: "+673", text: "Brunei Darussalam (+673)", id: '31' },
  { value: "+359", text: "Bulgaria (+359)", id: '32' },
  { value: "+226", text: "Burkina Faso (+226)", id: '33' },
  { value: "+257", text: "Burundi (+257)", id: '34' },
  { value: "+855", text: "Cambodia (+855)", id: '35' },
  { value: "+237", text: "Cameroon (+237)", id: '36' },
  { value: "+1", text: "Canada (+1)", id: '37' },
  { value: "+238", text: "Cape Verde (+238)", id: '38' },
  { value: "+1-345", text: "Cayman Islands (+1-345)", id: '39' },
  { value: "+236", text: "Central African Republic (+236)", id: '40' },
  { value: "+235", text: "Chad (+235)", id: '41' },
  { value: "+56", text: "Chile (+56)", id: '42' },
  { value: "+86", text: "China (+86)", id: '43' },
  { value: "+57", text: "Colombia (+57)", id: '44' },
  { value: "+269", text: "Comoros (+269)", id: '45' },
  { value: "+242", text: "Congo (+242)", id: '46' },
  { value: "+243", text: "Congo, the Democratic Republic of the (+243)", id: '47' },
  { value: "+682", text: "Cook Islands (+682)", id: '48' },
  { value: "+506", text: "Costa Rica (+506)", id: '49' },
  { value: "+385", text: "Croatia (+385)", id: '50' },
  { value: "+53", text: "Cuba (+53)", id: '51' },
  { value: "+599", text: "Curaçao (+599)", id: '52' },
  { value: "+357", text: "Cyprus (+357)", id: '53' },
  { value: "+420", text: "Czech Republic (+420)", id: '54' },
  { value: "+225", text: "Côte d'Ivoire (+225)", id: '55' },
  { value: "+45", text: "Denmark (+45)", id: '56' },
  { value: "+253", text: "Djibouti (+253)", id: '57' },
  { value: "+1-767", text: "Dominica (+1-767)", id: '58' },
  { value: "+1-809", text: "Dominican Republic (+1-809)", id: '59' },
  { value: "+1-829", text: "Dominican Republic (+1-829)", id: '60' },
  { value: "+1-849", text: "Dominican Republic (+1-849)", id: '61' },
  { value: "+593", text: "Ecuador (+593)", id: '62' },
  { value: "+20", text: "Egypt (+20)", id: '63' },
  { value: "+503", text: "El Salvador (+503)", id: '64' },
  { value: "+240", text: "Equatorial Guinea (+240)", id: '65' },
  { value: "+291", text: "Eritrea (+291)", id: '66' },
  { value: "+372", text: "Estonia (+372)", id: '67' },
  { value: "+251", text: "Ethiopia (+251)", id: '68' },
  { value: "+500", text: "Falkland Islands (Malvinas) (+500)", id: '69' },
  { value: "+298", text: "Faroe Islands (+298)", id: '70' },
  { value: "+679", text: "Fiji (+679)", id: '71' },
  { value: "+358", text: "Finland (+358)", id: '72' },
  { value: "+33", text: "France (+33)", id: '73' },
  { value: "+594", text: "French Guiana (+594)", id: '74' },
  { value: "+689", text: "French Polynesia (+689)", id: '75' },
  { value: "+262", text: "French Southern Territories (+262)", id: '76' },
  { value: "+241", text: "Gabon (+241)", id: '77' },
  { value: "+220", text: "Gambia (+220)", id: '78' },
  { value: "+995", text: "Georgia (+995)", id: '79' },
  { value: "+49", text: "Germany (+49)", id: '80' },
  { value: "+233", text: "Ghana (+233)", id: '81' },
  { value: "+350", text: "Gibraltar (+350)", id: '82' },
  { value: "+30", text: "Greece (+30)", id: '83' },
  { value: "+299", text: "Greenland (+299)", id: '84' },
  { value: "+1-473", text: "Grenada (+1-473)", id: '85' },
  { value: "+590", text: "Guadeloupe (+590)", id: '86' },
  { value: "+1-671", text: "Guam (+1-671)", id: '87' },
  { value: "+502", text: "Guatemala (+502)", id: '88' },
  { value: "+224", text: "Guinea (+224)", id: '89' },
  { value: "+245", text: "Guinea-Bissau (+245)", id: '90' },
  { value: "+592", text: "Guyana (+592)", id: '91' },
  { value: "+509", text: "Haiti (+509)", id: '92' },
  { value: "+39-06", text: "Holy See (Vatican City State) (+39-06)", id: '93' },
  { value: "+504", text: "Honduras (+504)", id: '94' },
  { value: "+852", text: "Hong Kong (+852)", id: '95' },
  { value: "+36", text: "Hungary (+36)", id: '96' },
  { value: "+354", text: "Iceland (+354)", id: '97' },
  { value: "+91", text: "India (+91)", id: '98' },
  { value: "+62", text: "Indonesia (+62)", id: '99' },
  { value: "+98", text: "Iran, Islamic Republic of( +98)", id: '100' },
  { value: "+964", text: "Iraq (+964)", id: '101' },
  { value: "+353", text: "Ireland (+353)", id: '102' },
  { value: "+972", text: "Israel (+972)", id: '103' },
  { value: "+39", text: "Italy (+39)", id: '104' },
  { value: "+1-876", text: "Jamaica (+1-876)", id: '105' },
  { value: "+81", text: "Japan (+81)", id: '106' },
  { value: "+962", text: "Jordan (+962)", id: '107' },
  { value: "+7", text: "Kazakhstan (+7)", id: '108' },
  { value: "+254", text: "Kenya (+254)", id: '109' },
  { value: "+686", text: "Kiribati (+686)", id: '110' },
  { value: "+850", text: "Korea, Democratic People's Republic of (+850)", id: '111' },
  { value: "+82", text: "Korea, Republic of (+82)", id: '112' },
  { value: "+965", text: "Kuwait (+965)", id: '113' },
  { value: "+996", text: "Kyrgyzstan (+996)", id: '114' },
  { value: "+856", text: "Lao People's Democratic Republic (+856)", id: '115' },
  { value: "+371", text: "Latvia (+371)", id: '116' },
  { value: "+961", text: "Lebanon (+961)", id: '117' },
  { value: "+266", text: "Lesotho (+266)", id: '118' },
  { value: "+231", text: "Liberia (+231)", id: '119' },
  { value: "+218", text: "Libya (+218)", id: '120' },
  { value: "+423", text: "Liechtenstein (+423)", id: '121' },
  { value: "+370", text: "Lithuania (+370)", id: '122' },
  { value: "+352", text: "Luxembourg (+352)", id: '123' },
  { value: "+853", text: "Macao (+853)", id: '124' },
  { value: "+389", text: "Macedonia, the Former Yugoslav Republic of (+389)", id: '125' },
  { value: "+261", text: "Madagascar (+261)", id: '126' },
  { value: "+265", text: "Malawi (+265)", id: '127' },
  { value: "+60", text: "Malaysia (+60)", id: '128' },
  { value: "+960", text: "Maldives (+960)", id: '129' },
  { value: "+223", text: "Mali (+223)", id: '130' },
  { value: "+356", text: "Malta (+356)", id: '131' },
  { value: "+692", text: "Marshall Islands (+692)", id: '132' },
  { value: "+596", text: "Martinique (+596)", id: '133' },
  { value: "+222", text: "Mauritania (+222)", id: '134' },
  { value: "+230", text: "Mauritius (+230)", id: '135' },
  { value: "+52", text: "Mexico (+52)", id: '136' },
  { value: "+691", text: "Micronesia, Federated States of (+691)", id: '137' },
  { value: "+373", text: "Moldova, Republic of (+373)", id: '138' },
  { value: "+377", text: "Monaco (+377)", id: '139' },
  { value: "+976", text: "Mongolia (+976)", id: '140' },
  { value: "+382", text: "Montenegro (+382)", id: '145' },
  { value: "+1-664", text: "Montserrat (+1-664)", id: '146' },
  { value: "+212", text: "Morocco (+212)", id: '147' },
  { value: "+258", text: "Mozambique (+258)", id: '148' },
  { value: "+95", text: "Myanmar (+95)", id: '149' },
  { value: "+264", text: "Namibia (+264)", id: '150' },
  { value: "+674", text: "Nauru (+674)", id: '151' },
  { value: "+977", text: "Nepal (+977)", id: '152' },
  { value: "+31", text: "Netherlands (+31)", id: '153' },
  { value: "+687", text: "New Caledonia (+687)", id: '154' },
  { value: "+64", text: "New Zealand (+64)", id: '155' },
  { value: "+505", text: "Nicaragua (+505)", id: '156' },
  { value: "+227", text: "Niger (+227)", id: '157' },
  { value: "+234", text: "Nigeria (+234)", id: '158' },
  { value: "+683", text: "Niue (+683)", id: '159' },
  { value: "+1-670", text: "Northern Mariana Islands (+1-670)", id: '160' },
  { value: "+47", text: "Norway (+47)", id: '161' },
  { value: "+968", text: "Oman (+968)", id: '162' },
  { value: "+92", text: "Pakistan (+92)", id: '163' },
  { value: "+680", text: "Palau (+680)", id: '164' },
  { value: "+970", text: "Palestine, State of (+970)", id: '165' },
  { value: "+507", text: "Panama (+507)", id: '166' },
  { value: "+675", text: "Papua New Guinea (+675)", id: '167' },
  { value: "+595", text: "Paraguay (+595)", id: '168' },
  { value: "+51", text: "Peru( +51)", id: '169' },
  { value: "+63", text: "Philippines (+63)", id: '170' },
  { value: "+870", text: "Pitcairn (+870)", id: '171' },
  { value: "+48", text: "Poland (+48)", id: '172' },
  { value: "+351", text: "Portugal (+351)", id: '173' },
  { value: "+1", text: "Puerto Rico (+1)", id: '174' },
  { value: "+974", text: "Qatar (+974)", id: '175' },
  { value: "+40", text: "Romania (+40)", id: '176' },
  { value: "+7", text: "Russian Federation (+7)", id: '177' },
  { value: "+250", text: "Rwanda (+250)", id: '178' },
  { value: "+590", text: "Saint Barthélemy (+590)", id: '179' },
  { value: "+290", text: "Saint Helena, Ascension and Tristan da Cunha (+290)", id: '180' },
  { value: "+1-869", text: "Saint Kitts and Nevis (+1-869)", id: '181' },
  { value: "+1-758", text: "Saint Lucia (+1-758)", id: '182' },
  { value: "+590", text: "Saint Martin (French part) (+590)", id: '183' },
  { value: "+508", text: "Saint Pierre and Miquelon (+508)", id: '184' },
  { value: "+1-784", text: "Saint Vincent and the Grenadines (+1-784)", id: '185' },
  { value: "+685", text: "Samoa (+685)", id: '186' },
  { value: "+378", text: "San Marino (+378)", id: '187' },
  { value: "+239", text: "Sao Tome and Principe (+239)", id: '189' },
  { value: "+966", text: "Saudi Arabia (+966)", id: '190' },
  { value: "+221", text: "Senegal (+221)", id: '191' },
  { value: "+381", text: "Serbia (+381)", id: '192' },
  { value: "+248", text: "Seychelles (+248)", id: '193' },
  { value: "+232", text: "Sierra Leone (+232)", id: '194' },
  { value: "+65", text: "Singapore (+65)", id: '195' },
  { value: "+1-721", text: "Sint Maarten (Dutch part) (+1-721)", id: '196' },
  { value: "+421", text: "Slovakia (+421)", id: '197' },
  { value: "+386", text: "Slovenia (+386)", id: '198' },
  { value: "+677", text: "Solomon Islands (+677)", id: '199' },
  { value: "+252", text: "Somalia (+252)", id: '200' },
  { value: "+27", text: "South Africa (+27)", id: '201' },
  { value: "+211", text: "South Sudan (+211)", id: '202' },
  { value: "+34", text: "Spain (+34)", id: '203' },
  { value: "+94", text: "Sri Lanka (+94)", id: '204' },
  { value: "+249", text: "Sudan (+249)", id: '205' },
  { value: "+597", text: "Suriname (+597)", id: '206' },
  { value: "+268", text: "Swaziland (+268)", id: '207' },
  { value: "+46", text: "Sweden (+46)", id: '208' },
  { value: "+41", text: "Switzerland (+41)", id: '209' },
  { value: "+963", text: "Syrian Arab Republic (+963)", id: '210' },
  { value: "+886", text: "Taiwan, Province of China (+886)", id: '211' },
  { value: "+992", text: "Tajikistan (+992)", id: '212' },
  { value: "+255", text: "Tanzania, United Republic of (+255)", id: '213' },
  { value: "+66", text: "Thailand (+66)", id: '214' },
  { value: "+670", text: "Timor-Leste (+670)", id: '215' },
  { value: "+228", text: "Togo (+228)", id: '216' },
  { value: "+690", text: "Tokelau (+690)", id: '217' },
  { value: "+676", text: "Tonga (+676)", id: '218' },
  { value: "+1-868", text: "Trinidad and Tobago (+1-868)", id: '219' },
  { value: "+216", text: "Tunisia (+216)", id: '220' },
  { value: "+90", text: "Turkey (+90)", id: '221' },
  { value: "+993", text: "Turkmenistan (+993)", id: '222' },
  { value: "+1-649", text: "Turks and Caicos Islands (+1-649)", id: '223' },
  { value: "+688", text: "Tuvalu (+688)", id: '224' },
  { value: "+256", text: "Uganda (+256)", id: '225' },
  { value: "+380", text: "Ukraine (+380)", id: '226' },
  { value: "+971", text: "United Arab Emirates (+971)", id: '227' },
  { value: "+44", text: "United Kingdom (+44)", id: '228' },
  { value: "+1", text: "United States (+1)", id: '229' },
  { value: "+598", text: "Uruguay (+598)", id: '230' },
  { value: "+998", text: "Uzbekistan (+998)", id: '231' },
  { value: "+678", text: "Vanuatu (+678)", id: '232' },
  { value: "+58", text: "Venezuela, Bolivarian Republic of (+58)", id: '233' },
  { value: "+84", text: "Viet Nam (+84)", id: '234' },
  { value: "+1-284", text: "Virgin Islands, British (+1-284)", id: '235' },
  { value: "+1-340", text: "Virgin Islands, U.S. (+1-340)", id: '236' },
  { value: "+681", text: "Wallis and Futuna (+681)", id: '237' },
  { value: "+212", text: "Western Sahara (+212)", id: '238' },
  { value: "+967", text: "Yemen (+967)", id: '239' },
  { value: "+260", text: "Zambia (+260)", id: '240' },
  { value: "+263", text: "Zimbabwe (+263)", id: '241' },
  { value: "+358", text: "Åland Islands (+358)", id: '242' }
]

export const BOOKING_STATUS = {
  '0': "Under Process",
  '1': "Not_Set",
  '2': "Confirmation_Pending",
  '3': "Confirmed",
  '4': "Confirmation_Error",
  '5': "Cancellation_Pending",
  '6': "Cancelled",
  '7': "Cancellation_Error",
  '8': "Ticketed",
  '9': "Fraudulent",
  '10': "Rejected",
  '11': "SoldOut",
  '12': "Confirmation_PriceMismatch",
};

export const BOOKING_STATUS_ENABLE = {
  "3": "Confirmed",
  3 : "Confirmed"
}

export const Month = [
  { value: "1", text: "01 - Jan", id: '1' },
  { value: "2", text: "02 - Feb", id: '2' },
  { value: "3", text: "03 - Mar", id: '3' },
  { value: "4", text: "04 - Apr", id: '4' },
  { value: "5", text: "05 - May", id: '5' },
  { value: "6", text: "06 - Jun", id: '6' },
  { value: "7", text: "07 - Jul", id: '7' },
  { value: "8", text: "08 - Aug", id: '8' },
  { value: "9", text: "09 - Sep", id: '9' },
  { value: "10", text: "10 - Oct", id: '10' },
  { value: "11", text: "11 - Nov", id: '11' },
  { value: "12", text: "12 - Dec", id: '12' }
]

export const Year = [
//   { value: "2022", text: "2022", id: '3' },
//   { value: "2023", text: "2023", id: '4' },
//   { value: "2024", text: "2024", id: '5' },
  { value: "2025", text: "2025", id: '6' },
  { value: "2026", text: "2026", id: '7' },
  { value: "2027", text: "2027", id: '8' },
  { value: "2028", text: "2028", id: '9' },
  { value: "2029", text: "2029", id: '10' },
  { value: "2030", text: "2030", id: '11' },
  { value: "2031", text: "2031", id: '12' },
  { value: "2032", text: "2032", id: '13' },
  { value: "2033", text: "2033", id: '14' },
  { value: "2034", text: "2034", id: '15' },
  { value: "2035", text: "2035", id: '16' },
  { value: "2036", text: "2036", id: '17' },
  { value: "2037", text: "2037", id: '18' },
  { value: "2038", text: "2038", id: '19' },
  { value: "2039", text: "2039", id: '20' },
  { value: "2040", text: "2040", id: '21' },
  { value: "2041", text: "2041", id: '22' }
]


export const Canada_States = [
  { value: "AB", text: "Alberta", id: '1' },
  { value: "BC", text: "British Columbia", id: '2' },
  { value: "MB", text: "Manitoba", id: '3' },
  { value: "NB", text: "New Brunswick", id: '4' },
  { value: "NF", text: "Newfoundland", id: '5' },
  { value: "NL", text: "Newfoundland and Labrador", id: '6' },
  { value: "NT", text: "Northwest Territories", id: '7' },
  { value: "NS", text: "Nova Scotia", id: '8' },
  { value: "NU", text: "Nunavut", id: '9' },
  { value: "ON", text: "Ontario", id: '10' },
  { value: "PE", text: "Prince Edward Island", id: '11' },
  { value: "QC", text: "Quebec", id: '12' },
  { value: "SK", text: "Saskatchewan", id: '13' },
  { value: "YT", text: "Yukon", id: '14' }
]

export const US_States = [
  { value: "AL", text: "Alabama", id: '1' },
  { value: "AK", text: "Alaska", id: '2' },
  { value: "AS", text: "American Samoa", id: '3' },
  { value: "AZ", text: "Arizona", id: '4' },
  { value: "AR", text: "Arkansas", id: '5' },
  { value: "CA", text: "California", id: '6' },
  { value: "CO", text: "Colorado", id: '7' },
  { value: "CT", text: "Connecticut", id: '8' },
  { value: "DE", text: "Delaware", id: '9' },
  { value: "DC", text: "District Of Columbia", id: '10' },
  { value: "FM", text: "Federated States of Micronesia", id: '11' },
  { value: "FL", text: "Florida", id: '12' },
  { value: "GA", text: "Georgia", id: '13' },
  { value: "GU", text: "Guam", id: '14' },
  { value: "HI", text: "Hawaii", id: '15' },
  { value: "ID", text: "Idaho", id: '16' },
  { value: "IL", text: "Illinois", id: '17' },
  { value: "IN", text: "Indiana", id: '18' },
  { value: "MT", text: "Montana", id: '19' },
  { value: "NE", text: "Nebraska", id: '20' },
  { value: "NV", text: "Nevada", id: '21' },
  { value: "NH", text: "New Hampshire", id: '22' },
  { value: "NJ", text: "New Jersey", id: '23' },
  { value: "NM", text: "New Mexico", id: '24' },
  { value: "NY", text: "New York", id: '25' },
  { value: "NC", text: "North Carolina", id: '26' },
  { value: "ND", text: "North Dakota", id: '27' },
  { value: "MO", text: "Missouri", id: '28' },
  { value: "MP", text: "Northern Mariana Islands", id: '29' },
  { value: "OH", text: "Ohio", id: '30' },
  { value: "OK", text: "Oklahoma", id: '31' },
  { value: "OR", text: "Oregon", id: '32' },
  { value: "PW", text: "Palau", id: '33' },
  { value: "PA", text: "Pennsylvania", id: '34' },
  { value: "PR", text: "Puerto Rico", id: '35' },
  { value: "RI", text: "Rhode Island", id: '36' },
  { value: "SC", text: "South Carolina", id: '37' },
  { value: "IA", text: "Iowa", id: '38' },
  { value: "KS", text: "Kansas", id: '39' },
  { value: "KY", text: "Kentucky", id: '40' },
  { value: "LA", text: "Louisiana", id: '41' },
  { value: "ME", text: "Maine", id: '42' },
  { value: "MH", text: "Marshall Islands", id: '43' },
  { value: "MD", text: "Maryland", id: '44' },
  { value: "MA", text: "Massachusetts", id: '45' },
  { value: "MI", text: "Michigan", id: '46' },
  { value: "MN", text: "Minnesota", id: '47' },
  { value: "MS", text: "Mississippi", id: '48' },
  { value: "SD", text: "South Dakota", id: '49' },
  { value: "TN", text: "Tennessee", id: '50' },
  { value: "TX", text: "Texas", id: '51' },
  { value: "UT", text: "Utah", id: '52' },
  { value: "VT", text: "Vermont", id: '53' },
  { value: "VI", text: "Virgin Islands", id: '54' },
  { value: "VA", text: "Virginia", id: '55' },
  { value: "WA", text: "Washington", id: '56' },
  { value: "WV", text: "West Virginia", id: '57' },
  { value: "WI", text: "Wisconsin", id: '58' },
  { value: "WY", text: "Wyoming", id: '59' }
]

export const DESKTOP = 'Desktop';
export const Mobile = 'Mobile';
export const Nationality = [
  { value: "AF", text: "Afghanistan", id: '1' },
  { value: "AL", text: "Albania", id: '2' },
  { value: "DZ", text: "Algeria", id: '3' },
  { value: "AS", text: "American Samoa", id: '4' },
  { value: "AD", text: "Andorra", id: '5' },
  { value: "AO", text: "Angola", id: '6' },
  { value: "AI", text: "Anguilla", id: '7' },
  { value: "AQ", text: "Antarctica", id: '8' },
  { value: "AG", text: "Antigua and Barbuda", id: '9' },
  { value: "AR", text: "Argentina", id: '10' },
  { value: "AM", text: "Armenia", id: '11' },
  { value: "AW", text: "Aruba", id: '12' },
  { value: "AU", text: "Australia", id: '13' },
  { value: "AT", text: "Austria", id: '14' },
  { value: "AZ", text: "Azerbaijan", id: '15' },
  { value: "BS", text: "Bahamas", id: '16' },
  { value: "BH", text: "Bahrain", id: '17' },
  { value: "BD", text: "Bangladesh", id: '18' },
  { value: "BB", text: "Barbados", id: '19' },
  { value: "BY", text: "Belarus", id: '20' },
  { value: "BE", text: "Belgium", id: '21' },
  { value: "BZ", text: "Belize", id: '22' },
  { value: "BJ", text: "Benin", id: '23' },
  { value: "BM", text: "Bermuda", id: '24' },
  { value: "BT", text: "Bhutan", id: '25' },
  { value: "BO", text: "Bolivia", id: '26' },
  { value: "BA", text: "Bosnia and Herzegovina", id: '27' },
  { value: "BW", text: "Botswana", id: '28' },
  { value: "BV", text: "Bouvet Island", id: '29' },
  { value: "BR", text: "Brazil", id: '30' },
  { value: "IO", text: "British Indian Ocean Territory", id: '31' },
  { value: "VG", text: "British Virgin Islands", id: '32' },
  { value: "BN", text: "Brunei", id: '33' },
  { value: "BG", text: "Bulgaria", id: '34' },
  { value: "BF", text: "Burkina Faso", id: '35' },
  { value: "BI", text: "Burundi", id: '36' },
  { value: "KH", text: "Cambodia", id: '37' },
  { value: "CM", text: "Cameroon", id: '38' },
  { value: "CA", text: "Canada", id: '39' },
  { value: "CV", text: "Cape Verde", id: '40' },
  { value: "KY", text: "Cayman Islands", id: '41' },
  { value: "CF", text: "Central African Republic", id: '42' },
  { value: "TD", text: "Chad", id: '43' },
  { value: "CL", text: "Chile", id: '44' },
  { value: "CN", text: "China", id: '45' },
  { value: "CZ", text: "Czech", id: '46' },
  { value: "CX", text: "Christmas Island", id: '47' },
  { value: "CC", text: "Cocos [Keeling] Islands", id: '48' },
  { value: "CO", text: "Colombia", id: '49' },
  { value: "KM", text: "Comoros", id: '50' },
  { value: "CK", text: "Cook Islands", id: '51' },
  { value: "CR", text: "Costa Rica", id: '52' },
  { value: "HR", text: "Croatia", id: '53' },
  { value: "CU", text: "Cuba", id: '54' },
  { value: "CW", text: "Curacao", id: '55' },
  { value: "CY", text: "Cyprus", id: '56' },
  { value: "EZ", text: "Czechia", id: '57' },
  { value: "CD", text: "Democratic Republic of the Congo", id: '58' },
  { value: "DK", text: "Denmark", id: '59' },
  { value: "DJ", text: "Djibouti", id: '60' },
  { value: "DM", text: "Dominica", id: '61' },
  { value: "DO", text: "Dominican Republic", id: '62' },
  { value: "TL", text: "East Timor", id: '63' },
  { value: "EC", text: "Ecuador", id: '64' },
  { value: "EG", text: "Egypt", id: '65' },
  { value: "SV", text: "El Salvador", id: '66' },
  { value: "GQ", text: "Equatorial Guinea", id: '67' },
  { value: "ER", text: "Eritrea", id: '68' },
  { value: "EE", text: "Estonia", id: '69' },
  { value: "ET", text: "Ethiopia", id: '70' },
  { value: "FK", text: "Falkland Islands", id: '71' },
  { value: "FO", text: "Faroe Islands", id: '72' },
  { value: "SO", text: "Federal Republic of Somalia", id: '73' },
  { value: "FM", text: "Federated States of Micronesia", id: '74' },
  { value: "FJ", text: "Fiji", id: '75' },
  { value: "FI", text: "Finland", id: '76' },
  { value: "FR", text: "France", id: '77' },
  { value: "GF", text: "French Guiana", id: '78' },
  { value: "PF", text: "French Polynesia", id: '79' },
  { value: "TF", text: "French Southern Territories", id: '80' },
  { value: "GA", text: "Gabon", id: '81' },
  { value: "GM", text: "Gambia", id: '82' },
  { value: "GG", text: "Georgia", id: '83' },
  { value: "DE", text: "Germany", id: '84' },
  { value: "GH", text: "Ghana", id: '85' },
  { value: "GI", text: "Gibraltar", id: '86' },
  { value: "GR", text: "Greece", id: '87' },
  { value: "GL", text: "Greenland", id: '88' },
  { value: "GD", text: "Grenada", id: '89' },
  { value: "GP", text: "Guadeloupe", id: '90' },
  { value: "GU", text: "Guam", id: '91' },
  { value: "GT", text: "Guatemala", id: '92' },
  { value: "GG", text: "Guernsey", id: '93' },
  { value: "GN", text: "Guinea", id: '94' },
  { value: "PU", text: "Guinea", id: '95' },
  { value: "GY", text: "Guyana", id: '96' },
  { value: "HT", text: "Haiti", id: '97' },
  { value: "HM", text: "Heard Island and McDonald Islands", id: '98' },
  { value: "HN", text: "Honduras", id: '99' },
  { value: "HK", text: "Hong Kong", id: '100' },
  { value: "HU", text: "Hungary", id: '101' },
  { value: "IS", text: "Iceland", id: '102' },
  { value: "IN", text: "India", id: '103' },
  { value: "ID", text: "Indonesia", id: '104' },
  { value: "IR", text: "Iran", id: '105' },
  { value: "IQ", text: "Iraq", id: '106' },
  { value: "IE", text: "Ireland", id: '107' },
  { value: "IM", text: "Isle of Man", id: '108' },
  { value: "IL", text: "Israel", id: '109' },
  { value: "IT", text: "Italy", id: '110' },
  { value: "CI", text: "Ivory Coast", id: '111' },
  { value: "JM", text: "Jamaica", id: '112' },
  { value: "JP", text: "Japan", id: '113' },
  { value: "JE", text: "Jersey", id: '114' },
  { value: "JO", text: "Jordan", id: '115' },
  { value: "KZ", text: "Kazakhstan", id: '116' },
  { value: "KE", text: "Kenya", id: '117' },
  { value: "KI", text: "Kiribati", id: '118' },
  { value: "KV", text: "Kosovo", id: '119' },
  { value: "KW", text: "Kuwait", id: '120' },
  { value: "KG", text: "Kyrgyzstan", id: '121' },
  { value: "LA", text: "Laos", id: '122' },
  { value: "LV", text: "Latvia", id: '123' },
  { value: "LB", text: "Lebanon", id: '124' },
  { value: "LS", text: "Lesotho", id: '125' },
  { value: "LR", text: "Liberia", id: '126' },
  { value: "LY", text: "Libya", id: '127' },
  { value: "LI", text: "Liechtenstein", id: '128' },
  { value: "LT", text: "Lithuania", id: '129' },
  { value: "LU", text: "Luxembourg", id: '130' },
  { value: "MO", text: "Macao", id: '131' },
  { value: "MK", text: "Macedonia", id: '132' },
  { value: "MG", text: "Madagascar", id: '133' },
  { value: "MW", text: "Malawi", id: '134' },
  { value: "MY", text: "Malaysia", id: '135' },
  { value: "MV", text: "Maldives", id: '136' },
  { value: "ML", text: "Mali", id: '137' },
  { value: "MT", text: "Malta", id: '138' },
  { value: "MH", text: "Marshall Islands", id: '139' },
  { value: "MQ", text: "Martinique", id: '140' },
  { value: "MR", text: "Mauritania", id: '141' },
  { value: "MU", text: "Mauritius", id: '142' },
  { value: "YT", text: "Mayotte", id: '143' },
  { value: "MX", text: "Mexico", id: '144' },
  { value: "FM", text: "Micronesia", id: '145' },
  { value: "MD", text: "Moldova", id: '146' },
  { value: "MC", text: "Monaco", id: '147' },
  { value: "MN", text: "Mongolia", id: '148' },
  { value: "ME", text: "Montenegro", id: '149' },
  { value: "MS", text: "Montserrat", id: '150' },
  { value: "MA", text: "Morocco", id: '151' },
  { value: "MZ", text: "Mozambique", id: '152' },
  { value: "BM", text: "Myanmar [Burma]", id: '153' },
  { value: "NA", text: "Namibia", id: '154' },
  { value: "NT", text: "NATO countries", id: '155' },
  { value: "NR", text: "Nauru", id: '156' },
  { value: "NP", text: "Nepal", id: '157' },
  { value: "NL", text: "Netherlands", id: '158' },
  { value: "NC", text: "New Caledonia", id: '159' },
  { value: "NZ", text: "New Zealand", id: '160' },
  { value: "NI", text: "Nicaragua", id: '161' },
  { value: "NE", text: "Niger", id: '162' },
  { value: "NG", text: "Nigeria", id: '163' },
  { value: "NU", text: "Niue", id: '164' },
  { value: "NF", text: "Norfolk Island", id: '165' },
  { value: "KN", text: "North Korea", id: '166' },
  { value: "MP", text: "Northern Mariana Islands", id: '167' },
  { value: "NO", text: "Norway", id: '168' },
  { value: "NU", text: "NULL", id: '169' },
  { value: "OM", text: "Oman", id: '170' },
  { value: "PK", text: "Pakistan", id: '171' },
  { value: "PW", text: "Palau", id: '172' },
  { value: "PA", text: "Panama", id: '173' },
  { value: "PG", text: "Papua New Guinea", id: '174' },
  { value: "PY", text: "Paraguay", id: '175' },
  { value: "PE", text: "Peru", id: '176' },
  { value: "PH", text: "Philippines", id: '177' },
  { value: "PN", text: "Pitcairn Islands", id: '178' },
  { value: "PL", text: "Poland", id: '179' },
  { value: "PT", text: "Portugal", id: '180' },
  { value: "PR", text: "Puerto Rico", id: '181' },
  { value: "QA", text: "Qatar", id: '182' },
  { value: "CG", text: "Republic of the Congo", id: '183' },
  { value: "RE", text: "Réunion", id: '184' },
  { value: "RO", text: "Romania", id: '185' },
  { value: "RU", text: "Russia", id: '186' },
  { value: "RW", text: "Rwanda", id: '187' },
  { value: "SH", text: "Saint Helena", id: '188' },
  { value: "KN", text: "Saint Kitts and Nevis", id: '189' },
  { value: "LC", text: "Saint Lucia", id: '190' },
  { value: "MF", text: "Saint Martin", id: '191' },
  { value: "PM", text: "Saint Pierre and Miquelon", id: '192' },
  { value: "VC", text: "Saint Vincent and the Grenadines", id: '193' },
  { value: "SM", text: "San Marino", id: '194' },
  { value: "ST", text: "São Tomé and Príncipe", id: '195' },
  { value: "SA", text: "Saudi Arabia", id: '196' },
  { value: "SN", text: "Senegal", id: '197' },
  { value: "RS", text: "Serbia", id: '198' },
  { value: "SC", text: "Seychelles", id: '199' },
  { value: "SL", text: "Sierra Leone", id: '200' },
  { value: "SG", text: "Singapore", id: '201' },
  { value: "SX", text: "Sint Maarten", id: '202' },
  { value: "SK", text: "Slovakia", id: '203' },
  { value: "SI", text: "Slovenia", id: '204' },
  { value: "SB", text: "Solomon Islands", id: '205' },
  { value: "SO", text: "Somalia", id: '206' },
  { value: "ZA", text: "South Africa", id: '207' },
  { value: "KS", text: "South Korea", id: '208' },
  { value: "SS", text: "South Sudan", id: '209' },
  { value: "ES", text: "Spain", id: '210' },
  { value: "LK", text: "Sri Lanka", id: '211' },
  { value: "SR", text: "Suriname", id: '212' },
  { value: "SJ", text: "Svalbard", id: '213' },
  { value: "SZ", text: "Swaziland", id: '214' },
  { value: "SE", text: "Sweden", id: '215' },
  { value: "CH", text: "Switzerland", id: '216' },
  { value: "SY", text: "Syria", id: '217' },
  { value: "TW", text: "Taiwan", id: '218' },
  { value: "TJ", text: "Tajikistan", id: '219' },
  { value: "TZ", text: "Tanzania", id: '220' },
  { value: "TH", text: "Thailand", id: '221' },
  { value: "TG", text: "Togo", id: '222' },
  { value: "TO", text: "Tonga", id: '223' },
  { value: "TT", text: "Trinidad and Tobago", id: '224' },
  { value: "TN", text: "Tunisia", id: '225' },
  { value: "TR", text: "Turkey", id: '226' },
  { value: "TM", text: "Turkmenistan", id: '227' },
  { value: "TC", text: "Turks and Caicos Islands", id: '228' },
  { value: "TV", text: "Tuvalu", id: '229' },
  { value: "UG", text: "Uganda", id: '230' },
  { value: "UA", text: "Ukraine", id: '231' },
  { value: "AE", text: "United Arab Emirates", id: '232' },
  { value: "GB", text: "United Kingdom", id: '233' },
  { value: "US", text: "United States of America", id: '234' },
  { value: "VI", text: "United States Virgin Islands", id: '235' },
  { value: "UY", text: "Uruguay", id: '236' },
  { value: "UZ", text: "Uzbekistan", id: '237' },
  { value: "VU", text: "Vanuatu", id: '238' },
  { value: "VA", text: "Vatican City", id: '239' },
  { value: "VE", text: "Venezuela", id: '240' },
  { value: "VN", text: "Vietnam", id: '241' },
  { value: "WF", text: "Wallis and Futuna", id: '242' },
  { value: "YE", text: "Yemen", id: '243' },
  { value: "ZM", text: "Zambia", id: '244' },
  { value: "ZW", text: "Zimbabwe", id: '245' }
]

export const GROUP_TYPES = [
  { id: 2, value: "5", text: "Association" },
  { id: 3, value: "10", text: "Bachelor-ette Party" },
  { id: 4, value: "20", text: "Birthday Party" },
  { id: 5, value: "30", text: "Business Meeting" },
  { id: 6, value: "40", text: "Bus Tour" },
  { id: 7, value: "45", text: "Charity Event" },
  { id: 8, value: "50", text: "Class Reunion" },
  { id: 9, value: "70", text: "Convention" },
  { id: 10, value: "80", text: "Corporate Incentive Travel" },
  { id: 11, value: "90", text: "Family Reunion" },
  { id: 12, value: "95", text: "Fraternity / Sorority" },
  { id: 13, value: "100", text: "Golf" },
  { id: 14, value: "102", text: "Government" },
  { id: 15, value: "103", text: "Graduation" },
  { id: 16, value: "105", text: "Holiday Party" },
  { id: 17, value: "110", text: "Military" },
  { id: 18, value: "115", text: "Music Band" },
  { id: 19, value: "120", text: "Religious / Church Event" },
  { id: 20, value: "130", text: "Reunion" },
  { id: 21, value: "135", text: "School Trip" },
  { id: 22, value: "137", text: "Scout Troop" },
  { id: 23, value: "140", text: "Sports Team - Adult" },
  { id: 24, value: "143", text: "Sports Team - Youth" },
  { id: 25, value: "146", text: "Theater" },
  { id: 26, value: "150", text: "Wedding" },
  { id: 27, value: "160", text: "Work Crew" },
  { id: 28, value: "170", text: "Other" },
]

export const top_Destinations = [
  {destinationId: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ', destination: 'Paris'},
  {destinationId: 'ChIJn8o2UZ4HbUcRRluiUYrlwv0', destination: 'Vienna'},
  {destinationId: 'ChIJ-Rwh1mt9MEARa2zlel5rPzQ', destination: 'Baku'},
  {destinationId: 'ChIJAVkDPzdOqEcRcDteW0YgIQQ', destination: 'Berlin'},
  {destinationId: 'ChIJN90Pvwa_ohQRRHp75-tdqPo', destination: 'Mykonos'},
  {destinationId: 'ChIJ674hC6Y_WBQRujtC6Jay33k', destination: 'Cairo'},
  {destinationId: 'ChIJRcbZaklDXz4RYlEphFBu5r0', destination: 'Dubai'},
  {destinationId: 'ChIJf-jc_zTFRT4RsdTPeJ8x2UQ', destination: 'Doha'},
  {destinationId: 'ChIJawhoAASnyhQR0LABvJj-zOE', destination: 'Istanbul'},
  {destinationId: 'ChIJdd4hrwug2EcRmSrV3Vo6llI', destination: 'London'}
];

export const KhayaHotelMHIds = [
"MH-02710496",
"MH-02710497",
"MH-02710498",
"MH-02710499",
"MH-02710500",
"MH-02710501",
"MH-00905368",
"MH-00101050",
"MH-00856955",
"MH-00719214",
"MH-00169520",
"MH-00532928",
"MH-02702657",
"MH-00506722",
]

export const FIVE_MB_IN_BYTES = 5000000;

export const DELAY_FOR_LISTING_MORE_API_CALL_IN_MILISECOND =2000
export const DELAY_FOR_ROOM_MORE_API_CALL_IN_MILISECOND =2000


export const convetDateTimeFormat = (str) => {
    if (!str) { 
      return "";
    }
    return moment(str).format("ll");
  }

  export const dateDiff = (endDate, startDate)  => {
    if (endDate && startDate) {
      return moment(endDate).diff(moment(startDate), "days");
    } else {
      return "";
    }
  }

  export const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }


  export const  getCookie = (name) => {
    if (typeof document === 'undefined') {
      return null;
 }
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}