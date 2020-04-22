// let poly = require("preact-cli/lib/lib/webpack/polyfills");
import "preact/debug";
import { h, render } from "preact";

import App from "./components/widget";
const RenewalWidget = function(props){
  if(props.userAddress){
    const app = <App {...props} />
    render(app, document.body);  
  }
}
window.RenewalWidget = RenewalWidget
export default RenewalWidget