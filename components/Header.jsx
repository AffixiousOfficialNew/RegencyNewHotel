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

function Header() {
  const [selectCurrency, setSelectCurrency] = useState({
    code: "INR",
    flag: "twemoji:flag-india",
  });
  const [showCurrency, setCurrency] = useState(false);
  

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
    setSelectCurrency({ code: currencyCode, flag: flagIcon });
    setCurrency(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("globalCurrency", currencyCode);
      localStorage.setItem("globalFlag", flagIcon);
    }
    dispatch(setCurrencyInStore(currencyCode));
    dispatch(setIconCurr(flagIcon));
  };

  const { isOpen:isLoginModal, onOpen:onLoginModal, onOpenChange:onOpenLoginModalChange } = useDisclosure();
  const { isOpen:isSignupModal, onOpen:onSignupModal, onOpenChange:onOpenSignupModalChange } = useDisclosure();
  const { isOpen:isForgotModal, onOpen:onForgotModal, onOpenChange:onOpenForgotModalChange } = useDisclosure();

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
            <li>
              <Button
                onPress={onLoginModal}
                type="button"
                className="text-white md:text-[14px] text-[12px] bg-transparent px-0"
              >
                Login | SignUp
              </Button>
            </li>
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

      <Modal className="rounded-none" isOpen={isLoginModal} onOpenChange={onOpenLoginModalChange}>
      <ModalContent>
       
          <>
          <ModalHeader className="flex gap-1 border-b-1 border-solid text-[#174982] font-semibold">
            <Icon icon="material-symbols-light:lock-outline" className='text-[#174982]' width="24" height="24" /> Login
          </ModalHeader>
            <ModalBody>
               <p className='text-black text-[14px]'>Log in with Myholidays account</p>
            <form >
              <Input
                isRequired
                label="Email"
                type="email"
                placeholder='Enter email address'
                variant='bordered'
                className='mb-2'
                classNames={{ inputWrapper: "border-1 border-solid rounded-[5px]" }}
              />
             

              <Input
                isRequired
                label="Password"
                type="password"
                placeholder='Enter Password'
                variant='bordered'
                className='mb-2'
                
                classNames={{ inputWrapper: "border-1 border-solid rounded-[5px]" }}
              />
            

              <Checkbox >
                Remember me on this computer
              </Checkbox>

              <Button type='submit' className='bg-[#174982] text-white block w-full rounded-[5px] h-[50px] text-[16px] mt-5'>
                Login
              </Button>

              <div className="flex items-center h-[30px] space-x-4 text-small justify-center my-5">
                <Button 
                  onPress={onSignupModal} 
                  className="text-[#174982] text-[14px] bg-transparent px-1"
                >
                  New User Sign Up
                </Button>
                <Divider orientation="vertical" className="bg-black" />
                <Button 
                  onPress={onForgotModal} 
                  className="text-[#b81a52] text-[14px] bg-transparent px-1"
                >
                  Forgot Password
                </Button>
              </div>
            </form>
            </ModalBody>
          </>
        
        </ModalContent>
      </Modal>


        <Modal className="rounded-none" isOpen={isSignupModal} onOpenChange={onOpenSignupModalChange}>
      <ModalContent>
       
          <>
          <ModalHeader className="flex gap-1 border-b-1 border-solid text-[#174982] font-semibold">
            <Icon icon="si:user-line" className='text-[#174982]' width="24" height="24" /> Register
          </ModalHeader>
            <ModalBody>
            <p className='text-black text-[14px]'>Create a Myholidays account</p>
            <form className='pb-5' >
              <Input
                isRequired
                label="First Name"
                type="text"
                placeholder="Enter First Name"
                variant="bordered"
                className="mb-5"
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
                onChange={e => {
                  updateSignupField('email', e.target.value);
                  setInvalidMail(false);
                }}
                classNames={{ inputWrapper: "border-1 border-solid rounded-[5px]" }}
              />
             <p className="text-red-500 text-sm mb-3">Please enter a valid email address.</p>

              <Input
                isRequired
                label="Password"
                type="password"
                placeholder='Enter Password'
                variant='bordered'
                className='mb-1'
                onChange={e => {
                  updateSignupField('password', e.target.value);
                  setInvalidPasswd(false);
                }}
                classNames={{ inputWrapper: "border-1 border-solid rounded-[5px]" }}
              />
            
                <p className="text-red-500 text-sm mb-3">
                  Password must contain uppercase, lowercase, number, special character, and be at least 8 characters.
                </p>
            

              <Input
                isRequired
                label="Confirm Password"
                type="password"
                placeholder='Enter Confirm Password'
                variant='bordered'
                className='mb-1'
                onChange={e => {
                  updateSignupField('confirmPassword', e.target.value);
                  setSamePwdError(false);
                }}
                classNames={{ inputWrapper: "border-1 border-solid rounded-[5px]" }}
              />
               <p className="text-red-500 text-sm mb-3">Passwords do not match.</p>

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

              <Checkbox >
                Send me occasional email updates
              </Checkbox>

              <p className="text-green-600 text-sm mt-2">Your account was created successfully!</p>
             <p className="text-red-600 text-sm mt-2">An account with this email already exists.</p>

              <Button type="submit" className='bg-[#01565d] text-white block w-full rounded-[5px] h-[50px] text-[16px] mt-5'>
                Register
              </Button>

             
            </form>
          </ModalBody>
          </>
        
        </ModalContent>
      </Modal>


       <Modal className="rounded-none" isOpen={isForgotModal} onOpenChange={onOpenForgotModalChange}>
      <ModalContent>
       
          <>
          <ModalHeader className="flex gap-1 border-b-1 border-solid text-[#174982] font-semibold">
            <Icon icon="proicons:question" className='text-[#174982]' width="24" height="24" /> Forgot Password
          </ModalHeader>
            <ModalBody>
           <p className='text-black text-[14px]'>Go ahead and type in your email address and we'll get you up and running again in no time.</p>
       
            <form >
              <Input
                isRequired
                label="Email"
                type="email"
                placeholder='Enter email address'
                variant='bordered'
                className='mb-2'
                classNames={{ inputWrapper: "border-1 border-solid rounded-[5px]" }}
              />
             

              
            

             

              <Button type='submit' className='bg-[#174982] text-white block w-full rounded-[5px] h-[50px] text-[16px] mt-5'>
                Reset Password
              </Button>

           
            </form>
            </ModalBody>
          </>
        
        </ModalContent>
      </Modal>
    </Fragment>
  );
}

export default Header;
