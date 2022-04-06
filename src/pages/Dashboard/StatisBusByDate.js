import React, { useEffect, useLayoutEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { DatePicker, Select } from "antd";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import { getBusByDateDataChart } from "../../redux/dashboard/DashboardAction";
import { getTransporterListAct } from "../../redux/transporter/TransporterAction";
ChartJS.register(ArcElement, Tooltip, Legend);
const { Option } = Select;

const StatisBusByDate = () => {
  const dispatch = useDispatch();
  //   dispatch(getLineListAct());

  const busLst = useSelector(
    (state) => state.TransporterReducer.transporterList
  );

  const { busByDateDataChart } = useSelector((state) => state.DashboardReducer);

  const labels = ["Chuyến mất", "Tổng Chuyến"];

  const date = new Date();
  const [queryData, setQueryData] = useState({
    bus:busLst[0]?._id,
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
    endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString(),
  });
  const renderBusOption = () =>
    busLst.map((item) => (
      <Option key={item._id} value={item._id}>
        {item.plate}
      </Option>
    ));
  useEffect(() => {
    dispatch(getTransporterListAct());
    dispatch(
      getBusByDateDataChart({
        bus: queryData.bus?queryData.bus:busLst[0]?._id,
        startDate: queryData.startDate,
        endDate: queryData.endDate,
      })
    );
    
    return () => { };
  }, [queryData]);

  const data = {
    labels,
    datasets: [
      {
        label: busByDateDataChart.plate,
        data: [busByDateDataChart.miss, busByDateDataChart.total],
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
        <h5>Thống kế Bus theo khoảng</h5>

        <div className="input-group ">
          <Select
            name="bus"
            onChange={(value) => {
              setQueryData({ ...queryData, bus: value });
            }}
            className="mr-1"
            value={queryData.bus?queryData.bus:busLst[0]?._id}
          >
            {renderBusOption()}
          </Select>
          <DatePicker
            suffixIcon={null}
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
export default StatisBusByDate;
