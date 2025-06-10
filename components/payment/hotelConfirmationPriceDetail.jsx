import React from "react";

class HotelConfirmationPriceDetail extends React.Component{
  render(){
    var bookingResults = this.props.bookingDetails ? this.props.bookingDetails : "";
    var hotelFareDetails = bookingResults ? bookingResults.HotelFareDetails : '';

    return(
      <div>
        {/* <h3>{this.props.translation("common:lblpricedetails")}</h3>
        <div className="oneSection">
        <div className="priceTable">
        <table>
        <tbody>
        <tr>
        <th></th>
        <th>{this.props.translation("common:lbltotal")}</th>
        </tr>
        <tr>
        <td>{this.props.translation("common:lblroomprice")}</td>
        <td className="CurrentCurrency_farepopup">{hotelFareDetails ? hotelFareDetails.TotalSellingInClientCurrency : ''}</td>
        </tr>
        
        <tr>
        <td>{this.props.translation("common:lbldiscount")}</td>
        <td>{hotelFareDetails ? hotelFareDetails.Discount : 0}</td>
        </tr>
        <tr>
        <td>{this.props.translation("common:lblagencyfee")}</td>
        <td>{hotelFareDetails ? hotelFareDetails.AgencyFee : 0}</td>
        </tr>
        <tr>
        <td className="gtl">{this.props.translation("common:lblgrandtotal")}</td>
        <td className="gtl CurrentCurrency_farepopup">{hotelFareDetails ? hotelFareDetails.UserCurrency + ' ' + hotelFareDetails.TotalSellingInClientCurrency.toFixed(2) : ''}</td>
        </tr>
        </tbody>
        </table>
        </div>
        </div> */}
        <div className="bar ">
        <button type="button" onClick={this.props.printItinerary} className="btn printBtn no-print">
        <i className="mhs mh-print"></i>printitinerary</button>
        </div>
      </div>
    );
  }
}
export default HotelConfirmationPriceDetail;
