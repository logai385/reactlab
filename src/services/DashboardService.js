import { BaseService } from "./BaseService";

class dashboardService extends BaseService{
    getLineByDateData=({month,year})=> this.get(`dashboard/getQualityUnitMonth/${month}/${year}`);
}
const DashboardService = new dashboardService();
export default DashboardService;