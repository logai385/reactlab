import {
  ADD_TRANSPORTER_API,
  DELETE_TRANSPORTER_API,
  GET_TRANSPORTER_BY_LINE_API,
  GET_TRANSPORTER_LIST_API,
  SET_EDITING_TRANSPORTER,
  SET_TRANSPORTER_BY_LINE,
  SET_TRANSPORTER_LIST,
  UPDATE_TRANSPORTER_API,GET_TRANSPORTER_BY_KEYWORD_API
} from "./TransporterConst";

export const setTransporterListAct = (transporterList) => ({
  type: SET_TRANSPORTER_LIST,
  payload: transporterList,
});

export const getTransporterListAct = () => ({
  type: GET_TRANSPORTER_LIST_API,
});

export const deleteTransporterAct = (id) => ({
  type: DELETE_TRANSPORTER_API,
  id: id,
});
export const addTransporterAct = (transporter) => ({
  type: ADD_TRANSPORTER_API,
  transporter: transporter,
})
export const postTransporterAct = (transporter) => ({
  type: UPDATE_TRANSPORTER_API,
  transporter: transporter,
})
export const setEditingTransporterAct = (transporter) => ({
  type:SET_EDITING_TRANSPORTER,
  payload:transporter
})
export const setTransporterByLineAct = (transporter) => ({
  type:SET_TRANSPORTER_BY_LINE,
  payload:transporter
})
export const getTransporterByLineAct = (id) => ({
  type:GET_TRANSPORTER_BY_LINE_API,
  payload:id
})
export const getTransporterByKeywordAct = (keyword) => ({
  type:GET_TRANSPORTER_BY_KEYWORD_API,
  payload:keyword
})