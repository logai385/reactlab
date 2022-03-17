import Axios from "axios";
import { API_URL } from "../ultil/systemSettings";

var LineService = {
  getLineByUser: () => {
    return Axios({
      url: `${API_URL}/lines/getlinebyuser`,
      method: "GET",
    });
  },
  getLineList: () => {
    return Axios({
      url: `${API_URL}/lines`,
      method: "GET",
    });
  },
  addNewLine: (line) => {
    return Axios({
      url: `${API_URL}/lines`,
      method: "POST",
      data: line,
    });
  },
  deleteLine: (id) => {
    return Axios({
      url: `${API_URL}/lines/${id}`,
      method: "DELETE",
    }); 
  },
  updateLine: (line) => {
    return Axios({
      url: `${API_URL}/lines`,
      method: "PUT",
      data: line,
    });
  }
};

export default LineService;
