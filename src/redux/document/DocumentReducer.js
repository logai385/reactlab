
import { SET_DOCUMENT_EDITING, SET_DOCUMENT_LIST } from "./DocumentConst";

const initialState = {
  documentList: [],
  editingDocument: {
    dateSign: Date.now(),
    line: null,
    transporter: null,
    quantity: 0,
    documentImg: null,
  },
};

const DocumentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DOCUMENT_LIST:
      return { ...state, documentList: payload };
      
    case SET_DOCUMENT_EDITING:
      return { ...state, editingDocument: payload };
    default:
      return state;
  }
};

export default DocumentReducer;
