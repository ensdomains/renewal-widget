import { Component } from "preact";

const styles = {
  backgroundColor:'white',
  width:'337px',
  height:'417px',
  color:'green',
  position:'absolute',
  zIndex: 1111111,
  bottom: 0,
  right: 0
}
const days = 12
const num = 8
export default class App extends Component {
  render(props) {
    return (
      <div style={styles}>
        <h1>You have {num} ENS names expiring in {days} days </h1>
        <button>Renew Now</button>
        <div>Don't show this message again</div>
      </div>
    );
  }
}
