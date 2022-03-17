import { call, put, takeLatest, delay } from "redux-saga/effects";
import TransporterService from "../../services/TransporterServices";
import { HIDE_MODAL } from "../modal/ModalConst";

import {
  getTransporterListAct,
  setTransporterByLineAct,
  setTransporterListAct,
} from "./TransporterAction";

import {
  ADD_TRANSPORTER_API,
  DELETE_TRANSPORTER_API,  
  GET_TRANSPORTER_BY_LINE_API,
  GET_TRANSPORTER_LIST_API,
  UPDATE_TRANSPORTER_API,
} from "./TransporterConst";
function* getTransporterByLineApi(action) {
  try {
    const { data, status } = yield call(()=>{return TransporterService.getTransporterByLine(action.payload)});
    

    if (data.success) {
      yield put(setTransporterByLineAct(data.transporters));
    }
  } catch (error) {
    console.error(error.message);

  }
}
function* getTransporterListApi() {
  try {
    let { data, status } = yield call(TransporterService.getTransporterList);

    if (data.success) {
      yield put(setTransporterListAct(data.transporters));
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* addTransporteApi(action) {
  try {
    const { transporter } = action;
    let { data, status } = yield call(
      TransporterService.addTransporter,
      transporter
    );
    if (data.success) {
      yield put({ type: GET_TRANSPORTER_LIST_API });
      yield delay(300);
      yield put({ type: HIDE_MODAL });
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* deleteTransporterApi(action) {
  try {
    const { id } = action;
    let { data, status } = yield call(TransporterService.deleteTransporter, id);
    if (data.success) {
      yield put({ type: GET_TRANSPORTER_LIST_API });
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* uppdateTransporterApi(action) {
  try {
    const { transporter } = action;
    let { data, status } = yield call(
      TransporterService.uppdateTransporter,
      transporter
    );
    if (data.success) {
      yield put({ type: GET_TRANSPORTER_LIST_API });
      yield delay(300);
      yield put({ type: HIDE_MODAL });
    } else {
      // Notification("error", "Cập nhật thất bại", data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* TransporterSaga() {
  yield takeLatest(GET_TRANSPORTER_LIST_API, getTransporterListApi);
  yield takeLatest(GET_TRANSPORTER_BY_LINE_API, getTransporterByLineApi);
  yield takeLatest(DELETE_TRANSPORTER_API, deleteTransporterApi);
  yield takeLatest(ADD_TRANSPORTER_API, addTransporteApi);
  yield takeLatest(UPDATE_TRANSPORTER_API, uppdateTransporterApi);
}
export default TransporterSaga;
