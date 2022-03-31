import { SET_LINE_BY_DATE_DATA_CHART,GET_LINE_BY_DATE_DATA_CHART } from "./DashboardConst";

export const setLineByDateDataChart = (data)=>({
    type: SET_LINE_BY_DATE_DATA_CHART,
    payload: data
})
export const getLineByDateDataChart = (queryDate)=>({
    type: GET_LINE_BY_DATE_DATA_CHART,
    payload: queryDate
})