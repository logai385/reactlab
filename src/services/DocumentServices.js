import { BaseService } from './BaseService';

class documentService extends BaseService{
    
    getDocumentList=()=> this.get(`documents`);

    addDocument=(data)=> this.post(`documents`,data);

    deleteDocument=(id)=>this.delete(`documents/${id}`)
           
}
const DocumentService = new documentService();

export default DocumentService;