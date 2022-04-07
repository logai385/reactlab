import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { DatePicker, Select } from "antd";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import { getUnitByDateDataChart} from "../../redux/dashboard/DashboardAction";

import { getAllUnitAct } from "../../redux/Unit/UnitAction";
ChartJS.register(ArcElement, Tooltip, Legend);
const { Option } = Select;

const StatisUnitByDate = () => {
  const dispatch = useDispatch();
  //   dispatch(getLineListAct());

  const unitLst = useSelector((state) => state.UnitReducer.units);

  const { unitByDateDataChart } = useSelector(
    (state) => state.DashboardReducer
  );
  console.log("unitByDateDataChart", unitByDateDataChart);
  const labels = ["Mất chuyến", "Tổng chuyến"];

  const date = new Date();
  const [queryData, setQueryData] = useState({
    unit: unitLst[0]?._id,
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
    endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString(),
  });
  const renderBusOption = () =>
    unitLst.map((item) => (
      <Option key={item._id} value={item._id}>
        {item.name}
      </Option>
    ));
  useEffect(() => {
    dispatch(getAllUnitAct());
    dispatch(
      getUnitByDateDataChart({
        unit: queryData.unit?queryData.unit:unitLst[0]?._id,
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
        label: unitByDateDataChart?.name,
        data: [unitByDateDataChart?.miss, unitByDateDataChart?.total],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="chart__content">
      <Pie data={data} className="piechart__content" />
      <div className="data__action">
        <h5 className="text-center">Thống kê theo Doanh nghiệp</h5>

        <div className="input-group ">
          <Select
            name="bus"
            style={{ maxWidth: "35%" }}
            onChange={(value) => {
              setQueryData({ ...queryData, unit: value });
            }}
            className="mr-1"
            value={queryData.unit?queryData.unit:unitLst[0]?._id}
          >
            {renderBusOption()}
          </Select>
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
    </div>
  );
};
export default StatisUnitByDate;
