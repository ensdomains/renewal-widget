import { Component } from "preact";
import logo from '../../assets/ENS_Full-logo_Color.png';
import { checkRenewal } from '@ensdomains/renewal'

const closeStyle = {
  color: "#ADBBCD",
  "padding-left": "1em",
  color: "rgb(173, 187, 205)",
  float: "left",
  width: "100%",
  "text-align": "left"
}

const imageStyles = {
  width:'50%',
  height:'50%',
  display:'block',
  marginTop:'15px',
  marginLeft: 'auto',
  marginRight: 'auto'
}

const styles = {
  backgroundColor:'white',
  boxShadow: '-4px 18px 108px 20px rgba(84,112,130,0.61)',
  borderRadius: '6px',
  paddingTop: '15px',
  width:'337px',
  height:'417px',
  position:'absolute',
  zIndex: 1111111,
  bottom: 0,
  right: 0,
  fontFamily: 'Helvetica',
  fontWeight: '300',
  fontSize: '24px',
  color: '#2B2B2B',
  letterSpacing: '0',
  textAlign: 'center',
  lineHeight: '30px'
}

const buttonStyle = {
  "background":"#5384FE",
  // "border":"2px solid #5384FE",
  // "borderRadius":"90.72px",
  // "fontFamily":"Helvetica",
  // "fontSize":"14px",
  "color":"#FFFFFF",
    "font-size": "14px",
    "font-weight": "700",
    "font-familyv": "Overpass",
    "text-transform": "capitalize",
    "letter-spacingv": "1.5px",
    "text-decoration": "none",
    "padding": "10px 25px",
    "border-radius": "25px",
    "transition": "all 0.2s ease 0s",
    "border-width": "2px",
    "border-style": "solid",
    "border-color": "rgb(83, 132, 254)",
    "border-image": "initial"
}

const doNotShowStyle = {
  "fontFamily": "Helvetica",
  "fontSize": "12px",
  "color": "#ADBBCD",
  "letterSpacing": "0",
  "textAlign": "center"
}

const dateDiff = function(dt1, dt2) {
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

export default class App extends Component {
  async componentDidMount() {
    if(this.props.userAddress && this.props.referrerAddress){
      let {
        numExpiringDomains, renewalUrl, firstExpiryDate
      } = await checkRenewal(this.props.userAddress, this.props.referrerAddress, {})
      const days = dateDiff(new Date(), firstExpiryDate)
      if(numExpiringDomains > 0){
        this.setState({ numExpiringDomains, days, renewalUrl });
      }
    }
  }

  render(props) {
    if (this.state.numExpiringDomains ){
      const { numExpiringDomains, days, renewalUrl } = this.state
      return (
        <div style={styles}>
          <span style={closeStyle}>x</span>
          <img style={imageStyles} src={logo}></img>
          <p>You have {numExpiringDomains} ENS names expiring in {days} days </p>
          <a style={buttonStyle} href={renewalUrl} target="_blank">Renew Now</a>
          <div style={doNotShowStyle} >Don't show this message again</div>
        </div>
      );
    }else{
      return null
    }
  }
}
