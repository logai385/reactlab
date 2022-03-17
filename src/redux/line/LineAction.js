import { type } from "@testing-library/user-event/dist/type";
import { ADD_LINE_API, DELETE_LINE_API, GET_LINE_BY_USER_API, GET_LINE_LIST_API, POST_LINE_API, SET_EDIT_LINE, SET_LINE_LIST, SET_USER_LINE } from "./LineConst";
export const addLineAct = (line) => {
  return {
    type: ADD_LINE_API,
    line,
  };
}
export const getLineListAct = () => ({
  type: GET_LINE_LIST_API,
});
export const postLineAct = (line) => ({
  type: POST_LINE_API,
  line,
});
export const deleteLineAct = (id) => ({
  type: DELETE_LINE_API,
  id,
});
export const setLineListAct = (lineList) => ({
  type: SET_LINE_LIST,
  payload: lineList,
});
export const setEditLineAct = (line) => ({
  type: SET_EDIT_LINE,
  payload:line,
});
export const getLineByUserAct=()=>({
  type:GET_LINE_BY_USER_API
})
export const setLineByUserAct=(linelist)=>({
  type:SET_USER_LINE,
  payload:linelist
})