"use client";
import React, { useEffect } from "react";
import {
  Card,
  Select,
  SelectItem,
  Input,
  Button,
  CardBody,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { Country_Names } from "../../services/paymentApi";

const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
const years = Array.from({ length: 20 }, (_, i) => `${new Date().getFullYear() + i}`);

export const PaymentForm = ({form, cardTypes, data }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form

  const formValues = watch();

  useEffect(() => {
    console.log("💳 Payment Form Data:", formValues);
  }, [formValues]);

  const onSubmit = (data) => {
    console.log("✅ Final Submitted Data:", data);
    alert("Payment submitted!");
    onSubmit(data);
  };


  console.log("cardTypes", cardTypes)


  return (
    <>
      <h3 className="text-lg font-semibold mt-6">Payment Information</h3>
      <Card className="max-w-5xl mt-10 p-5 shadow border-1">
        <CardBody className="p-0">
          {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> */}
            {/* Card Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <Controller
  name="cardType"
  control={control}
  rules={{ required: "Card type is required" }}
  render={({ field }) => (
    <Select
      isRequired
      selectedKeys={field.value ? [String(field.value)] : []}
      placeholder="Select Card Type"
      variant="bordered"
      classNames={{ trigger: "h-[48px] rounded-[5px]" }}
      onSelectionChange={(keys) => {
        const selectedId = parseInt(Array.from(keys)[0], 10);
        field.onChange(selectedId); // 👈 Sets the selected CardID (e.g., 9 for APPLE PAY)
      }}
    >
      {cardTypes.map((card) => (
        <SelectItem key={card.CardID} value={String(card.CardID)}>
          {card.CardName}
        </SelectItem>
      ))}
    </Select>
  )}
/>


              <Controller
                name="cardNumber"
                control={control}
                rules={{ required: "Card number is required" }}
                render={({ field }) => (
                  <Input
                  isRequired
                  maxLength={16}
                    {...field}
                    type="text"
                    placeholder="Card Number"
                    variant="bordered"
                    classNames={{
                      input: "ml-1",
                      inputWrapper: "h-[48px] rounded-[5px]",
                    }}
                  />
                )}
              />
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <Controller
                name="expiryMonth"
                control={control}
                rules={{ required: "Month is required" }}
                render={({ field }) => (
                  <Select
                  isRequired
                    {...field}
                    onChange={field.onChange}
                    selectedKeys={field.value ? [field.value] : []}
                    placeholder="Select Month"
                    variant="bordered"
                    classNames={{ trigger: "h-[48px] rounded-[5px]" }}
                  >
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />

              <Controller
                name="expiryYear"
                control={control}
                rules={{ required: "Year is required" }}
                render={({ field }) => (
                  <Select
                  isRequired
                    {...field}
                    onChange={field.onChange}
                    selectedKeys={field.value ? [field.value] : []}
                    placeholder="Select Year"
                    variant="bordered"
                    classNames={{ trigger: "h-[48px] rounded-[5px]" }}
                  >
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />

              <Controller
                name="cvv"
                control={control}
                rules={{ required: "CVV is required" }}
                render={({ field }) => (
                  <Input
                  isRequired
                    {...field}
                    type="text"
                    placeholder="CVV"
                    maxLength={4}
                    variant="bordered"
                    classNames={{
                      inputWrapper: "h-[48px] rounded-[5px]",
                    }}
                  />
                )}
              />
            </div>

            {/* Card Holder Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <Input
                  isRequired
                    {...field}
                    variant="bordered"
                    placeholder="First Name"
                    classNames={{
                      input: "ml-1",
                      inputWrapper: "h-[48px] rounded-[5px]",
                    }}
                  />
                )}
              />

              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <Input
                  isRequired
                    {...field}
                    variant="bordered"
                    placeholder="Last Name"
                    classNames={{
                      inputWrapper: "h-[48px] rounded-[5px]",
                    }}
                  />
                )}
              />
            </div>

            {/* Billing Address */}
            <h3 className="text-lg font-semibold mt-6">Billing Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-1 p-4">
              <Controller
                name="street"
                control={control}
                rules={{ required: "Street is required" }}
                render={({ field }) => (
                  <Input
                  isRequired
                    {...field}
                    variant="bordered"
                    placeholder="Street"
                    classNames={{
                      inputWrapper: "h-[48px] rounded-[5px]",
                    }}
                  />
                )}
              />

              <Controller
                name="houseNo"
                control={control}
                rules={{ required: "House number is required" }}
                render={({ field }) => (
                  <Input
                  isRequired
                    {...field}
                    variant="bordered"
                    placeholder="House No"
                    classNames={{
                      inputWrapper: "h-[48px] rounded-[5px]",
                    }}
                  />
                )}
              />

              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <Autocomplete
                  isRequired
                    onSelectionChange={field.onChange}
                    variant="bordered"
                    inputProps={{
                      classNames: {
                        input: "ml-1",
                        inputWrapper: "h-[48px] rounded-[5px]",
                      },
                    }}
                    listboxProps={{
                      hideSelectedIcon: true,
                      itemClasses: { base: "rounded-[5px]" },
                    }}
                    placeholder="Select Country"
                  >
                    {Country_Names.map((country) => (
                      <AutocompleteItem key={country?.code} value={country?.code}>
                        {country?.value}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                )}
              />

              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <Input
                  isRequired
                    {...field}
                    variant="bordered"
                    placeholder="City"
                    classNames={{
                      inputWrapper: "h-[48px] rounded-[5px]",
                    }}
                  />
                )}
              />

              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <Input
                  isRequired
                    {...field}
                    variant="bordered"
                    placeholder="State/Province/Region"
                    classNames={{
                      inputWrapper: "h-[48px] rounded-[5px]",
                    }}
                  />
                )}
              />

              <Controller
                name="zip"
                control={control}
                rules={{ required: "Zip is required" }}
                render={({ field }) => (
                  <Input
                  isRequired
                    {...field}
                    variant="bordered"
                    placeholder="Zip Code / P.O. Box"
                    classNames={{
                      inputWrapper: "h-[48px] rounded-[5px]",
                    }}
                  />
                )}
              />
            </div>

            {/* <Button
              type="submit"
              className="mt-4 w-[150px] font-semibold h-[48px] rounded-[5px]"
            >
              Submit
            </Button> */}
          {/* </form> */}
        </CardBody>
      </Card>
    </>
  );
};
