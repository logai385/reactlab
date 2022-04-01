import { takeLatest, put, call, select } from "redux-saga/effects";
import DashboardService from "../../services/DashboardService";
import { STATUS_CODE } from "../../ultil/systemSettings";
import { setLineByDateDataChart, setLineByMonthDataChart } from "./DashboardAction";
import { GET_LINE_BY_DATE_DATA_CHART, GET_LINE_BY_MONTH_DATA_CHART } from "./DashboardConst";


function* getUnitLineByMonthDataApi(action) {
  try {
    const { data, status } = yield call(DashboardService.getLineByMonthData,action.payload);

    if (status === STATUS_CODE.SUCCESS) {
      yield put(setLineByMonthDataChart(data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getUnitLineByDateDataApi(action) {
  try {
    const { data, status } = yield call(DashboardService.getLineByDateData,action.payload);
    

    if (status === STATUS_CODE.SUCCESS) {
      yield put(setLineByDateDataChart(data));
    }
  } catch (error) {
    console.log(error);
  }
}
function * DashboardSaga() {
  yield takeLatest(GET_LINE_BY_DATE_DATA_CHART, getUnitLineByDateDataApi);
  yield takeLatest(GET_LINE_BY_MONTH_DATA_CHART, getUnitLineByMonthDataApi);
}
export default DashboardSaga;