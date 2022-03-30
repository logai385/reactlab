import {BaseService} from './BaseService';
class unitService extends BaseService{
    getAllUnit=()=>this.get("units");
    createUnit=(unit)=>this.post("units",unit);
    getAllUnitLine=()=>this.get("units/getAllUnitLine");
    assignLine=(data)=>this.post("units/assignLine",data);
}
const UnitService = new unitService();
export default UnitService;