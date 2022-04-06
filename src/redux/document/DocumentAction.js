import { DELETE_DOCUMENT_API, GET_DOCUMENT_LIST_API, SET_DOCUMENT_LIST,SET_DOCUMENT_EDITING,ADD_DOCUMENT_API,GET_DOCUMENT_BY_LINE_API } from "./DocumentConst";

export const getDocumentsAct = () => ({
  type: GET_DOCUMENT_LIST_API,
});
export const getDocumentByLineAct = (data) => ({
  type: GET_DOCUMENT_BY_LINE_API,
  payload:data
});
export const setDocumentList = (documentList) => ({
  type: SET_DOCUMENT_LIST,
  payload: documentList,
});
export const deleteDocumentAct =(id)=>({
  type:DELETE_DOCUMENT_API,
  id
})
export const setEditingDocumentAct = (document) => ({
  type: SET_DOCUMENT_EDITING,
  payload: document,
})
export const addSignDocumentAct = (formData) => ({
  type: ADD_DOCUMENT_API,
  payload: formData,
});