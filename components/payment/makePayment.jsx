"use client"
import { Button } from '@heroui/button'
import { Checkbox } from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'

export const MakePayment = ({setSecondForm, secondForm, saveBookingDetails, chargePayment}) => {

  const makePayment = () => {
    setSecondForm(true);
    saveBookingDetails();
    chargePayment();
  }
  return (
        <div className="flex flex-col gap-4 p-4 border shadow-xl">
          <div className="flex items-start gap-2">
            {/* <Checkbox classNames={{
       wrapper:"group-data-[selected=true]:after:!bg-[#008089]"
      }}
              id="terms"
              // isSelected={termsAccepted}
              // onChange={setTermsAccepted}
            /> */}
            <label htmlFor="terms" className="text-sm">
              I N/A, have read and accepted the{" "}
              <span className="text-primary cursor-pointer">
                <a href='/termsofuse'>
                  Terms & Conditions
                </a>
              </span>{" "}
              associated with this fare. I agree to pay a total amount of INR
              95097
            </label>
          </div>

          {/* {error && <p className="text-danger text-sm">{error}</p>} */}

          <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
            <div></div>
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold">INR 95097</span>
              <Button
                size="lg"
                onClick={makePayment}
                endContent={<Icon icon="lucide:chevron-right" />}
                className="min-w-[120px] rounded-[5px] bg-[#b81a52] text-white"
              >
                {secondForm ? "Make Payment"  : "Continue"}
              </Button>
            </div>
          </div>
        </div>
  )
}

