import { SET_EDIT_LINE, SET_LINE_LIST, SET_USER_LINE,SET_LINE_AVAILABLE, SET_LINE_SEARCH } from "./LineConst";

const initialState = {
  lineList: [],
  editingLine: {
    id: "",
    lineNumber: 1,
    description: "",
    user: null,
    status: true,
  },
  userLine: [],
  lineSearch:[]
};

const LineReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LINE_LIST:
      return { ...state, lineList: payload };
    case SET_LINE_SEARCH:
      return { ...state, lineSearch: payload };
    case SET_EDIT_LINE:
      return { ...state, editingLine: payload };
    case SET_USER_LINE:
      return { ...state, userLine: payload };
    default:
      return { ...state };
  }
};
export default LineReducer;
