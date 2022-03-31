import { all } from "redux-saga/effects";
import AuthSaga from "../auth/AuthSaga";
import DashboardSaga from "../dashboard/DashboardSaga";
import DocumentSaga from "../document/DocumentSaga";
import LineSaga from "../line/LineSaga";
import TransporterSaga from "../transporter/TransporterSaga";
import UnitSaga from "../Unit/UnitSaga";
import UserSaga from "../user/UserSaga";

function* rootSaga() {
  yield all([
    AuthSaga(),
    LineSaga(),
    TransporterSaga(),
    DocumentSaga(),
    UserSaga(),
    UnitSaga(),
    DashboardSaga(),
  ]);
}

export default rootSaga;
