import { BaseService } from "./BaseService";

class dashboardService extends BaseService{
    getLineByMonthData=({month,year})=> this.get(`dashboard/getQualityLineMonth/${month}/${year}`);
    getLineByDateData=({line,startDate,endDate})=> this.get(`dashboard/getQualityLineBydate/${line}/${startDate}/${endDate}`);
}
const DashboardService = new dashboardService();
export default DashboardService;