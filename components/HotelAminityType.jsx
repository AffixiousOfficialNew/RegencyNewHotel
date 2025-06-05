import React from "react";

class HotelAminityType extends React.Component {
  render() {
    const aminityDetails = this.props.amenityType;
    // console.log(this.props)
    const aminityDetailsList = [];
    var aminities = [];
    if (aminityDetails && aminityDetails.indexOf(",") > -1) {
      aminities = aminityDetails.split(",");
    } else {
      aminities.push(aminityDetails);
    }
    if (aminities && aminities.length > 0) {
      aminities.map(function(item, index) {
        // console.log(item)
        item = item ? item.trim() : '';
        switch (item.toUpperCase()) {
          case 'PF':
              return (
                aminityDetailsList[index] = <i key={index} className="pf simptip-position-top simptip-fade" data-tooltip="Pet Friendly"></i>
              )
          case 'AC':
              return (
                aminityDetailsList[index] = <i key={index} className="ac simptip-position-top simptip-fade" data-tooltip="Air Conditioning"></i>
              )
          case "SPA":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="sauna simptip-position-top simptip-fade"
                data-tooltip="Spa"
              ></i>
            ));
          case "GOLF":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="golf simptip-position-top simptip-fade"
                data-tooltip="Golf"
              ></i>
            ));
          case "CASINO":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="casino simptip-position-top simptip-fade"
                data-tooltip="Casino"
              ></i>
            ));
          case "WIFI":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="wifi simptip-position-top simptip-fade"
                data-tooltip="wifi"
              ></i>
            ));
          case "BF":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="breakfast simptip-position-top simptip-fade"
                data-tooltip="breakfast"
              ></i>
            ));
          case "GYM":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="gym simptip-position-top simptip-fade"
                data-tooltip="gym"
              ></i>
            ));
          case "BAR":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="bar simptip-position-top simptip-fade"
                data-tooltip="bar"
              ></i>
            ));
          case "WHEELCHAIR":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="wheelchair simptip-position-top simptip-fade"
                data-tooltip="Wheelchair"
              ></i>
            ));
          case "PARKING":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="parking simptip-position-top simptip-fade"
                data-tooltip="Parking"
              ></i>
            ));
          case "RS":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="room-service simptip-position-top simptip-fade"
                data-tooltip="Room Service"
              ></i>
            ));
          case "BC":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="business-center simptip-position-top simptip-fade"
                data-tooltip="Business Center"
              ></i>
            ));
          case "POOL":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="pool simptip-position-top simptip-fade"
                data-tooltip="Pool"
              ></i>
            ));
          case "AS":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="shuttle simptip-position-top simptip-fade"
                data-tooltip="Airport Shuttle"
              ></i>
            ));
          case "MULTILINGUAL":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="multilinga-staff simptip-position-top simptip-fade"
                data-tooltip="Multilingual Staff"
              ></i>
            ));
          case "NS":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="Non-Smoking simptip-position-top simptip-fade"
                data-tooltip="Non-SmokingorGeneric"
              ></i>
              ));
          case "BS":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="Baby-Sitting simptip-position-top simptip-fade"
                data-tooltip="Baby Sitting"
              ></i>
          ));
          case "LAUNDRY":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="Laundry simptip-position-top simptip-fade"
                data-tooltip="Laundry"
              ></i>
          ));
          case "RESTRO":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="Restaurant simptip-position-top simptip-fade"
                data-tooltip="Restaurant"
              ></i>
          ));
          case "HK":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="House-Keeping simptip-position-top simptip-fade"
                data-tooltip="House Keeping"
              ></i>
          ));
          case "24FD":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="Front-Desk simptip-position-top simptip-fade"
                data-tooltip="24/7 Front Desk"
              ></i>
          ));
          case "DOC":
            return (aminityDetailsList[index] = (
              <i
                key={index}
                className="Doctor-on-Call simptip-position-top simptip-fade"
                data-tooltip="Doctor on Call"
              ></i>
          ));
          default:
            return "";
        }
      });

      return aminityDetailsList;
    } else {
      return "";
    }
  }
}
export default HotelAminityType;
