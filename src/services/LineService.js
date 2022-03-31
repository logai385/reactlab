import { BaseService } from "./BaseService";
class lineService extends BaseService{
  getLineByKeyWord=(keyword)=>this.get(`lines/getLineByKeyWord/${keyword}`);
  getLineByUser=()=>this.get(`lines/getLineByUser`);
  getLineList=()=>this.get(`lines`);
  assignUser=(data)=>this.post(`lines/assignUser`,data);
  removeUser=(data)=>this.post(`lines/removeUser`,data);
  addNewLine=(data)=>this.post(`lines`,data);
  updateLine=(data)=>this.put(`lines`,data);
  deleteLine=(id)=>this.delete(`lines/${id}`);
}
const LineService = new lineService();

export default LineService;
