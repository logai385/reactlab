import { message } from "antd";
import { takeLatest, put, call, select } from "redux-saga/effects";
import UnitService from "../../services/UnitService";
import { STATUS_CODE } from "../../ultil/systemSettings";
import { getUnitLineAct, setUnitAct, setUnitLineAct } from "./UnitAction";
import {
  ASSIGN_LINE,
  CREATE_UNIT,
  GET_UNIT_LINE,
  DELETE_UNIT,REMOVE_LINE, GET_UNIT
} from "./UnitConst";

function* getUnitLineApi() {
  try {
    const { data, status } = yield call(UnitService.getAllUnitLine);

    if (status === STATUS_CODE.SUCCESS) {
      yield put(setUnitLineAct(data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* getAllUnitApi() {
  try {
    const { data, status } = yield call(UnitService.getAllUnit);

    if (status === STATUS_CODE.SUCCESS) {
      yield put(setUnitAct(data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* assignLineApi(action) {
  try {
    const { status } = yield call(UnitService.assignLine, action.payload);

    if (status === STATUS_CODE.SUCCESS) {
      message.success("Cập nhật thành công");

      yield put(getUnitLineAct());
    }
  } catch (error) {
    console.log(error);
  }
}
function* removeLineApi(action) {
  try {
    const { status } = yield call(UnitService.removeLine, action.payload);

    if (status === STATUS_CODE.SUCCESS) {
      message.success("Cập nhật thành công");

      yield put(getUnitLineAct());
    }
  } catch (error) {
    console.log(error);
  }
}
function* createUnitApi(action) {
  try {
    const { status } = yield call(UnitService.createUnit, action.payload);

    if (status === STATUS_CODE.CREATED) {
      message.success("Thêm Đại lý thành công");

      yield put(getUnitLineAct());
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteUnitApi(action) {
  try {
    const { status } = yield call(UnitService.deleteUnit, action.payload);

    if (status === STATUS_CODE.SUCCESS) {
      message.success("Xóa Đại lý thành công");

      yield put(getUnitLineAct());
    }
  } catch (error) {
    console.log(error);
  }
}
function* UnitSaga() {
  yield takeLatest(GET_UNIT_LINE, getUnitLineApi);
  yield takeLatest(GET_UNIT, getAllUnitApi);
  yield takeLatest(ASSIGN_LINE, assignLineApi);
  yield takeLatest(REMOVE_LINE, removeLineApi);
  yield takeLatest(CREATE_UNIT, createUnitApi);
  yield takeLatest(DELETE_UNIT, deleteUnitApi);
}
export default UnitSaga;
