"use client";
import React, { useState , useEffect  } from "react";
import { Form , Input, NumberInput , Link, Button, Modal, ModalContent, ModalBody, useDisclosure , Autocomplete, AutocompleteItem} from "@heroui/react";
import { Icon } from "@iconify/react";

// import { useSelector } from 'react-redux';
function Footer() {
   const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
//

  return (
    <>
    
    
    <footer className="bg-[#dddddd] border-t-1 border-solid border-[#dddddd] mt-5">
     
       <div className="grid grid-cols-1  lg:grid-cols-2 gap-2 w-full justify-center">
                <div className="mt-5 text-center lg:text-center">
                  <h6 className="text-[#000000] text-[12px] font-semibold mb-2">
                    Secured By
                  </h6>
                  <div className="flex flex-wrap lg:flex-nowrap gap-5  justify-center">
                    
                    <i className="bg-[url('https://c.regencyholidays.com/cms/images/theme/footer-sprite.webp')] bg-[position:0_-1px] bg-[size:243px_162px] w-[113px] h-[35px] inline-block rounded-[3px]"></i>
                    <i className="bg-[url('https://c.regencyholidays.com/cms/images/theme/footer-sprite.webp')] bg-[position:-158px_0] bg-[size:299px_164px] w-[140px] h-[36px] inline-block rounded-[3px]"></i>
                  </div>
                </div>

                <div className="mt-5 text-center lg:text-center">
                  <h6 className="text-[#000000] text-[12px] font-semibold mb-2">
                    We Accept
                  </h6>
                  <div className="flex flex-wrap lg:flex-nowrap gap-5  justify-center">
                    <i className="bg-[url('https://c.regencyholidays.com/cms/images/theme/footer-sprite.webp')] bg-[position:-5px_-31px] bg-[size:202px_127px] w-[55px] h-[22px] inline-block rounded-[3px]"></i>
                    <i className="bg-[url('https://c.regencyholidays.com/cms/images/theme/footer-sprite.webp')] bg-[position:-136px_-47px] w-[29px] h-[22px] inline-block rounded-[3px]"></i>
                    <i className="bg-[url('https://c.regencyholidays.com/cms/images/theme/footer-sprite.webp')] bg-[position:-173px_-47px] w-[45px] h-[22px] inline-block rounded-[3px]"></i>
                    <i className="bg-[url('https://c.regencyholidays.com/cms/images/theme/footer-sprite.webp')] bg-[position:-226px_-47px] w-[75px] h-[22px] inline-block rounded-[3px]"></i>
                  </div>
                </div>
              </div>
   
     <p className="text-center text-[12px] mt-5">© 2025 www.regencyholidays.com All rights reserved</p>
    </footer>

    
    </>
  );
}

export default Footer;
