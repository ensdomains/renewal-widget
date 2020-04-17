import { Component, createRef } from "preact";

import logo from '../../assets/ENS_Full-logo_Color.svg';
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
  "padding": "0 1em"
}

const dateDiff = function(dt1, dt2) {
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

export default class App extends Component {
  ref = createRef();

  async componentDidMount() {    
    let {userAddress, referrerAddress} = this.props || {}
    let self = this
    async function callCheckRenewal() {
      if (!userAddress){
        let addresses = await window.ethereum.enable()
        if(addresses.length > 0){
          userAddress = addresses[0]
        }
      }
      if(userAddress && referrerAddress){
        console.log('call checkRenweal')
        let {
          numExpiringDomains, renewalUrl, firstExpiryDate
        } = await checkRenewal(userAddress, referrerAddress, {})
        const days = dateDiff(new Date(), firstExpiryDate)
        if(numExpiringDomains > 0){
          self.setState({ numExpiringDomains, days, renewalUrl });
        }
      }else{
        setTimeout(callCheckRenewal, 1000)
      }
    }
    setTimeout(callCheckRenewal, 2000)
      console.log('componentDidMount2')
  }

  close = e => {
    this.setState({ closed: true });
  };

  neverShow = e =>{
    window.localStorage.setItem('neverShow', true);
    this.close()
  }

  render(props) {
    console.log('render', this.state)
    if (this.state.numExpiringDomains && !this.state.closed && !window.localStorage.getItem('neverShow')){
      const { numExpiringDomains, days, renewalUrl } = this.state
      return (
        <div style={containerStyle} ref={this.ref} >
          <span style={closeStyle} onClick={this.close}>x</span>
          <img style={imageStyle} src={logo}></img>
          <p style={messageStyle}>You have {numExpiringDomains} ENS names expiring in {days} days </p>
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
