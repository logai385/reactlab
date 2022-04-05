import { takeLatest, put, call } from "redux-saga/effects";
import DashboardService from "../../services/DashboardService";
import { STATUS_CODE } from "../../ultil/systemSettings";
import {
  setBusByDateDataChart,
  setLineByDateDataChart,
  setLineByMonthDataChart,
  setUnitByDateDataChart,
} from "./DashboardAction";
import {
  GET_BUS_BY_DATE_DATA_CHART,
  GET_LINE_BY_DATE_DATA_CHART,
  GET_LINE_BY_MONTH_DATA_CHART,
  GET_UNIT_BY_DATE_DATA_CHART,
} from "./DashboardConst";

function* getUnitLineByMonthDataApi(action) {
  try {
    const { data, status } = yield call(
      DashboardService.getLineByMonthData,
      action.payload
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put(setLineByMonthDataChart(data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getUnitLineByDateDataApi(action) {
  try {
    const { data, status } = yield call(
      DashboardService.getLineByDateData,
      action.payload
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put(setLineByDateDataChart(data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* getUnitBusByDateDataApi(action) {
  try {
    const { data, status } = yield call(
      DashboardService.getBusByDateData,
      action.payload
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put(setBusByDateDataChart(data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* getUnitByDateDataApi(action) {
  try {
    const { data, status } = yield call(
      DashboardService.getUnitByDateData,
      action.payload
    );
      console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(setUnitByDateDataChart(data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* DashboardSaga() {
  yield takeLatest(GET_LINE_BY_MONTH_DATA_CHART, getUnitLineByMonthDataApi);
  yield takeLatest(GET_LINE_BY_DATE_DATA_CHART, getUnitLineByDateDataApi);
  yield takeLatest(GET_BUS_BY_DATE_DATA_CHART, getUnitBusByDateDataApi);
  yield takeLatest(GET_UNIT_BY_DATE_DATA_CHART, getUnitByDateDataApi);
}
export default DashboardSaga;
