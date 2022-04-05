import { BaseService } from "./BaseService";
class transporterService extends BaseService{
    getTransporterByLine=(id)=>this.get(`transporters/getbyline/${id}`)
    getTransporterList=()=>this.get('transporters')
    getBusListByKeyword=(keyword)=>this.get(`transporters/getBusByKeyword/${keyword}`)
    deleteTransporter=(id)=>this.delete(`transporters/${id}`)
    addTransporter=(data)=>this.post('transporters',data)
    uppdateTransporter=(data)=>this.put('transporters',data)
}
const TransporterService = new transporterService();
export default TransporterService;