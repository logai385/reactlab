import { BaseService } from "./BaseService";
class lineService extends BaseService{
  getLineByUser=()=>this.get(`lines/getLineByUser`);
  getLineList=()=>this.get(`lines`);
  addNewLine=(data)=>this.post(`lines`,data);
  updateLine=(data)=>this.put(`lines`,data);
  deleteLine=(id)=>this.delete(`lines/${id}`);
}
const LineService = new lineService();

export default LineService;
