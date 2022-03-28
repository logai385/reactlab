import { call, put, takeLatest, delay } from "redux-saga/effects";

import LineService from "../../services/LineService";
import { HIDE_MODAL } from "../modal/ModalConst";
import { setLineByUserAct, setLineListAct } from "./LineAction";
import {
  ADD_LINE_API,
  DELETE_LINE_API,
  GET_LINE_BY_USER_API,
  GET_LINE_LIST_API,
  POST_LINE_API,
  
} from "./LineConst";
import { message } from "antd";
import { STATUS_CODE } from "../../ultil/systemSettings";

function* getLineByUserApi() {
  try {
    const { data,status } = yield call(LineService.getLineByUser);
 
    if (status===STATUS_CODE.SUCCESS) {      
      yield put(setLineByUserAct(data));
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* getLineListApi() {
  try {
    const { data,status } = yield call(LineService.getLineList);
    if (status===STATUS_CODE.SUCCESS) {     
      yield put(setLineListAct(data));
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* addLineApi(action) {
  try {
    const { data } = yield call(LineService.addNewLine, action.line);
    if (data.success) {
      message.success('Thêm tuyến thành công');

      yield put({type:GET_LINE_LIST_API});
      yield delay(300);

      yield put({type:HIDE_MODAL});

    }
  } catch (error) {}
}
function* updateLineApi(action) {
  try {
    const { data } = yield call(LineService.updateLine, action.line);
    
    if (data.success) {
      message.success('Cập nhật thành công');
      yield put({type:GET_LINE_LIST_API});
      yield delay(300);

      yield put({type:HIDE_MODAL});

    }
  } catch (error) {}
}
function* deleteLineApi(action) {
  try {
    const { data } = yield call(LineService.deleteLine, action.id);
    if (data.success) {
      message.warning('xoá tuyến thành công');
      yield put({
        type: GET_LINE_LIST_API,
      });
    }
  } catch (error) {}
}
function* LineSaga() {
  yield takeLatest(GET_LINE_LIST_API, getLineListApi);
  yield takeLatest(ADD_LINE_API, addLineApi);
  yield takeLatest(POST_LINE_API, updateLineApi);
  yield takeLatest(DELETE_LINE_API, deleteLineApi);
  yield takeLatest(GET_LINE_BY_USER_API, getLineByUserApi);
}
export default LineSaga;
