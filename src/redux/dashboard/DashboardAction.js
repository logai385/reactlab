import {
  SET_LINE_BY_DATE_DATA_CHART,
  GET_LINE_BY_DATE_DATA_CHART,
  SET_LINE_BY_MONTH_DATA_CHART,
  GET_LINE_BY_MONTH_DATA_CHART,
  SET_BUS_BY_DATE_DATA_CHART,
  GET_BUS_BY_DATE_DATA_CHART,
} from "./DashboardConst";

export const setLineByDateDataChart = (data) => ({
  type: SET_LINE_BY_DATE_DATA_CHART,
  payload: data,
});
export const getLineByDateDataChart = (queryDate) => ({
  type: GET_LINE_BY_DATE_DATA_CHART,
  payload: queryDate,
});
export const setLineByMonthDataChart = (data) => ({
  type: SET_LINE_BY_MONTH_DATA_CHART,
  payload: data,
});
export const getLineByMonthDataChart = (queryDate) => ({
  type: GET_LINE_BY_MONTH_DATA_CHART,
  payload: queryDate,
});
export const setBusByDateDataChart = (data) => ({
  type: SET_BUS_BY_DATE_DATA_CHART,
  payload: data,
});
export const getBusByDateDataChart = (queryDate) => ({
  type: GET_BUS_BY_DATE_DATA_CHART,
  payload: queryDate,
});
