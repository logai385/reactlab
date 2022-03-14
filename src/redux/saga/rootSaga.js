import {all} from 'redux-saga/effects';
import AuthSaga from '../auth/AuthSaga';
import DocumentSaga from '../document/DocumentSaga';
import LineSaga from '../line/LineSaga';
import TransporterSaga from '../transporter/TransporterSaga';


function* rootSaga() {
  yield all([
    AuthSaga(),
    LineSaga(),
    TransporterSaga(),
    DocumentSaga(),
  ]);
}

export default rootSaga;