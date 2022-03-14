import { call, put, takeLatest } from "redux-saga/effects";
import AuthService from "../../services/AuthService";
import setAuthToken from "../../ultil/SetAuthToken";
import {
  LOCAL_STOGARE_TOKEN_NAME,
  STATUS_CODE,
} from "../../ultil/systemSettings";
import { CHECK_AUTH_API, LOGIN_API, SET_AUTHTOKEN } from "./AuthConst";
function* loginUser(action) {
  try {
    const { data, status } = yield call(AuthService.loginUser, action.payload);

    if (data.success) {
      localStorage.setItem(LOCAL_STOGARE_TOKEN_NAME, data.accessToken);
      yield put({type:CHECK_AUTH_API});
    }
    else{

    }
  } catch (error) {
    // yield put({type: 'LOGIN_FAILURE', payload: error});
  }
}
function* checkAuth(action) {
const token = localStorage.getItem(LOCAL_STOGARE_TOKEN_NAME);
    if (token) {
      setAuthToken(token);
      try {
        const { data, status } =  yield call(AuthService.checkAuth);
        
        if (data.success) {
          yield put({
            type: SET_AUTHTOKEN,
            payload: {
              isAuthenticated: true,
              user: data.user,
            },
          });
        }
      } catch (error) {
        
      }
    } else {
      setAuthToken(null);

      yield put({
        type: SET_AUTHTOKEN,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
}
function* AuthSaga() {
  yield takeLatest(LOGIN_API, loginUser);
  yield takeLatest(CHECK_AUTH_API, checkAuth);
}
export default AuthSaga;
