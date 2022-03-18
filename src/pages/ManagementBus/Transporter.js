import { Popconfirm, Space, Table, Tag } from "antd";
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
    dispatch(getTransporterListAct());
    return () => {};
  }, []);

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
        width: "7%",
      },

      {
        title: "Biển Số",
        dataIndex: "plate",
        key: "plate",
        render: (plate) => (
          <Tag color="geekblue">
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
              <Tag color="green" >
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
              <Tag color="red">
                {line.lineNumber}
              </Tag>
            );
          }),
      },

      {
        title: "Action",
        key: "_id",
        fixed: "right",
        width: "7%",
        render: (text, record, index) => {
          return (
            <Space size="middle">
            <Popconfirm
                placement="topRight"
                title="Bạn có chắc chắn muốn xóa?"
                onConfirm={() => {
                  deleteTransporter(record.id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <span style={{ cursor: "pointer" }}>
                  <DeleteTwoTone twoToneColor="#eb2f96" />
                </span>
              </Popconfirm>
            
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
        rowKey="id"
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
