// let poly = require("preact-cli/lib/lib/webpack/polyfills");
import "preact/debug";
import { h, render } from "preact";

import App from "./components/widget";
console.log({App})
const ENSRenewal = function(props){
  console.log('** renewal', {props})
  if(props.userAddress){
    const app = <App {...props} />
    render(app, document.body);  
  }
}
if (typeof(window) !== undefined) window.ENSRenewal = ENSRenewal;

export { ENSRenewal }
