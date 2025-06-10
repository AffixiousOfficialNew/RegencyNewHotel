import React, { Suspense } from 'react';
import Payment from "../../components/payment/index"

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div>
     <Payment />
    </div>
    </Suspense>
  )
}

export default page
