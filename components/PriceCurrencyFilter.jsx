"use client"
import React from "react";
import {
    Input,
  Autocomplete,
  AutocompleteItem,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";



const PriceCurrencyFilter =()=>{

    const currencynames = [
    { label: "INR", key: "inr" },
    { label: "AED", key: "aed" },
    { label: "AOA", key: "aoa" },
    { label: "ARS", key: "ars" },
    { label: "USD", key: "usd" },
  ];



    const pricefilters = [
  {key: "recommended", label: "Recommended"},
  {key: "lowtohigh", label: "Low to High    "},
  {key: "hightolow", label: "High to Low"},
];

    return(
        <>
       <section className="bg-[#f5f5f5] pb-0 xl:pb-5">
        <div className="container mx-auto px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 bg-[#174982] xl:bg-[#334e6c]">
        <Select className="w-full" defaultSelectedKeys={["recommended"]} label="Price" classNames={{
            base:"h-[55px]",
            trigger:"rounded-[5px] h-[55px]"
        }}>
        {pricefilters.map((pricefilter) => (
          <SelectItem key={pricefilter.key}>{pricefilter.label}</SelectItem>
        ))}
      </Select>
      <Input type="text" placeholder="Enter Hotel Name" label="Hotel Name"  className="w-full" classNames={{
        inputWrapper:"h-[56px] rounded-[5px]"
      }} />

      <Autocomplete
                  variant="bordered"
                  placeholder="Enter Location or Hotel Name"
                    label="Currency"
                  inputProps={{
                    classNames: {
                      inputWrapper: "bg-white h-[56px] rounded-[5px]",
                    },
                  }}
                >
                  {currencynames.map((currencyname) => (
                    <AutocompleteItem key={currencyname.key}>
                      {currencyname.label}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
            </div>
            </div>
        </section>
        </>
    )
}
export default PriceCurrencyFilter;