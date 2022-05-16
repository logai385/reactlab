import { call, put, takeLatest,select } from "redux-saga/effects";
import AuthService from "../../services/AuthService";
import setAuthToken from "../../ultil/SetAuthToken";
import {
  LOCAL_STOGARE_TOKEN_NAME,
  STATUS_CODE,
} from "../../ultil/systemSettings";
import { CHECK_AUTH_API, LOGIN_API, SET_AUTHTOKEN } from "./AuthConst";
import { getLineByUserAct } from "../../redux/line/LineAction";

function* loginUser(action) {
  try {
    const { data, status } = yield call(AuthService.loginUser, action.payload);

    if (status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(LOCAL_STOGARE_TOKEN_NAME, data.accessToken);
      yield put({ type: CHECK_AUTH_API });
    } else {
      //login fail
    }
  } catch (error) {
    // yield put({type: 'LOGIN_FAILURE', payload: error});
  }
}
function* checkAuth(action) {
  const token = localStorage.getItem(LOCAL_STOGARE_TOKEN_NAME);
  const navigate = yield select(state => state.NavigateReducer.navigate);
  if (token) {
    setAuthToken(token);
    try {
      const { data, status } = yield call(AuthService.checkAuth);

      if (status === STATUS_CODE.SUCCESS) {        
        yield put({
          type: SET_AUTHTOKEN,
          payload: {
            isAuthenticated: true,
            user: data,
          },
        });
        yield put(getLineByUserAct());
      
      }
    } catch (error) {
      yield navigate("/login");

      yield setAuthToken(null);
      yield put({
        type: SET_AUTHTOKEN,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  } else {
    yield navigate("/login");

    yield setAuthToken(null);
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
