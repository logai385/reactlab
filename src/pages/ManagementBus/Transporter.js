import { Space, Table, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import {
  deleteTransporterAct,
  getTransporterListAct,
  setEditingTransporterAct,
} from "../../redux/transporter/TransporterAction";
import MainBreadcrumb from "../../templates/main/MainBreadcrumb/MainBreadcrumb";
import { openFormEdit } from "../../redux/modal/ModalAction";
import TransporterForm from "./TransporterForm";


export default function Transporter() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { transporterList } = useSelector((state) => state.TransporterReducer);
  useEffect(() => {
    getTransporterList();
    return () => {};
  }, []);

  const getTransporterList = () => {
    dispatch(getTransporterListAct());
  };

  const deleteTransporter = (id) => {
    dispatch(deleteTransporterAct(id));
  };

  const handleEditTransporter = (transporter) => {    
    const mainLines=transporter.mainLines.map(line=>line._id)
    const minorLines=transporter.minorLines.map(line=>line._id)
    const transporterEdit = { ...transporter, mainLines, minorLines };
    dispatch(setEditingTransporterAct(transporterEdit));
    dispatch(openFormEdit(<TransporterForm />));
  };
  const handleClickAdd = () => {
    const transporter = {
      id: "",
      plate: "",
      mainLines: [],
      minorLines: [],
    };

    dispatch(setEditingTransporterAct(transporter));
    dispatch(openFormEdit(<TransporterForm />));
    
  };
  const renderTransporterList = () => {
    const columns = [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        width: "10%",
      },

      {
        title: "Biển Số",
        dataIndex: "plate",
        key: "plate",
        render: (plate) => (
          <Tag color="geekblue" key={plate}>
            {plate}
          </Tag>
        ),
      },
      {
        title: "Tuyến chính",
        dataIndex: "mainLines",
        key: "mainLines",
        render: (lines) =>
          lines.map((line, index) => {
            return (
              <Tag color="green" key={index}>
                {line.lineNumber}
              </Tag>
            );
          }),
      },
      {
        title: "Tuyến tăng cường",
        dataIndex: "minorLines",
        key: "minorLines",
        render: (lines) =>
          lines.map((line, index) => {
            return (
              <Tag color="red" key={index}>
                {line.lineNumber}
              </Tag>
            );
          }),
      },

      {
        title: "Action",
        key: "_id",
        fixed: "right",
        width: "10%",
        render: (text, record, index) => {
          return (
            <Space size="middle">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  deleteTransporter(record._id);
                }}
              >
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleEditTransporter(record);
                }}
              >
                <EditTwoTone />
              </span>
            </Space>
          );
        },
      },
    ];

    const dataSource = transporterList.map((transporter, index) => {
      let { _id, plate, mainLines, minorLines } = transporter;

      return {
        index: index + 1,
        plate: plate,
        mainLines: mainLines,
        minorLines: minorLines,
        id: _id,
      };
    });

    return (
      <Table
        rowKey="_id"
        dataSource={dataSource}
        columns={columns}
        size="small"
        scroll={{ x: 768 }}
      />
    );
  };

  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <MainBreadcrumb contentTitle="Danh sách xe" />
        </section>
        {/* Main content */}

        <section className="content">
          <div className="row mb-3">
            <div className="col-12 col-md-6 offset-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm"
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-primary" type="button">
                    search
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                      handleClickAdd();
                    }}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                {/* <div className="card-header">
                    <h3 className="card-title">
                      DataTable with default features
                    </h3>
                  </div> */}
                {/* /.card-header */}
                <div className="card-body">{renderTransporterList()}</div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
}
