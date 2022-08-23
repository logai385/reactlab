import React, { useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getALLLineByDateDataChart } from "../../redux/dashboard/DashboardAction";
import { Select, DatePicker} from "antd";
import moment from "moment";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    // title: {
    //   display: true,
    //   align:"start",
    //   text: "Số chuyến theo Tuyến",
    // },
  },
};
const { Option } = Select;

const date = new Date();
const StatisLineByMonth = () => {
  const dispatch = useDispatch();
  // const [queryDate, setQueryDate] = React.useState({
  //   month: new Date().getMonth() + 1,
  //   year: new Date().getFullYear(),
  // });
  const [queryData, setQueryData] = React.useState({
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
    endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString(),
  });
  const { alllineByDateDataChart } = useSelector(
    (state) => state.DashboardReducer
  );
  const labels = alllineByDateDataChart.map((item) => item.lineNumber);
  useEffect(() => {
    // dispatch(
    //   getLineByMonthDataChart({ month: queryDate.month, year: queryDate.year })
    // );
    dispatch(
      getALLLineByDateDataChart({
        startDate: queryData.startDate,
        endDate: queryData.endDate,
      })
    );
  }, [queryData]);
  // const handleYearChange = (value) => {
  //   setQueryData({ ...queryDate, year: value });
  // };
  // const handleMonthChange = (value) => {
  //   setQueryData({ ...queryDate, month: value });
  // };
  // const renderMonthOption = () => {
  //   const currentYear = new Date().getFullYear();

  //   const options = [];
  //   for (let i = currentYear; i > currentYear - 10; i--) {
  //     options.push(
  //       <Option value={i} key={i}>
  //         {i}
  //       </Option>
  //     );
  //   }
  //   return options;
  // };
  // const renderYearOption = () => {
  //   const options = [];
  //   for (let i = 12; i > 0; i--) {
  //     options.push(
  //       <Option value={i} key={i}>
  //         {i}
  //       </Option>
  //     );
  //   }
  //   return options;
  // };
  const data = {
    labels,
    datasets: [
      {
        label: "Mất chuyến",
        data: alllineByDateDataChart.map((item) => item.miss),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Tổng chuyến",
        data: alllineByDateDataChart.map((item) => item.total),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <>
      <Bar options={options} data={data} className="mt-5" />
      <div className="data__action">
        <div className="input-group">
          {/* <Select
            name="year"
            // style={{ width: "13%" }}
            onChange={handleYearChange}
            className="mr-3"
            value={queryDate.year}
          >
            {renderMonthOption()}
          </Select>
          <Select
            name="month"
            // style={{ width: "10%" }}
            value={queryDate.month}
            onChange={handleMonthChange}
          >
            {renderYearOption()}
          </Select> */}
          <DatePicker
          
          name="startDate"
          className="mr-1"
          placeholder="Ngày bắt đầu"
          // defaultValue={moment(queryData.startDate)}
          value={moment(queryData.startDate)}
          onChange={(date, dateString) => {
            setQueryData({ ...queryData, startDate: dateString });
          }}
        />
        <DatePicker
        
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

export default StatisLineByMonth;
