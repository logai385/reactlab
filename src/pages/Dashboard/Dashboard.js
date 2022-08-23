import React from "react";
import StatisUnitByDate from "./StatisUnitByDate";
import StatisBusByDate from "./StatisBusByDate";
import StatisLineByDate from "./StatisLineByDate";
import StatisLineByMonth from "./StatisLineByMonth";

const Dashboard = () => {
  return (
    <>
      {/* <MainBreadcrumb contentTitle="Dashboard" /> */}
      <div className="mt-3 px-0 px-md-5">
        <div className="row container-fluid ">
          <h5>Thống kê trong tháng</h5>
          <div className="col-12 chart__item mb-3">
            <StatisLineByMonth />
          </div>
          {/* <h5 className="col-12 col-md-6">Thống kế Chuyến theo khoảng</h5> */}
          {/* <div className="row container-fluid"> */}
            <div className="col-12 col-md-6 chart__item">
              <StatisLineByDate />
            </div>
            <div className="col-12 col-md-6 chart__item">
              <StatisBusByDate />
            </div>
            <div className="col-12 col-md-6 chart__item">
              <StatisUnitByDate />
            </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
