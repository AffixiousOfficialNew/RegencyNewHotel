import React from "react";



class HotelContactInfo extends React.Component{
  render(){
    return(
      <div className="custCare">
      <h5>{this.props.translation("common:lblforonlinecustomersupport")}</h5>
      <ul>
      <li>
      <div>{this.props.translation("common:lblemailus")}</div>
      <span><b>{this.props.translation("common:lblsupport")}</b> <a href="mailto:support@myholidays.com">support@myholidays.com</a></span>,&nbsp;
      <span><b>{this.props.translation("common:lblcancellation")}</b> <a href="mailto:cancel@myholidays.com">cancel@myholidays.com</a></span><br/><br/>
      <span><b>{this.props.translation("common:lbldatechange")}</b> <a href="mailto:change@myholidays.com">change@myholidays.com</a></span>,&nbsp;
      <span><b>{this.props.translation("common:lblrefund")}</b> <a href="mailto:refund@myholidays.com">refund@myholidays.com</a></span>
      </li>
      <li>
      <div>{this.props.translation("common:lblcallus")}</div>
      <span><b>International:</b> +44 20 3011 0027</span><br/><br/>
      <span><b>United States of America:</b> +1 (646) 860-9579 / +1 (646) 759-2686</span>,&nbsp;
      <span><b>Canada:</b> +1 (438) 798 0660</span>,&nbsp;
      <span><b>Mexico:</b> +52 (55) 7100 0610</span><br/><br/>
      <span><b>Spain:</b> +34 918 340 525</span>,&nbsp;
      <span><b>France:</b> +33 1 80 14 63 28</span>,&nbsp;
      <span><b>German:</b> 08000103909 (toll free)</span> ,&nbsp;
      <span><b>Italy:</b> +390287369850</span>,&nbsp;
      <span><b>Switzerland:</b> +41 44 551 05 70</span>,&nbsp;
      <span><b>United Kingdom:</b> +442030110027 / +441628200224</span>,&nbsp;
      <span><b>Czech Republic:</b> +27 0104 4690 86</span>,&nbsp;
      <span><b>Russia:</b> +74996090676</span><br/><br/>
      <span><b>Australia:</b> +61283787959 / +611800431588</span>,&nbsp;
      <span><b>New Zealand:</b> +64 9 971 0669</span>,&nbsp;
      <span><b>Singapore:</b> +65 3108 0103</span>,&nbsp;
      <span><b>Thailand:</b> +66 6-0002-4246</span>,&nbsp;
      <span><b>Philippine:</b> +632 8 2711026</span>,&nbsp;
      <span><b>Hong Kong:</b> +852 3018 3740</span>,&nbsp;
      <span><b>Malaysia:</b> +60 15 4600 0191</span><br/><br/>
      <span><b>South Africa:</b> +27 (0) 10446908627</span><br/><br/>
      <span><b>Qatar:</b> 800 1990 (toll free)</span>,&nbsp;
      <span><b>UAE:</b> 8000 3110079 (toll free)</span>,&nbsp;
      <span><b>Saudi Arabia:</b> 800 850 0872 (toll free)</span>,&nbsp;
      <span><b>Oman:</b> 96880078673 (toll free)</span>,&nbsp;
      <span><b>Israel:</b> +97233752010 / +97237208914</span><br/><br/>
      <span><b>Argentina:</b> +54 11 5272 3233</span>,&nbsp;
      <span><b>Peru:</b> +34 918 340 525</span>,&nbsp;
      <span><b>Colombia:</b> +57 (4) 204-0705</span>
      </li>
      </ul>
      <div className="clear"></div>
      <br/><br/>
      <span className="notificationTxt">
      <span>{this.props.translation("common:lblyouarerequestedtomaintainthesubjectlinecontainingthemyholidaysbookingid")}</span>
      <strong className="mhId"></strong>
      <span>{this.props.translation("common:lblwhileinteractingwithourrepresentatives")}</span></span>
      <span className="notificationTxt">
      <span>{this.props.translation("common:lblforanyfurtherassistance")}</span></span>
      </div>
    );
  }
}
export default HotelContactInfo;
