import { put, takeLatest, call, select, delay } from "redux-saga/effects";
import DocumentServices from "../../services/DocumentServices";

import {
  ADD_DOCUMENT_API,
  DELETE_DOCUMENT_API,
  GET_DOCUMENT_LIST_API,
} from "./DocumentConst";

import { setDocumentList } from "./DocumentAction";

function* getDocumentListApi() {
  try {
    let { data, status } = yield call(DocumentServices.getDocumentList);

    if (data.success) {
      yield put(setDocumentList(data.documentList));
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* addDocumentApi(action) {
  try {
    const { data, status } = yield call(() => {
      return DocumentServices.addDocument(action.data);
    });

    let history = yield select((state) => state.RouteReducer.history);
    if (data.success) {
     
    }
    if (data.success === false) {
   
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* deleteDocumentApi(action) {
  try {
    const { data, status } = yield call(() => {
      return DocumentServices.deleteDocument(action.id);
    });

    if (data.success) {
      
    }
  } catch (error) {}
}

function* DocumentSaga() {
  yield takeLatest(GET_DOCUMENT_LIST_API, getDocumentListApi);
  yield takeLatest(ADD_DOCUMENT_API, addDocumentApi);
  yield takeLatest(DELETE_DOCUMENT_API, deleteDocumentApi);
}
export default DocumentSaga;
