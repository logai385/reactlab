import Axios from "axios";
import { API_URL } from "../ultil/systemSettings";

export class BaseService {
  get = (url) => {
    return Axios({
      url: `${API_URL}/${url}`,
      method: "GET",
    });
  };
  put = (url, model) => {
    return Axios({
      url: `${API_URL}/${url}`,
      method: "PUT",
      data: model,
    });
  };
  post = (url, model) => {
    return Axios({
      url: `${API_URL}/${url}`,
      method: "POST",
      data: model,
    });
  };
  delete = (url) => {
    return Axios({
      url: `${API_URL}/${url}`,
      method: "DELETE",
    });
  };
}
