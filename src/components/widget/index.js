import { h, Component, createRef } from "preact";

import logo from './logo.js';
import { checkRenewal } from '@ensdomains/renewal'
import "./style.scss";

const closeStyle = {
  color: "#ADBBCD",
  "padding-left": "1em",
  color: "rgb(173, 187, 205)",
  float: "left",
  width: "100%",
  "text-align": "left",
  cursor:"pointer"
}

const imageStyle = {
  width:'44%',
  display:'block',
  marginTop:'15px',
  marginLeft: 'auto',
  marginRight: 'auto'
}

const containerStyle = {
  backgroundColor:'white',
  boxShadow: '-4px 18px 108px 20px rgba(84,112,130,0.61)',
  borderRadius: '6px',
  paddingTop: '15px',
  width:'337px',
  height:'417px',
  position:'fixed',
  zIndex: 1111111,
  bottom: 0,
  right: 0,
  "font-family": "Overpass",
  fontWeight: '300',
  fontSize: '24px',
  color: '#2B2B2B',
  letterSpacing: '0',
  textAlign: 'center',
  lineHeight: '30px'
}

const buttonStyle = {
    "display": "inline-block",
    "background":"#5384FE",
    "color":"#FFFFFF",
    "font-size": "14px",
    "font-weight": "700",
    "font-family": "Overpass",
    "text-transform": "capitalize",
    "letter-spacingv": "1.5px",
    "text-decoration": "none",
    "padding": "0.5em 25px",
    "border-radius": "25px",
    "transition": "all 0.2s ease 0s",
    "border-width": "2px",
    "border-style": "solid",
    "border-color": "rgb(83, 132, 254)",
    "border-image": "initial",
    "margin-bottom": "1em"
}

const doNotShowStyle = {
  "fontFamily": "Helvetica",
  "fontSize": "12px",
  "color": "#ADBBCD",
  "letterSpacing": "0",
  "textAlign": "center"
}

const messageStyle = {
  "padding": "0 1em",
  "font-size": "22px"
}

const dateDiff = function(dt1, dt2) {
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

export default class App extends Component {

  async componentDidMount(props) {
    await this.doCheckRenewal(this.props)
  }

  async doCheckRenewal({userAddress, queryParams, days=30}){
    let {
      numExpiringDomains, renewalUrl
    } = await checkRenewal(userAddress, queryParams, { days })
    this.setState({ numExpiringDomains, days, renewalUrl });
    return {numExpiringDomains, days, renewalUrl}
  }

  close = e => {
    this.setState({ closed: true });
  };

  neverShow = e =>{
    window.localStorage.setItem('neverShow', true);
    this.close()
  }

  render(props, state) {
    if(state.closed || window.localStorage.getItem('neverShow')) return null

    let { numExpiringDomains, days, renewalUrl } = state
    if (numExpiringDomains){
      return (
        <div style={containerStyle} ref={this.ref} >
          <span style={closeStyle} onClick={this.close}>x</span>
          <img style={imageStyle} src={logo}></img>
          <p style={messageStyle}>
            You have {numExpiringDomains} ENS name{ numExpiringDomains > 1 ? 's' : '' } in the grace period or expiring in the next {days} days.
          </p>
          <a style={buttonStyle} href={renewalUrl} target="_blank">Renew Now</a>
          <br/>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" onClick={this.neverShow} />
          <span style={doNotShowStyle} onClick={this.neverShoww} >Don't show this message again</span>
        </div>
      );
    }else{
      return null
    }
  }
}
