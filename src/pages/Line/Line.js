import React, { useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteLineAct,
  getLineListAct,
  setEditLineAct,
} from "../../redux/line/LineAction";
import { Space, Table, Tag } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import MainBreadcrumb from "../../templates/main/MainBreadcrumb/MainBreadcrumb";
export default function RegisterLine() {
  // Initialize state & action
  const { lineList } = useSelector((state) => state.LineReducer);
  const dispatch = useDispatch();
  // const history = useHistory();
  useEffect(() => {
    getLineList();

    return () => {};
  }, []);
  // action
  const getLineList = () => {
    dispatch(getLineListAct());
  };
  const editeLine = (line) => {
    dispatch(setEditLineAct(line));
    // history.push("/lines/edit");
  };
  const delLine = (id) => {
    dispatch(deleteLineAct(id));
  };
  const pushToAdd = () => {
    const line = {
      id: "",
      lineNumber: 1,
      description: "",
      status: true,
    };
    dispatch(setEditLineAct(line));
    // history.push("/lines/add");
  };
  //render functions
  const renderLineList = () => {
    const columns = [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        width:"10%",
      },
      {
        title: "Số Tuyến",
        dataIndex: "lineNumber",
        key: "lineNumber",
        render: (number) => (
          <Tag color="geekblue" key={number}>
            {number}
          </Tag>
        ),
      },
      {
        title: "Tên Tuyến",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (status) =>
          status ? (
            <Tag color="green">Enable</Tag>
          ) : (
            <Tag color="red">Disable</Tag>
          ),
      },

      {
        title: "Action",
        key: "id",
        fixed: 'right',
        width:"10%",
        render: (text, record, index) => {
          return (
            <Space size="middle">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  delLine(record.id);
                }}
              >
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  editeLine(record);
                }}
              >
                <EditTwoTone />
              </span>
            </Space>
          );
        },
      },
    ];

    const dataSource = lineList.map((line, index) => {
      return {
        index: index + 1,
        lineNumber: line.lineNumber,
        description: line.description,
        status: line.status,
        id: line._id,
      };
    });
    return <Table rowKey="id" dataSource={dataSource} columns={columns}  size="small"  scroll={{ x: 768}}/>;
  };
  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">    
          <MainBreadcrumb contentTitle="Danh sách tuyến" />
        </section>
        {/* Main content */}

        <section className="content">
          {/* <h1>Danh Sách</h1> */}
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
                  <button className="btn btn-primary" type="button">
                    <i class="fa fa-plus"></i>
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
                <div className="card-body">{renderLineList()}</div>
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
