import React from "react"
import ParentListing from '../../../components/ParentListing'
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";


export default function ListingPage(){
    return(
        <section>
        <Header/>
            <ParentListing />
            <Footer/>
        </section>
    )
}