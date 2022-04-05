import { message } from "antd";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import TransporterService from "../../services/TransporterServices";
import { HIDE_MODAL } from "../modal/ModalConst";


import {
  setTransporterByLineAct,
  setTransporterListAct,
} from "./TransporterAction";
import { STATUS_CODE } from "../../ultil/systemSettings";

import {
  ADD_TRANSPORTER_API,
  DELETE_TRANSPORTER_API,
  GET_TRANSPORTER_BY_KEYWORD_API,
  GET_TRANSPORTER_BY_LINE_API,
  GET_TRANSPORTER_LIST_API,
  UPDATE_TRANSPORTER_API,
} from "./TransporterConst";
function* getTransporterByLineApi(action) {
  try {
    const { data, status } = yield call(() => {
      return TransporterService.getTransporterByLine(action.payload);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put(setTransporterByLineAct(data));
    }
  } catch (error) {
    console.error(error.message);
  }
}
function* getTransporterListApi() {
  try {
    let { data, status } = yield call(TransporterService.getTransporterList);    
    if (status === STATUS_CODE.SUCCESS) {
      yield put(setTransporterListAct(data));
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* getTransporterByKeywordApi(action) {
  try {
    let { data, status } = yield call(TransporterService.getBusListByKeyword, action.payload);    
    if (status === STATUS_CODE.SUCCESS) {
      yield put(setTransporterListAct(data));
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* addTransporteApi(action) {
  try {
    const { transporter } = action;
    let {status} = yield call(() => {
      return TransporterService.addTransporter(transporter);
    });
    
    if (status === STATUS_CODE.CREATED) {
      message.success('Thêm xe thành công');

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
    if (status === STATUS_CODE.SUCCESS) {
      message.success("Xoá thành công");
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
    if (status === STATUS_CODE.SUCCESS) {
      message.success("Cập nhật thành công");
      yield put({ type: GET_TRANSPORTER_LIST_API });
      yield delay(300);
      yield put({ type: HIDE_MODAL });
    } else {
      message.error("Cập nhật thất bại");

    }
  } catch (error) {    
    message.error("Cập nhật thất bại");

  }
}

function* TransporterSaga() {
  yield takeLatest(GET_TRANSPORTER_LIST_API, getTransporterListApi);
  yield takeLatest(GET_TRANSPORTER_BY_KEYWORD_API, getTransporterByKeywordApi);
  yield takeLatest(GET_TRANSPORTER_BY_LINE_API, getTransporterByLineApi);
  yield takeLatest(DELETE_TRANSPORTER_API, deleteTransporterApi);
  yield takeLatest(ADD_TRANSPORTER_API, addTransporteApi);
  yield takeLatest(UPDATE_TRANSPORTER_API, uppdateTransporterApi);
}
export default TransporterSaga;
