import Axios from 'axios';
import { API_URL } from '../ultil/systemSettings';

class transporterService{
    constructor(){}
    getTransporterList=()=>{
        return Axios({
            url: `${API_URL}/transporters`,
            method: 'GET',
        })
    }
    deleteTransporter=(id)=>{
        return Axios({
            url: `${API_URL}/transporters/${id}`,
            method: 'DELETE',
        })
    }
    addTransporter=(transporter)=>{
        console.log(transporter);
        return Axios({
            url: `${API_URL}/transporters`,
            method: 'POST',
            data: {
                "plate": transporter.plate,
                "mainLines": transporter.mainLines,
                "minorLines": transporter.minorLines,
            },
        })
    }
    uppdateTransporter=(transporter)=>{
        console.log(transporter);
        return Axios({
            url: `${API_URL}/transporters`,
            method: 'PUT',
            data: {
                "id": transporter.id,
                "plate": transporter.plate,
                "mainLines": transporter.mainLines,
                "minorLines": transporter.minorLines,
            },
        })
    }
}
let TransporterService = new transporterService();
export default TransporterService;