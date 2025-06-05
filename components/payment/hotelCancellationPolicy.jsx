import React from "react";
import { convetDateTimeFormat } from "../../services/paymentApi";

class HotelCancellationPolicy extends React.Component {
  render() {
    const listOfCnxPolicy = this.props.listOfCnxPolicy;
    const currency = this.props.currency;
    const cnxPolicyList = [];
    if (listOfCnxPolicy && listOfCnxPolicy.length > 0) {
            listOfCnxPolicy.map(
                (CnxProps, CnxPropsIndex) => (
                    cnxPolicyList.push(<li key={CnxPropsIndex}>
                    {this.props.translation("common:lblcancellationsorchangesmadeafter")}{" "}
                    {convetDateTimeFormat(
                      CnxProps.CnxDateFrom ? CnxProps.CnxDateFrom : ""
                    )}{" "}
                    {this.props.translation("common:lblthencancellationchargeswillbe")}{" "}
                    {currency+" "+CnxProps.CnxAmount + " " + CnxProps.FeeType}
                    {CnxProps.FeeType &&
                    CnxProps.FeeType.toUpperCase() === this.props.translation("common:lblnight")
                      ? <span>&nbsp;{this.Props.translation("common:lblfareandapplicabletaxes")}</span>
                      : ""}
                    .
                  </li>)
                )
            )
            return cnxPolicyList
    } else {
        return ''
    }
  }
}
export default HotelCancellationPolicy;
