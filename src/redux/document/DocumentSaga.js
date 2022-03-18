import { put, takeLatest, call} from "redux-saga/effects";
import DocumentServices from "../../services/DocumentServices";

import {
  ADD_DOCUMENT_API,  
  DELETE_DOCUMENT_API,
  GET_DOCUMENT_LIST_API,
} from "./DocumentConst";

import { setDocumentList } from "./DocumentAction";

function* getDocumentListApi() {
  try {
    let { data } = yield call(DocumentServices.getDocumentList);

    if (data.success) {
      yield put(setDocumentList(data.documentList));
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* addDocumentApi(action) {
  try {
    const { data } = yield call(() => {
      return DocumentServices.addDocument(action.payload);
    });

    // let history = yield select((state) => state.RouteReducer.history);
    if (data.success) {
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* deleteDocumentApi(action) {
  try {
    const { data } = yield call(() => {
      return DocumentServices.deleteDocument(action.id);
    });

    if (data.success) {
      yield put({ type: GET_DOCUMENT_LIST_API });
    }
  } catch (error) {}
}

function* DocumentSaga() {
  yield takeLatest(GET_DOCUMENT_LIST_API, getDocumentListApi);
  yield takeLatest(ADD_DOCUMENT_API, addDocumentApi);
  yield takeLatest(DELETE_DOCUMENT_API, deleteDocumentApi);
}
export default DocumentSaga;
