import { call, put, takeLatest, delay, select } from "redux-saga/effects";
import LineService from "../../services/LineService";
import { setLineListAct } from "./LineAction";
import {
  ADD_LINE_API,
  DELETE_LINE_API,
  GET_LINE_LIST_API,
  POST_LINE_API,
} from "./LineConst";
function* getLineListApi() {
  try {
    const { data, status } = yield call(LineService.getLineList);
    if (data.success) {
      yield put(setLineListAct(data.lines));
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* addLineApi(action) {
  try {
    const { data, status } = yield call(LineService.addNewLine, action.line);
    if (data.success) {
      yield delay(300);
    }
  } catch (error) {}
}
function* updateLineApi(action) {
  try {
    const { data, status } = yield call(LineService.updateLine, action.line);
    if (data.success) {
    }
  } catch (error) {}
}
function* deleteLineApi(action) {
  try {
    const { data, status } = yield call(LineService.deleteLine, action.id);
    if (data.success) {
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
}
export default LineSaga;
