import axios from "axios";
export const Signin = async (userData)=> axios.post(`http://localhost:5000/api/clogin`,userData);
export const createuser = async (data)=>axios.post(`http://localhost:5000/api/users`,data);
export const createworkersheet = async (data) => axios.post(`http://localhost:5000/api/worksheets`,data);
export const getworkersheet = async () => axios.get(`http://localhost:5000/api/worksheets`);
export const create_invoicesheet = async (invoicedata) => {
   return axios.post(`http://localhost:5000/api/invoices`, invoicedata,{headers:{
       'Content-Type':'multipart/form-data; boundary=someArbitraryUniqueString',
}})}
export const createdocket = async (deliverydata) => axios.post(`http://localhost:5000/api/deliveryDocket`, deliverydata);
export const createmaintenance = async (data) =>axios.post(`http://localhost:5000/api/MaintenanceSheet`,data,{headers:{
    'Content-Type':'application/json; boundary=someArbitraryUniqueString',}});
export const addincidents = async (data) =>axios.post(`http://localhost:5000/api/incidents`,data);
export const adddriveoffs = async (data) =>axios.post(`http://localhost:5000/api/driveOffs`,data);
export const addinabilities = async (data) =>axios.post(`http://localhost:5000/api/inabilities`,data);
export const getusers = async () =>axios.get(`http://localhost:5000/api/users`);
export const getUserByID = (id) => axios.get(`http://localhost:5000/api/users/${id}`);
export const UpdateuserByID = (id,data) => axios.put(`http://localhost:5000/api/users/${id}`,data);
export const deleteUserByID = (id) => axios.delete(`http://localhost:5000/api/users/${id}`);
export const paperworkpost = async (id,data) =>axios.put(`http://localhost:5000/api/daysheetPaperWork/${id}`,data);
export const getepaytotal = async ()=> axios.get(`http://localhost:5000/api/daysheetPaperWork`);
export const getInvoiceByID = async (id) =>axios.get(`http://localhost:5000/api/invoices/${id}`);
export const deleteInvoiceByID = async (id) =>axios.delete(`http://localhost:5000/api/invoices/${id}`);
export const UpdateInvoiceByID = async (id,data) => { 
  return axios.put(`http://localhost:5000/api/invoices/${id}`,data,{headers:{
  'Content-Type':'multipart/form-data; boundary=someArbitraryUniqueString'}}), console.log("In APICalls Data Check=",data)}
export const getworkersheetByID = async (id) => axios.get(`http://localhost:5000/api/worksheets/${id}`);
export const UpdateWokersheetByID = (id,data) => axios.put(`http://localhost:5000/api/worksheets/${id}`,data);
export const getdeliveryDocket = async () =>axios.get(`http://localhost:5000/api/deliveryDocket`);
export const deletedeliveryDocket = async (id) =>axios.delete(`http://localhost:5000/api/deliveryDocket/${id}`);
export const getdeliveryDocketByID = async (id,data) =>axios.get(`http://localhost:5000/api/deliveryDocket/${id}`,data);
export const UpdatedeliveryDocket = async (id,data) =>axios.put(`http://localhost:5000/api/deliveryDocket/${id}`,data);
export const getMaintanencesearch = async () =>axios.get(`http://localhost:5000/api/MaintenanceSheet`);
export const updateMaintanence = async (id,data) =>axios.put(`http://localhost:5000/api/MaintenanceSheet/${id}`,data);
export const deleteMaintanence = async (id) =>axios.delete(`http://localhost:5000/api/MaintenanceSheet/${id}`);
export const getMaintanenceByID = async (id) =>axios.get(`http://localhost:5000/api/MaintenanceSheet/${id}`);
export const getincidents = async () =>axios.get(`http://localhost:5000/api/incidents`);
export const getincidentsByID = async (id) =>axios.get(`http://localhost:5000/api/incidents/${id}`);
export const deleteincidentsByID = async (id) =>axios.delete(`http://localhost:5000/api/incidents/${id}`);
export const updateincidentsByID = async (id,data) =>axios.put(`http://localhost:5000/api/incidents/${id}`,data);
export const getdriveOffs = async () =>axios.get(`http://localhost:5000/api/driveOffs`);
export const getdriveOffsByID = async (id) =>axios.get(`http://localhost:5000/api/driveOffs/${id}`);
export const UpdatedriveOffsByID = async (id,data) =>axios.put(`http://localhost:5000/api/driveOffs/${id}`,data);
export const deletedriveOffsByID = async (id) =>axios.delete(`http://localhost:5000/api/driveOffs/${id}`);
export const getinabilities = async () =>axios.get(`http://localhost:5000/api/inabilities`);
export const getinabilitiesByID = async (id) =>axios.get(`http://localhost:5000/api/inabilities/${id}`);
export const UpdateinabilitiesByID = async (id,data) =>axios.put(`http://localhost:5000/api/inabilities/${id}`,data);
export const deleteinabilitiesByID = async (id) =>axios.delete(`http://localhost:5000/api/inabilities/${id}`);
export const getdeliveryDocketforSA= (page, type) =>axios.get(
    `http://localhost:5000/api/deliveryDocket?type=ALL&page=${page}&size=5${type.site}${type.Supplier}${type.FromDate}${type.ToDate}`,
  );
  export const getdeliveryDocketformanager= (uid,page, type) =>axios.get(
    `http://localhost:5000/api/deliveryDocketformanager?userid=${uid}&type=ALL&page=${page}&size=5${type.Supplier}${type.FromDate}${type.ToDate}`,
  );
  export const getMaintenanceSheetformanager= (uid,page, type) =>axios.get(
    `http://localhost:5000/api/MaintenanceSheetformanager?userid=${uid}&type=ALL&page=${page}&size=5${type.Status}${type.FromDate}${type.ToDate}`,
  );
  export const getMaintenanceSheetforSA= (page, type) =>axios.get(
    `http://localhost:5000/api/MaintenanceSheet?type=ALL&page=${page}&size=5${type.site}${type.Status}${type.FromDate}${type.ToDate}`,
  );
  export const getinbilityforSA= (page, type) =>axios.get(
    `http://localhost:5000/api/inabilities?type=ALL&page=${page}&size=5${type.site}${type.Status}${type.FromDate}${type.ToDate}`,
  );
  export const getinbilityformanager= (uid,page, type) =>axios.get(
    `http://localhost:5000/api/inabilitiesformanager?userid=${uid}&type=ALL&page=${page}&size=5${type.Status}${type.FromDate}${type.ToDate}`,
  );
  export const getdriveOffsformanager= (uid,page, type) =>axios.get(
    `http://localhost:5000/api/driveOffsformanager?userid=${uid}&type=ALL&page=${page}&size=5${type.Rego}${type.FromDate}${type.ToDate}`,
  );
  export const getdriveOffsforSA= (page, type) =>axios.get(
    `http://localhost:5000/api/driveOffs?type=ALL&page=${page}&size=5${type.site}${type.Rego}${type.FromDate}${type.ToDate}`,
  );
  export const getincidentsforSA= (page, type) => axios.get(
    `http://localhost:5000/api/incidents?type=ALL&page=${page}&size=5${type.site}${type.Status}${type.FromDate}${type.ToDate}`,
  );
  export const getincidentsformanager= (uid,page, type) =>
  axios.get(
    `http://localhost:5000/api/incidentsformanager?userid=${uid}&type=ALL&page=${page}&size=5${type.Status}${type.FromDate}${type.ToDate}`,
  );