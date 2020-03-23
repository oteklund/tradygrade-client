// tslint:disable:interface-name
import { createBrowserHistory } from "history";
declare global {
  interface Window {
    dataLayer: any;
  }
}
const history = createBrowserHistory();
export default history;