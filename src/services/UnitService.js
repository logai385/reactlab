import {BaseService} from './BaseService';
class unitService extends BaseService{
    getAllUnit=()=>this.get("units");
    createUnit=(unit)=>this.post("units",unit);
    getAllUnitBus=()=>this.get("units/getAllUnitBus");
    assignBus=(data)=>this.post("units/assignBus",data);
    removeBus=(data)=>this.post("units/removeBus",data);
    deleteUnit=(unitId)=>this.delete(`units/${unitId}`)
}
const UnitService = new unitService();
export default UnitService;