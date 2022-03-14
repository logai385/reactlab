import { combineReducers, applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./saga/rootSaga";
import AuthReducer from "./auth/AuthReducer";
import LineReducer from "./line/LineReducer";
import TransporterReducer from "./transporter/TransporterReducer";
import DocumentReducer from "./document/DocumentReducer";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    AuthReducer,
    LineReducer,
    TransporterReducer,
    DocumentReducer
});
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default store;

