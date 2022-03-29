import { put, takeLatest, call,select} from "redux-saga/effects";
import DocumentServices from "../../services/DocumentServices";
import {STATUS_CODE} from "../../ultil/systemSettings";
import {
  ADD_DOCUMENT_API,  
  DELETE_DOCUMENT_API,
  GET_DOCUMENT_LIST_API,
} from "./DocumentConst";

import { setDocumentList } from "./DocumentAction";
import { message } from "antd";

function* getDocumentListApi() {
  try {
    let { data,status } = yield call(DocumentServices.getDocumentList);

    if (status===STATUS_CODE.SUCCESS) {
      yield put(setDocumentList(data));
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* addDocumentApi(action) {
  try {
    const { data,status  } = yield call(() => {
      return DocumentServices.addDocument(action.payload);
    });
    const navigate = yield select(state => state.NavigateReducer.navigate);

    // let history = yield select((state) => state.RouteReducer.history);
    if (status===STATUS_CODE.CREATED) {
      message.success('Thêm thành công');

      navigate("/document");
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

    if (status===STATUS_CODE.SUCCESS) {
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
