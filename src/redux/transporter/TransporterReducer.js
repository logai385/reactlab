import {
  SET_EDITING_TRANSPORTER,
  SET_TRANSPORTER_BY_LINE,
  SET_TRANSPORTER_LINE_LIST,
  SET_TRANSPORTER_LIST,
} from "./TransporterConst";

const initialState = {
  transporterList: [],
  editingTransporter: {
    id: "",
    plate: "",
    mainLines: [],
    minorLines: [],
  },
  lineList: [],
  transporterByLine: [],
};
const TransporterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TRANSPORTER_LIST:
      return { ...state, transporterList: payload };
    case SET_EDITING_TRANSPORTER:
      return { ...state, editingTransporter: payload };
    case SET_TRANSPORTER_LINE_LIST:
      return { ...state, lineList: payload };
    case SET_TRANSPORTER_BY_LINE:
      return { ...state, transporterByLine: payload };
    default:
      return { ...state };
  }
};
export default TransporterReducer;
