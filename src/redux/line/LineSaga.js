import { call, put, takeLatest, delay } from "redux-saga/effects";

import LineService from "../../services/LineService";
import { HIDE_MODAL } from "../modal/ModalConst";
import { setLineAvaibleAct, setLineByUserAct, setLineListAct, setSearchLineAct } from "./LineAction";
import {
  ADD_LINE_API,
  ASSIGN_USER,
  DELETE_LINE_API,
  GET_LINE_AVAILABLE,
  GET_LINE_BY_USER_API,
  GET_LINE_LIST_API,
  GET_LINE_SEARCH,
  POST_LINE_API,
  
} from "./LineConst";
import { message } from "antd";
import { STATUS_CODE } from "../../ultil/systemSettings";
import { GET_OPERATOR_LINE } from "../user/UserConst";

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
function* getLineSearchApi(action) {
  try {
    const { data,status } = yield call(LineService.getLineByKeyWord,action.payload);
    if (status===STATUS_CODE.SUCCESS) {     
      yield put(setSearchLineAct(data));
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
    const {status } = yield call(LineService.addNewLine, action.line);
    if (status===STATUS_CODE.CREATED) {
      message.success('Thêm tuyến thành công');

      yield put({type:GET_LINE_LIST_API});
      yield delay(300);

      yield put({type:HIDE_MODAL});

    }
  } catch (error) {}
}
function* updateLineApi(action) {
  try {
    const { status } = yield call(LineService.updateLine, action.line);
    
    if (status===STATUS_CODE.SUCCESS) {
      message.success('Cập nhật thành công');
      yield put({type:GET_LINE_LIST_API});
      yield delay(300);
      yield put({type:HIDE_MODAL});

    }
  } catch (error) {}
}
function* deleteLineApi(action) {
  try {
    const { status } = yield call(LineService.deleteLine, action.id);
    if (status===STATUS_CODE.SUCCESS) {
      message.warning('xoá tuyến thành công');
      yield put({
        type: GET_LINE_LIST_API,
      });
    }
  } catch (error) {}
}
function* assignUserApi(action){
  try {
    const {data,status} = yield call(LineService.assignUser,action.payload)
    if(status===STATUS_CODE.SUCCESS){
      message.success('Cập nhật thành công');   
      yield put({
        type:GET_OPERATOR_LINE
      })   
    }
  } catch (error) {
    
  }
}
function* LineSaga() {
  yield takeLatest(GET_LINE_LIST_API, getLineListApi);
  yield takeLatest(ADD_LINE_API, addLineApi);
  yield takeLatest(POST_LINE_API, updateLineApi);
  yield takeLatest(DELETE_LINE_API, deleteLineApi);
  yield takeLatest(GET_LINE_BY_USER_API, getLineByUserApi);
  yield takeLatest(GET_LINE_SEARCH, getLineSearchApi);
  yield takeLatest(ASSIGN_USER, assignUserApi);
}
export default LineSaga;
