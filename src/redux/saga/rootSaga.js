import {all} from 'redux-saga/effects';
import AuthSaga from '../auth/AuthSaga';
import DocumentSaga from '../document/DocumentSaga';
import LineSaga from '../line/LineSaga';
import TransporterSaga from '../transporter/TransporterSaga';
import UserSaga from '../user/UserSaga';


function* rootSaga() {
  yield all([
    AuthSaga(),
    LineSaga(),
    TransporterSaga(),
    DocumentSaga(),
    UserSaga()
  ]);
}

export default rootSaga;