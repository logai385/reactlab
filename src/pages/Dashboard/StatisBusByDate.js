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
    bus: busLst[0]?._id,
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
    endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString(),
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = busLst.filter((o) => !selectedItems.includes(o));

  const renderBusOption = () =>
    filteredOptions.map((item) => (
      <Option key={item._id} value={item._id}>
        {item.plate}
      </Option>
    ));
  useEffect(() => {
    dispatch(getTransporterListAct());
    dispatch(
      getBusByDateDataChart({
        bus: queryData.bus ? queryData.bus : busLst[0]?._id,
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
        label: busByDateDataChart.plate,
        data: [busByDateDataChart.miss, busByDateDataChart.total],
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
        <h5 className="text-center">Thống kế theo xe</h5>

        <div className="input-group ">
          <Select
            name="bus"
            onChange={(value) => {
              setQueryData({ ...queryData, bus: value });
              setSelectedItems(value);
            }}
            placeholder="Chọn xe"
            className="mr-1"
            value={selectedItems} 
            style={{
              width: "30%",
            }}
            showSearch={true}
            filterOption={(inputValue, option)=>{            
              return option.children.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
            }
            }
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
export default StatisBusByDate;
