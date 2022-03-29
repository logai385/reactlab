import { call, takeLatest, put } from "redux-saga/effects";
import AuthService from "../../services/AuthService";
import { STATUS_CODE } from "../../ultil/systemSettings";
import { setOperatorAct } from "./UserAction";
import { GET_OPERATOR } from "./UserConst";

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
function* UserSaga() {
  yield takeLatest(GET_OPERATOR, getOperatorApi);
}

export default UserSaga;
