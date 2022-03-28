class transporterService{
    getTransporterByLine=(id)=>this.get(`transporters/getbyline/${id}`)
    getTransporterList=()=>this.get('transporters')
    deleteTransporter=(id)=>this.delete(`transporters/${id}`)
    // addTransporter=(transporter)=>{
    //     console.log(transporter);
    //     return Axios({
    //         url: `${API_URL}/transporters`,
    //         method: 'POST',
    //         data: {
    //             "plate": transporter.plate,
    //             "mainLines": transporter.mainLines,
    //             "minorLines": transporter.minorLines,
    //         },
    //     })
    // }
    addTransporter=(data)=>this.post('transporters',data)
    uppdateTransporter=(data)=>this.put('transporters',data)
}
const TransporterService = new transporterService();
export default TransporterService;