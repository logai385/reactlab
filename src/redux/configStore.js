import { combineReducers, applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./saga/rootSaga";
import AuthReducer from "./auth/AuthReducer";
import LineReducer from "./line/LineReducer";
import TransporterReducer from "./transporter/TransporterReducer";
import DocumentReducer from "./document/DocumentReducer";
import ModalReducer from "./modal/ModalReducer";
import UserReducer from "./user/UserReducer";
import NavigateReducer from "./navigate/NavigateReducer";
import UnitReducer from "./Unit/UnitReducer";
import DashboardReducer from "./dashboard/DashboardReducer";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    AuthReducer,
    LineReducer,
    TransporterReducer,
    DocumentReducer,
    ModalReducer,
    UserReducer,
    NavigateReducer,
    UnitReducer,
    DashboardReducer
});
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default store;

