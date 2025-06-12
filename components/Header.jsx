"use client";
import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  Divider,
  Link,
  Image,
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure , Input , Checkbox
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { createAccount,loginAccount,logout} from "../redux/slices/AuthSlice";
import CryptoJS from 'crypto-js';
import { useDispatch,useSelector } from 'react-redux';
import { setUtm } from "../redux/slices/utmSlice";

import { getUTMParams } from "../utils/getutmParams";
import { setCurrencyInStore, setIconCurr } from "../redux/slices/citySlice";
import { ClientPageRoot } from "next/dist/client/components/client-page";
function Header() {
const dispatch = useDispatch()
const newRef = useRef(null);
const utm = useSelector((state) => state.utm);

const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    emailUpdates: false,
  });
  const [forgotData, setForgotData] = useState({
    email: ''
  });
   const [currentView, setCurrentView] = useState('login');
  //  console.log("currentView",currentView)
  const [invalidMail, setInvalidMail] = useState(false);
const [invalidPasswd, setInvalidPasswd] = useState(false);
const [samePwdError, setSamePwdError] = useState(false);

const [apiError, setApiError] = useState('');
const [accountCreated, setAccountCreated] = useState(false);
const [accountExist, setAccountExist] = useState(false);
const [incorPwd, setIncorPwd] = useState(false);
const [emailNotVeryfied, setEmailNotVeryfied] = useState(false);
const [usrnot_exist, setUsrnot_exist] = useState(false);

const [fpemailreq, setFpemailreq] = useState(false);
const [validemail, setValidemail] = useState(false);
const [forgotMailSent, setForgotMailSent] = useState(false);
const [forgotMailErr, setForgotMailErr] = useState(false);
const [loginFirstName, setLoginFirstName] = useState("");
const { isLoggedIn, data } = useSelector((state) => state.auth);
 const [lgDrop, setLgDrop] = useState(false);


 const globalCurrency = useSelector((state) => state?.listing?.currency);
  const globalFlag = useSelector((state) => state?.listing?.currIcon);
  const [selectCurrency, setSelectCurrency] = useState({
    code: globalCurrency||"INR",
    flag: globalFlag||"twemoji:flag-india",
  });
  const [showCurrency, setCurrency] = useState(false);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
 const handleViewChange = (newView) => {
    setCurrentView(newView);
    onOpen()
  };
   useEffect(() => {
    const utmData = getUTMParams();
    dispatch(setUtm(utmData));
  }, [dispatch]);


   const getEncrypt = (str) => {
    let text = str;
  let key = process.env.NEXT_PUBLIC_LOGIN_ENCRYPT_KEY;
  text = CryptoJS.enc.Utf8.parse(text);
  key = CryptoJS.enc.Utf8.parse(key);
  let encrypted = CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  
  return encrypted;
};
  const language = [
    { lng: "English" },
    { lng: "عربى" },
    { lng: "Français" },
    { lng: "Italiano" },
    { lng: "Español" },
    { lng: "Deutsche" },
    { lng: "Português" },
    { lng: "русский" },
  ];

  const currencies = [
    { code: "INR", flag: "twemoji:flag-india" },
    { code: "AED", flag: "twemoji:flag-united-arab-emirates" },
    { code: "AOA", flag: "twemoji:flag-angola" },
    { code: "AUD", flag: "twemoji:flag-australia" },
    { code: "AZN", flag: "twemoji:flag-azerbaijan" },
    { code: "BDT", flag: "twemoji:flag-bangladesh" },
    { code: "BGN", flag: "twemoji:flag-bulgaria" },
    { code: "BHD", flag: "twemoji:flag-bahrain" },
    { code: "BRL", flag: "twemoji:flag-brazil" },
    { code: "BYR", flag: "twemoji:flag-belarus" },
    { code: "CAD", flag: "twemoji:flag-canada" },
    { code: "CHF", flag: "twemoji:flag-switzerland" },
    { code: "CLP", flag: "twemoji:flag-chile" },
    { code: "CNY", flag: "twemoji:flag-china" },
    { code: "COP", flag: "twemoji:flag-colombia" },
    { code: "DKK", flag: "twemoji:flag-denmark" },
    { code: "EGP", flag: "twemoji:flag-egypt" },
    { code: "EUR", flag: "twemoji:flag-italy" },
    { code: "GBP", flag: "twemoji:flag-united-kingdom" },
    { code: "HKD", flag: "twemoji:flag-hong-kong-sar-china" },
    { code: "HRK", flag: "twemoji:flag-croatia" },
    { code: "HUF", flag: "twemoji:flag-hungary" },
    { code: "IDR", flag: "twemoji:flag-indonesia" },
    { code: "ILS", flag: "twemoji:flag-israel" },
    { code: "JOD", flag: "twemoji:flag-jordan" },
    { code: "JPY", flag: "twemoji:flag-japan" },
    { code: "KWD", flag: "twemoji:flag-kuwait" },
    { code: "KZT", flag: "twemoji:flag-kazakhstan" },
    { code: "LKR", flag: "twemoji:flag-sri-lanka" },
    { code: "MXN", flag: "twemoji:flag-mexico" },
    { code: "MYR", flag: "twemoji:flag-malaysia" },
    { code: "NGN", flag: "twemoji:flag-nigeria" },
    { code: "NOK", flag: "twemoji:flag-norway" },
    { code: "NPR", flag: "twemoji:flag-nepal" },
    { code: "NZD", flag: "twemoji:flag-new-zealand" },
    { code: "OMR", flag: "twemoji:flag-oman" },
    { code: "PEN", flag: "twemoji:flag-peru" },
    { code: "PHP", flag: "twemoji:flag-philippines" },
    { code: "PLN", flag: "twemoji:flag-poland" },
    { code: "QAR", flag: "twemoji:flag-qatar" },
    { code: "RON", flag: "twemoji:flag-romania" },
    { code: "RSD", flag: "twemoji:flag-serbia" },
    { code: "RUB", flag: "twemoji:flag-russia" },
    { code: "SAR", flag: "twemoji:flag-saudi-arabia" },
    { code: "SEK", flag: "twemoji:flag-sweden" },
    { code: "SGD", flag: "twemoji:flag-singapore" },
    { code: "THB", flag: "twemoji:flag-thailand" },
    { code: "TRY", flag: "twemoji:flag-for-flag-turkey" },
    { code: "TWD", flag: "twemoji:flag-taiwan" },
    { code: "UAH", flag: "twemoji:flag-ukraine" },
    { code: "USD", flag: "twemoji:flag-united-states" },
    { code: "VND", flag: "twemoji:flag-vietnam" },
    { code: "ZAR", flag: "twemoji:flag-south-africa" },
  ];

  const handleShowCurrency = () => {
    setCurrency((prev) => !prev);
  };

  const handleSelectCurrency = (currencyCode, flagIcon) => {

    console.log({ code: currencyCode, flag: flagIcon })
    setSelectCurrency({ code: currencyCode, flag: flagIcon });
    setCurrency(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("globalCurrency", currencyCode);
      localStorage.setItem("globalFlag", flagIcon);
    }
    dispatch(setCurrencyInStore(currencyCode));
    dispatch(setIconCurr(flagIcon));
  };
useEffect(() => {
  if (isLoggedIn === true && data?.firstName) {
    setLoginFirstName(data.firstName);
  } else if (typeof window !== 'undefined') {
    const localdata = localStorage.getItem('userProfileData');
    let localFirstName = '';
    try {
      const userData = JSON.parse(localdata);
      localFirstName = userData?.userLoginDetails?.result?.firstName || '';
    } catch {
      localFirstName = '';
    }
    setLoginFirstName(localFirstName);
  } else {
    setLoginFirstName('');
  }
}, [isLoggedIn, data]);

    const updateLoginField = (name, value) => {
    setLoginData(prev => ({ ...prev, [name]: value }));
  };
    const toggleRememberMe = () => {
    setLoginData(prev => ({ ...prev, rememberMe: !prev.rememberMe }));
  };
  const updateSignupField = (name, value) => {
    setSignupData(prev => ({ ...prev, [name]: value }));
  };
    const toggleEmailUpdates = () => {
    setSignupData(prev => ({ ...prev, emailUpdates: !prev.emailUpdates }));
  };
 const updateForgotField = (name, value) => {
    // console.log("name",name,value)
    setForgotData(prev => ({ ...prev, [name]: value }));
  };
     const handleLoginSubmit = async (e) => {
  e.preventDefault();
  setInvalidMail(false);
  setInvalidPasswd(false);
  setIncorPwd(false);
  setEmailNotVeryfied(false);
  setUsrnot_exist(false);
  setApiError('');
  const { email, password,rememberMe } = loginData;

  if (email && password) {
    const emailRegex = /^[\w\-.\+]+@[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailRegex.test(email);

    if (isValidEmail) {
      let loginDetails = {
        emailid: email,
        password: getEncrypt(password),

      };

      try {
        const resultAction = await dispatch(loginAccount(loginDetails));
        
        let loginRes = resultAction?.payload
        
           if(loginRes.message === '-1' ){
                    setIncorPwd(false)
                    setEmailNotVeryfied(false)
                    setUsrnot_exist(true)
                   
                  }else if(loginRes.message === '-2'){
                    setIncorPwd(false)
                    setEmailNotVeryfied(true)
                    setUsrnot_exist(false)
                  }else if(loginRes.message === '-3'){
                    setIncorPwd(true)
                    setEmailNotVeryfied(false)
                    setUsrnot_exist(false)
                  }
                  else if(loginRes.message === '-4'){
                    setIncorPwd(false)
                    setEmailNotVeryfied(false)
                    setUsrnot_exist(true)
                  }
                   else if(loginRes.message == null){
                   onClose();
                   if(rememberMe){
                        localStorage.setItem(
                            "email",  
                            email
                          );
                          
                    }else{
                        localStorage.removeItem("email");
                       
                    }
                    let token=loginRes.Token
                    // console.log("token",token)
                    let getUserID = {
                        userIdToken: loginRes.result.userIdToken,
                      };
                      let getEmailID = {
                        loginId: loginRes.result.userIdToken,
                        FromWeb: 'true'
                      };
                      let getMhPont = {
                        userIdToken: loginRes.result.userIdToken,
                        baseCurrency:"QAR",
                      };
                      let userProfileData = {
                        loginEmail:email,
                        userLoginDetails:loginRes,
                        dataTravller:'',
                        dataPaymentInfo:'',
                        dataUserProfile:'',
                        dataUserBooking:'',
                        dataMHPoits:''
                      };
                      localStorage.setItem(
                        "userProfileData",
                        JSON.stringify(userProfileData)
                      );
                      const dataTravllerRes= await fetch(`${process.env.NEXT_PUBLIC_LOGIN_BASE_API_URL}GetTravellerDetails`,{
                        method: "POST",
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}` 
                        },
                        body: JSON.stringify(getUserID),
                      })
                      let dataTravller = await dataTravllerRes.json();
                      userProfileData.dataTravller = dataTravller;
                              localStorage.setItem(
                                "userProfileData",
                                JSON.stringify(userProfileData)
                              );
                      
                      let dataPaymentInfoRes = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_BASE_API_URL}GetProfileCards`,{
                        method: "POST",
                        headers: {
                          'Content-Type': 'application/json',
                           Authorization: `Bearer ${token}` 
                        },
                        body: JSON.stringify(getUserID),
                      })
                      let dataPaymentInfo = await dataPaymentInfoRes.json();
                      userProfileData.dataPaymentInfo = dataPaymentInfo;
                              localStorage.setItem(
                                "userProfileData",
                                JSON.stringify(userProfileData)
                              );
                      
                      let dataUserProfileRes = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_BASE_API_URL}GetUserProfile`,{
                        method: "POST",
                        headers: {
                          'Content-Type': 'application/json',
                           Authorization: `Bearer ${token}` 
                        },
                        body: JSON.stringify(getEmailID),
                      })
                      let dataUserProfile = await dataUserProfileRes.json();
                      userProfileData.dataUserProfile = dataUserProfile;
                      localStorage.setItem(
                        "userProfileData",
                        JSON.stringify(userProfileData)
                        
                      );
              
                      let dataUserBookingRes = await fetch( `${process.env.NEXT_PUBLIC_LOGIN_BASE_API_URL}GetFlightBookings`,{
                        method:"POST",
                        headers: {
                          'Content-Type': 'application/json',
                           Authorization: `Bearer ${token}` 
                        },
                        body: JSON.stringify(getUserID),
                      })
                       let dataUserBooking = await dataUserBookingRes.json(); 
                       userProfileData.dataUserBooking = dataUserBooking;
                       localStorage.setItem(
                         "userProfileData",
                         JSON.stringify(userProfileData)
                       );
              
                        let dataMHPoitsRes = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_BASE_API_URL}CustomerLoyalityPointsDetails`,{
                          method: "POST",
                          headers: {
                            'Content-Type': 'application/json',
                             Authorization: `Bearer ${token}` 
                          },
                          body: JSON.stringify(getMhPont),
                        })
                        let dataMHPoits = await dataMHPoitsRes.json();
                        userProfileData.dataMHPoits = dataMHPoits;
                        localStorage.setItem(
                          "baseCurr","QAR"
                        );
                        localStorage.setItem(
                          "userProfileData",
                          JSON.stringify(userProfileData)
                        );
                       
                  }
      } catch (error) {
        console.error("Login failed:", error);
        setApiError("Login failed. Please try again.");
      }

    } else {
      setInvalidMail(true);
    }
  } else {
    if (!email) setInvalidMail(true);
    if (!password) setInvalidPasswd(true);
  }
};
const handleSignupSubmit = async (e) => {
  e.preventDefault();

  const emailRegex = /^[\w\-.\+]+@[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,4}$/;
  const passwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,}$/;

  const isValidEmail = emailRegex.test(signupData.email);
  const isValidPasswd = passwdRegex.test(signupData.password);
  const isSamePwd = signupData.password === signupData.confirmPassword;

  if (!isValidEmail) return setInvalidMail(true);
  if (!isValidPasswd) return setInvalidPasswd(true);
  if (!isSamePwd) return setSamePwdError(true);

  const signupPayload = {
    emailid: signupData.email,
    Password: getEncrypt(signupData.password),
    FirstName: signupData.firstName,
    LastName: signupData.lastName,
    IsEmailUpdate: signupData.emailUpdates
  };

  try {
   

    const resultAction = await dispatch(createAccount(signupPayload));
 
    if (createAccount.fulfilled.match(resultAction)) {
      const signupRes = resultAction.payload;

      if (signupRes.result === '1') {
  setAccountCreated(true);
  setTimeout(() => {
    setAccountCreated(false);
        
onClose(); 
  }, 3000); 

  setSignupData({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    emailUpdates: false
  });
}

       else if (signupRes.result === '-1') {
        setAccountExist(true);
        setApiError('An account with this email already exists.');
        setTimeout(() => {
          setAccountExist(false);
          setApiError('');
        }, 5000);
      }
    } else {
      console.error('Signup failed:', resultAction.payload);
    }
   

  } catch (err) {
    console.error('Signup error:', err);
  }
};
   const handleForgotSubmit = async (e) => {
    e.preventDefault();
   
    
    if (!forgotData.email) {
      setFpemailreq(true);
      return;
    }
    
    const emailRegex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    const isValidEmail = emailRegex.test(forgotData.email);
    
    if (!isValidEmail) {
      setValidemail(true);
      return;
    }

    let country = "", page_culture = 'en';
    // const parts = router.asPath.split('/');
    // for (const part of parts) {
    //   if (part.includes('en-') || part.includes('ar-')) {
    //     country = part.split('-')[1];
    //     page_culture = part.split('-')[0];
    //   }
    // }
    
    page_culture = page_culture && page_culture !== 'newsletter' ? page_culture : "en";
    country = country ? country.split("-")[0] : "";
    
    let culture = {
      en: "en-GB",
      ar: "ar-QA",
      fr: "fr-FR",
      de: "de-DE",
      pt: "pt-PT",
      ru: "ru-RU",
      es: "es-ES",
      ur: "ur-PK",
      it: "it-IT",
    };
    
    let pagecompCult = culture[page_culture];
    let culturecode = {
      "es-ES": "14",
      "en-GB": "186",
      "fr-FR": "190",
      "de-DE": "201",
      "pt-PT": "202",
      "ru-RU": "203",
      "ar-QA": "144",
      "ur-PK": "86",
      "it-IT": "88",
    };
    
    let cultureId = culturecode[pagecompCult];
    let countryList = ["bz", "ir", "lb", "ye", "tr"];
    let emailUrl = "";
    
    if (country && countryList.includes(country) == false) {
      emailUrl = `https://${country}.myholidays.com/Common/${page_culture.toUpperCase()}/UI/ChangePassword.aspx?Code=`;
    } else {
      emailUrl = `https://booking.myholidays.com/Common/${page_culture.toUpperCase()}/UI/ChangePassword.aspx?Code=`;
    }

    let forgotPayload = {
      cultureId: parseInt(cultureId),
      mailUrl: emailUrl,
      emailId: forgotData.email,
      type: 1,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_BASE_API_URL}ForgetUserPassword`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(forgotPayload),
      });

      const forgotDataRes = await res.json();
      
      if (forgotDataRes.result === true) {
        setForgotMailSent(true);
        setForgotMailErr(false);
        
        setTimeout(() => {
          setForgotMailSent(false);
        
          setForgotData({ email: '' });
        }, 4000);
      } else if (forgotDataRes.result === false) {
        setForgotMailErr(true);
        setTimeout(() => {
          setForgotMailErr(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setForgotMailErr(true);
      setTimeout(() => {
        setForgotMailErr(false);
      }, 3000);
    }
  };

  return (
    <Fragment>
      <div className="bg-gradient-to-r from-[#002d61] to-[#011a36] py-2">
        <div className="container mx-auto px-2 xl:px-0">
          <ul className="flex h-5 items-center space-x-4 text-small justify-end relative">
            {/* Blog link */}
            <li>
              <Link href="#" className="text-white md:text-[14px] text-[12px]">
                Find Booking
              </Link>
            </li>
            <Divider orientation="vertical" className="bg-white" />
            {/* <li>
              <Button
                onClick={() => handleOpenModal('login')} 
                type="button"
                className="text-white md:text-[14px] text-[12px] bg-transparent px-0"
              >
                Login | SignUp
              </Button>
            </li> */}
             {loginFirstName ? (
            <li onClick={() => setLgDrop(!lgDrop)} className="text-white cursor-pointer relative">
              Welcome <span>{loginFirstName}</span>
              {lgDrop && (
                <div className="absolute top-[35px] bg-white w-[220px] z-[99]" ref={newRef}>
                  <ul>
                    <li className="text-black p-2 border-b-1 border-solid">
                      <a href={`/userprofile?${utm.queryParam}`}>Profile</a>
                    </li> 
                    <li className="text-black p-2 border-b-1 border-solid">
                      <a href={`/userprofile?tab=5&${utm.queryParam}`}>
                        My Booking
                      </a>
                    </li>
                    <li className="text-black p-2 border-b-1 border-solid">
                      <a
                       href=""
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(logout());
                          setLoginFirstName('');
                          netcoreLogOut();
                        }}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          ) : (
            <li>
              <button
                onClick={() => handleViewChange('login')} 
                type="button"
                className="text-white md:text-[14px] text-[12px] bg-transparent px-0"
              >
                Login | SignUp
              </button>
            </li>
          )}
            <li>
              <button
                onClick={handleShowCurrency}
                type="button"
                className="text-[#00575e] font-semibold text-[14px] rounded-[5px] bg-white px-2 flex justify-between items-center w-[100px] h-[30px]"
              >
                <Icon icon={selectCurrency.flag} width="15" height="15" />
                {selectCurrency.code}
                <Icon
                  icon={showCurrency ? "oui:arrow-up" : "oui:arrow-down"}
                  width="16"
                  height="16"
                />
              </button>
              <div
                className={`md:w-[450px] w-full bg-white border-1 border-solid border-[#dddddd] absolute top-[35px] right-0 rounded-[5px] z-[99] p-2 ${
                  showCurrency ? "block" : "hidden"
                }`}
              >
                <div className="my-2">
                  <h4 className="text-[#000000] text-[14px] font-semibold mb-2">
                    Select Currency
                  </h4>
                  <div className="grid md:grid-cols-5 grid-cols-4 gap-2">
                    {currencies.map(({ code, flag }) => (
                      <Button
                        onClick={() => handleSelectCurrency(code, flag)}
                        key={code}
                        className="bg-white flex items-center text-[14px] gap-1 border-1 border-solid border-[#dddddd] rounded-none h-[30px] hover:bg-[#00575e] hover:text-white"
                      >
                        <Icon icon={flag} width="15" height="15" /> {code}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>{" "}
            </li>{" "}
          </ul>
        </div>
      </div>

      {/* Logo header */}
      <header>
        <div className="container mx-auto py-2 px-2 xl:px-0">
          <Link href="#">
            <Image
              src="https://c.regencyholidays.com/cms/images/theme/regencyholiday_logo.svg"
              alt="Regency Holidays"
              className="md:h-[50px] h-[45px] rounded-none"
            />
          </Link>
        </div>
      </header>

     



      <Modal className="rounded-none" isOpen={isOpen} onOpenChange={onOpenChange}>
  <ModalContent>
    {(onClose) => (
      <>
        {currentView === 'login' && (
          <>
            <ModalHeader className="flex gap-1 border-b-1 border-solid text-[#174982] font-semibold">
              <Icon icon="material-symbols-light:lock-outline" className='text-[#174982]' width="24" height="24" /> Login
            </ModalHeader>
              <ModalBody>
               <p className='text-black text-[14px]'>Log in with Myholidays account</p>
            <form onSubmit={handleLoginSubmit}>
              <Input
                isRequired
                label="Email"
                type="email"
                placeholder='Enter email address'
                variant='bordered'
                className='mb-2'
                value={loginData.email}
                onChange={e => updateLoginField('email', e.target.value)}
                classNames={{ inputWrapper: "border-1 border-solid rounded-[5px]" }}
              />
               {invalidMail && <p className="text-red-500 text-sm mb-3">Please enter a valid email address.</p>}

              <Input
                isRequired
                label="Password"
                type="password"
                placeholder='Enter Password'
                variant='bordered'
                className='mb-2'
                 value={loginData.password}
                onChange={e => updateLoginField('password', e.target.value)}
                classNames={{ inputWrapper: "border-1 border-solid rounded-[5px]" }}
              />
            {invalidPasswd && <p className="text-red-500 text-sm mb-3">Password is required.</p>}
              {usrnot_exist && <p className="text-red-500 text-sm mb-3">User does not exist.</p>}
              {emailNotVeryfied && <p className="text-red-500 text-sm mb-3">Email is not verified. Please check your inbox.</p>}
              {incorPwd && <p className="text-red-500 text-sm mb-3">Incorrect password.</p>}
              {apiError && <p className="text-red-500 text-sm mb-3">{apiError}</p>}

              <Checkbox isSelected={loginData.rememberMe} onChange={toggleRememberMe}>
                Remember me on this computer
              </Checkbox>

              <Button type='submit' className='bg-[#174982] text-white block w-full rounded-[5px] h-[50px] text-[16px] mt-5'>
                Login
              </Button>

              <div className="flex items-center h-[30px] space-x-4 text-small justify-center my-5">
                <Button 
                 onPress={() => handleViewChange('signup')} 
                  className="text-[#174982] text-[14px] bg-transparent px-1"
                >
                  New User Sign Up
                </Button>
                <Divider orientation="vertical" className="bg-black" />
                <Button 
                      onPress={() =>handleViewChange('forgot')} 
                  className="text-[#b81a52] text-[14px] bg-transparent px-1"
                >
                  Forgot Password
                </Button>
              </div>
            </form>
            </ModalBody>
          </>
        )}
         {currentView === 'signup' && (
          <>
            <ModalHeader className="flex gap-1 border-b-1 border-solid text-[#174982] font-semibold">
              <Icon icon="si:user-line" className='text-[#174982]' width="24" height="24" /> Register
            </ModalHeader>
             <ModalBody>
          <p className='text-black text-[14px]'>Create a Myholidays account</p>
          <form className='pb-5' onSubmit={handleSignupSubmit} >
            <Input
              isRequired
              label="First Name"
              type="text"
              placeholder="Enter First Name"
              variant="bordered"
              className="mb-5"
              value={signupData.firstName}
              onChange={e => updateSignupField('firstName', e.target.value)}
              classNames={{ inputWrapper: "border-1 border-solid rounded-[5px]" }}
            />

            <Input 
              isRequired 
              label="Last Name" 
              type="text" 
              placeholder='Enter Last Name' 
              variant='bordered' 
              className='mb-5'
              value={signupData.lastName}
              onChange={e => updateSignupField('lastName', e.target.value)} 
              classNames={{ inputWrapper: "border-1 border-solid rounded-[5px]" }} 
            />

            <Input
              isRequired
              label="Email Address"
              type="email"
              placeholder='Enter Email Address'
              variant='bordered'
              className='mb-1'
              value={signupData.email}
              onChange={e => {
                updateSignupField('email', e.target.value);
                setInvalidMail(false);
              }}
              classNames={{ inputWrapper: "border-1 border-solid rounded-[5px]" }}
            />
            {invalidMail &&<p className="text-red-500 text-sm mb-3">Please enter a valid email address.</p>}

            <Input
              isRequired
              label="Password"
              type="password"
              placeholder='Enter Password'
              variant='bordered'
              className='mb-1'
              value={signupData.password}
              onChange={e => {
                updateSignupField('password', e.target.value);
                setInvalidPasswd(false);
              }}
              classNames={{ inputWrapper: "border-1 border-solid rounded-[5px]" }}
            />
          
              {invalidPasswd && <p className="text-red-500 text-sm mb-3">
                Password must contain uppercase, lowercase, number, special character, and be at least 8 characters.
              </p>}
          

            <Input
              isRequired
              label="Confirm Password"
              type="password"
              placeholder='Enter Confirm Password'
              variant='bordered'
              className='mb-1'
              value={signupData.confirmPassword}
              onChange={e => {
                updateSignupField('confirmPassword', e.target.value);
                setSamePwdError(false);
              }}
              classNames={{ inputWrapper: "border-1 border-solid rounded-[5px]" }}
            />
            {samePwdError && <p className="text-red-500 text-sm mb-3">Passwords do not match.</p>}

            <div className=''>
              <p className='text-black text-[14px] mb-2 font-semibold'>Password must meet the following requirements:</p>
              <ul>
                <li className='text-[12px] text-black mb-2'><span className='text-[#b81a52]'>Atleast </span> 8 characters</li>
                <li className='text-[12px] text-black mb-2'><span className='text-[#b81a52]'>Atleast </span> one lowercase</li>
                <li className='text-[12px] text-black mb-2'><span className='text-[#b81a52]'>Atleast </span> one uppercase</li>
                <li className='text-[12px] text-black mb-2'><span className='text-[#b81a52]'>Atleast </span> one number</li>
                <li className='text-[12px] text-black mb-2'><span className='text-[#b81a52]'>Atleast </span> one special character</li>
              </ul>
            </div>

              <Checkbox isSelected={signupData.emailUpdates} onChange={toggleEmailUpdates}>
              Send me occasional email updates
            </Checkbox>

              {accountCreated && <p className="text-green-600 text-sm mt-2">Your account was created successfully!</p>}
            {accountExist && <p className="text-red-600 text-sm mt-2">An account with this email already exists.</p>}

            <Button type="submit" className='bg-[#01565d] text-white block w-full rounded-[5px] h-[50px] text-[16px] mt-5'>
              Register
            </Button>

            
          </form>
        </ModalBody>
          </>
        )}
       
        {currentView === 'forgot' && (
          <>
            <ModalHeader className="flex gap-1 border-b-1 border-solid text-[#174982] font-semibold">
              <Icon icon="proicons:question" className='text-[#174982]' width="24" height="24" /> Forgot Password
            </ModalHeader>
             <ModalBody>
           <p className='text-black text-[14px]'>Go ahead and type in your email address and we'll get you up and running again in no time.</p>
       
            <form  onSubmit={handleForgotSubmit}>
              <Input
                isRequired
                label="Email"
                type="email"
                placeholder='Enter email address'
                variant='bordered'
                className='mb-2'
                value={forgotData.email}
                onChange={e => {
               updateForgotField('email', e.target.value);
               setFpemailreq(false);
              // setValidemail(false);
            }}
                classNames={{ inputWrapper: "border-1 border-solid rounded-[5px]" }}
              />
              {fpemailreq && <p className="text-red-500 text-sm mb-3">Email is required.</p>}
          {validemail && <p className="text-red-500 text-sm mb-3">Please enter a valid email address.</p>}
          {forgotMailSent && <p className="text-green-500 text-sm mb-3">Password reset email sent successfully!</p>}
          {forgotMailErr && <p className="text-red-500 text-sm mb-3">Failed to send reset email. Please try again.</p>}

              
            

             

              <Button type='submit' className='bg-[#174982] text-white block w-full rounded-[5px] h-[50px] text-[16px] mt-5'>
                Reset Password
              </Button>

           
            </form>
            </ModalBody>
          </>
        )}
      </>
    )}
  </ModalContent>
</Modal>
    </Fragment>
  );
}

export default Header;
