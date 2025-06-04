import React, { Suspense } from "react";
import ParentDetail from '../../../components/detail/ParentDetail'



export default function DynamicDetails() {

    return (
      <Suspense fallback={<div>Loading...</div>}>
      <section>
          <ParentDetail/> 
         
      </section>
      </Suspense>
    )
  }