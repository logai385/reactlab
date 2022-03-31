import { SET_LINE_BY_DATE_DATA_CHART } from "./DashboardConst";

const initialState = {
  lineByDateDataChart: [],
};

const DashboardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LINE_BY_DATE_DATA_CHART:
      return { ...state, lineByDateDataChart: payload };

    default:
      return state;
  }
};
export default DashboardReducer;
