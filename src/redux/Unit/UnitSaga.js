import { message } from "antd";
import { takeLatest, put, call} from "redux-saga/effects";
import UnitService from "../../services/UnitService";
import { STATUS_CODE } from "../../ultil/systemSettings";
<<<<<<< HEAD
import { getUnitLineAct, setUnitAct, setUnitLineAct } from "./UnitAction";
=======
import { getUnitBusAct,  setUnitBusAct } from "./UnitAction";
>>>>>>> 7750dc13bff97dfea17be3255b75fa74024affcc
import {
  ASSIGN_BUS,
  CREATE_UNIT,
<<<<<<< HEAD
  GET_UNIT_LINE,
  DELETE_UNIT,REMOVE_LINE, GET_UNIT
=======
  GET_UNIT_BUS,
  DELETE_UNIT,REMOVE_BUS
>>>>>>> 7750dc13bff97dfea17be3255b75fa74024affcc
} from "./UnitConst";

function* getUnitBusApi() {
  try {
    const { data, status } = yield call(UnitService.getAllUnitBus);

    if (status === STATUS_CODE.SUCCESS) {
      yield put(setUnitBusAct(data));
    }
  } catch (error) {
    console.log(error);
  }
}
<<<<<<< HEAD
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
=======
function* assignBusApi(action) {
>>>>>>> 7750dc13bff97dfea17be3255b75fa74024affcc
  try {
    const { status } = yield call(UnitService.assignBus, action.payload);

    if (status === STATUS_CODE.SUCCESS) {
      message.success("Cập nhật thành công");

      yield put(getUnitBusAct());
    }
  } catch (error) {
    console.log(error);
  }
}
function* removeBusApi(action) {
  try {
    const { status } = yield call(UnitService.removeBus, action.payload);

    if (status === STATUS_CODE.SUCCESS) {
      message.success("Cập nhật thành công");

      yield put(getUnitBusAct());
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

      yield put(getUnitBusAct());
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

      yield put(getUnitBusAct());
    }
  } catch (error) {
    console.log(error);
  }
}
function* UnitSaga() {
<<<<<<< HEAD
  yield takeLatest(GET_UNIT_LINE, getUnitLineApi);
  yield takeLatest(GET_UNIT, getAllUnitApi);
  yield takeLatest(ASSIGN_LINE, assignLineApi);
  yield takeLatest(REMOVE_LINE, removeLineApi);
=======
  yield takeLatest(GET_UNIT_BUS, getUnitBusApi);
  yield takeLatest(ASSIGN_BUS, assignBusApi);
  yield takeLatest(REMOVE_BUS, removeBusApi);
>>>>>>> 7750dc13bff97dfea17be3255b75fa74024affcc
  yield takeLatest(CREATE_UNIT, createUnitApi);
  yield takeLatest(DELETE_UNIT, deleteUnitApi);
}
export default UnitSaga;
