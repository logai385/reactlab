import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { DatePicker, Select } from "antd";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getLineListAct } from "../../redux/line/LineAction";
import { getLineByDateDataChart } from "../../redux/dashboard/DashboardAction";
ChartJS.register(ArcElement, Tooltip, Legend);
const { Option } = Select;

const StatisLineByDate = () => {
  const dispatch = useDispatch();
  //   dispatch(getLineListAct());

  const lineLst = useSelector((state) => state.LineReducer.lineList);

  const { lineByDateDataChart } = useSelector(
    (state) => state.DashboardReducer
  );
  console.log("lineByDateDataChart", lineByDateDataChart);
  const labels = ["Chuyến mất", "Tổng Chuyến"];

  const date = new Date();
  const [queryData, setQueryData] = useState({
    line: lineLst[0]?._id,
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toString(),
    endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0).toString(),
  });
  const renderLineOption = () =>
    lineLst.map((item) => (
      <Option key={item._id} value={item._id}>
        {item.lineNumber}
      </Option>
    ));
  useEffect(() => {
    dispatch(getLineListAct());
    dispatch(
      getLineByDateDataChart({
        line: queryData.line?queryData.line: lineLst[0]?._id,
        startDate: queryData.startDate,
        endDate: queryData.endDate,
      })
    );

    return () => {};
  }, [queryData]);

  const data = {
    labels,
    datasets: [
      {
        label: lineByDateDataChart.lineNumber,
        data: [lineByDateDataChart.miss, lineByDateDataChart.total],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Pie data={data} className="chart__content" />
      <div className="data__action">
        <h5>Thống kế Tuyến theo khoảng</h5>

        <div className="input-group ">
          <Select
            name="line"
            onChange={(value) => {
              setQueryData({ ...queryData, line: value });
            }}
            className="mr-1"
            value={queryData.line?queryData.line:lineLst[0]?._id}
          >
            {renderLineOption()}
          </Select>
          <DatePicker
          suffixIcon={null}
            name="startDate"
            className="mr-1"
            placeholder="Ngày bắt đầu"
            defaultValue={moment(queryData.startDate)}
            onChange={(date, dateString) => {
              setQueryData({ ...queryData, startDate: dateString });
            }}
          />
          <DatePicker
          suffixIcon={null}
            name="endDate"
            placeholder="Ngày kết thúc"
            defaultValue={moment(queryData.endDate)}
            onChange={(date, dateString) => {
              setQueryData({ ...queryData, endDate: dateString });
            }}
          />
        </div>
      </div>
    </>
  );
};
export default StatisLineByDate;
