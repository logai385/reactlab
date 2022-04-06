import { BaseService } from './BaseService';

class documentService extends BaseService{
    
    getDocumentList=()=> this.get(`documents`);
    getDocumentByLine=({lineId,startDate,endDate})=> this.get(`documents/getDocumentByLine/line=${lineId}/startDate=${startDate}/endDate=${endDate}`);

    addDocument=(data)=> this.post(`documents`,data);

    deleteDocument=(id)=>this.delete(`documents/${id}`)
           
}
const DocumentService = new documentService();

export default DocumentService;