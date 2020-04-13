import { Component } from "preact";
import logo from '../../assets/ENS_Full-logo_Color.png';

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
  "border":"2px solid #5384FE",
  "borderRadius":"90.72px",
  "fontFamily":"Helvetica",
  "fontSize":"14px",
  "color":"#FFFFFF",
  "letterSpacing":"0.58px",
  "textAlign":"center"
}

const doNotShowStyle = {
  "fontFamily": "Helvetica",
  "fontSize": "12px",
  "color": "#ADBBCD",
  "letterSpacing": "0",
  "textAlign": "center"
}

const days = 12
const num = 8
export default class App extends Component {
  render(props) {
    if (props.userAddress){
      return (
        <div style={styles}>
          <img style={imageStyles} src={logo}></img>
          <p>You have {num} ENS names expiring in {days} days </p>
          <button style={buttonStyle}>Renew Now</button>
          <div style={doNotShowStyle} >Don't show this message again</div>
        </div>
      );
    }else{
      return null
    }
  }
}
