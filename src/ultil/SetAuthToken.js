import Axios from "axios";
import { LOCAL_STOGARE_TOKEN_NAME } from "./systemSettings";

const setAuthToken = (token) => {
  if (token) {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete Axios.defaults.headers.common["Authorization"];
    localStorage.removeItem(LOCAL_STOGARE_TOKEN_NAME);
  }
};
export default setAuthToken;
