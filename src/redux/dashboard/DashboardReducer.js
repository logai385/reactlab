import { SET_LINE_BY_DATE_DATA_CHART, SET_LINE_BY_MONTH_DATA_CHART,SET_BUS_BY_DATE_DATA_CHART,SET_UNIT_BY_DATE_DATA_CHART } from "./DashboardConst";

const initialState = {
  lineByMonthDataChart: [],
  lineByDateDataChart: {},
  busByDateDataChart: {},
  unitByDateDataChart: {},
};

const DashboardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LINE_BY_MONTH_DATA_CHART:
      return { ...state, lineByMonthDataChart: payload };
    case SET_LINE_BY_DATE_DATA_CHART:
      return { ...state, lineByDateDataChart: payload };
    case SET_BUS_BY_DATE_DATA_CHART:
      return { ...state, busByDateDataChart: payload };
    case SET_UNIT_BY_DATE_DATA_CHART:
      return { ...state, unitByDateDataChart: payload };

    default:
      return state;
  }
};
export default DashboardReducer;
