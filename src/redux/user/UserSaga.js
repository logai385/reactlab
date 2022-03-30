import { call, takeLatest, put } from "redux-saga/effects";
import AuthService from "../../services/AuthService";
import { STATUS_CODE } from "../../ultil/systemSettings";
import { setOperatorAct, setOperatorLineAct } from "./UserAction";
import { GET_OPERATOR, GET_OPERATOR_LINE } from "./UserConst";

function* getOperatorApi() {
  try {
    const { data,status } = yield call(AuthService.getOperatorUser);  
    if (status===STATUS_CODE.SUCCESS) {      
      yield put(setOperatorAct(data));
    }
  } catch (e) {
    console.log(e);
  }
}
function* getOperatorLineApi() {
  try {
    const { data,status } = yield call(AuthService.getOperatorLine);  
    if (status===STATUS_CODE.SUCCESS) {      
      yield put(setOperatorLineAct(data));
    }
  } catch (e) {
    console.log(e);
  }
}
function* UserSaga() {
  yield takeLatest(GET_OPERATOR, getOperatorApi);
  yield takeLatest(GET_OPERATOR_LINE, getOperatorLineApi);
}

export default UserSaga;
