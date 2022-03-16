import { call, takeLatest, put } from "redux-saga/effects";
import AuthService from "../../services/AuthService";
import { setOperatorAct } from "./UserAction";
import { GET_OPERATOR } from "./UserConst";

function* getOperatorApi() {
  try {
    const { data, status } = yield call(AuthService.getOperatorUser);
    if (data.success) {
      console.log(data);
      yield put(setOperatorAct(data.users));
    }
  } catch (e) {
    console.log(e);
  }
}
function* UserSaga() {
  yield takeLatest(GET_OPERATOR, getOperatorApi);
}

export default UserSaga;
