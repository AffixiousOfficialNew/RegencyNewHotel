import React, { Suspense } from "react";
import ParentListing from "../../../components/listing/ParentListing"

export default function ListingPage() {
    return(
        <Suspense fallback={<div>Loading...</div>}>
        <section>
            <ParentListing />
        </section>
        </Suspense>
    )
}