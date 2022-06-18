import { Button, Input, Popconfirm, Space, Table, Tag } from "antd";
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highlighter from "react-highlight-words";
import { DeleteTwoTone, EditTwoTone,SearchOutlined } from "@ant-design/icons";
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
  const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
  });
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
  let searchInput;
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
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
        width: "15%",
        ...getColumnSearchProps("plate"),
        render: (plate) => (
          <Tag color="geekblue">
            {plate}
          </Tag>
        ),
      },
      {
        title: "T. Chính",
        dataIndex: "mainLines",
        key: "mainLines",
        width: "15%",
        render: (lines) =>
          lines.map((line, index) => {
            return (
              <Tag color="green"  key={index}>
                {line.lineNumber}
              </Tag>
            );
          }),
      },
      {
        title: "T. Tăng cường",
        dataIndex: "minorLines",
        key: "minorLines",
        width: "15%",
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
        title: "Doanh nghiệp",
        dataIndex: "unit",
        key: "unit",
        ...getColumnSearchProps("unit"),
      },
      {
        title: "#",
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
      let { _id, plate, mainLines, minorLines,unit } = transporter;

      return {
        index: index + 1,
        plate: plate,
        mainLines: mainLines,
        minorLines: minorLines,
        unit: unit?.name,
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
                    Tìm kiếm
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
