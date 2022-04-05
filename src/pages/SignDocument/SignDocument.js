import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteTwoTone } from "@ant-design/icons";
import {
  deleteDocumentAct,
  getDocumentsAct,
  // setEditingDocumentAct,
} from "../../redux/document/DocumentAction";
import { Image, Popconfirm, Space, Table, Tag } from "antd";
import { URL_STATIC } from "../../ultil/systemSettings";
import MainBreadcrumb from "../../templates/main/MainBreadcrumb/MainBreadcrumb";

// import { openFormEdit } from "../../redux/modal/ModalAction";
// import SignDocumentForm from "./SignDocumentForm";

export default function SignDocument() {
  const documentList = useSelector(
    (state) => state.DocumentReducer.documentList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getDocumentList();

    return () => {};
  }, []);

  const getDocumentList = () => {
    dispatch(getDocumentsAct());
  };

  const formatDate = (strDate) => {
    let newDate = new Date(strDate).toLocaleDateString("vi-GB");
    return newDate;
  };
  const handleDelete = (id) => {
    dispatch(deleteDocumentAct(id));
  };
  // const handleClickADD = () => {
  //   const document = {
  //     id: "",
  //     dateSign: "",
  //     line: null,
  //     transporter: null,
  //     quantity: 0,
  //     documentImg: null,
  //   };

  //   dispatch(setEditingDocumentAct(document));
  //   dispatch(openFormEdit(<SignDocumentForm />));
  // };
  const renderDocumentList = () => {
    const columns = [
      {
        title: "#",
        dataIndex: "#",
        key: "#",
        width: "7%",
      },
      {
        title: "Ngày",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Tuyến",
        dataIndex: "Line",
        key: "Line",
        render: (line) => (
          <Tag color="red" key={line}>
            {line}
          </Tag>
        ),
      },
      {
        title: "Xe",
        dataIndex: "plate",
        key: "plate",
        render: (plate) => (
          <Tag color="geekblue" key={plate}>
            {plate}
          </Tag>
        ),
      },

      {
        title: "Số chuyến",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Lỡ chuyến",
        dataIndex: "missQuantity",
        key: "missQuantity",
      },
      {
        title: "File",
        dataIndex: "files",
        key: "files",
        render: (text, record, index) => (
          <Image.PreviewGroup >
            {record.files.map((file, index) => {
              return <Image width={20} src={`${URL_STATIC}/${file}`} />;
            })}
          </Image.PreviewGroup>
        ),
      },
      {
        title: "#",
        fixed: "right",
        width: "7%",
        render: (text, record, index) => {
          return (
            <Space size="middle">
              <Popconfirm
                placement="topRight"
                title="Bạn có chắc chắn muốn xóa?"
                onConfirm={() => {
                  handleDelete(record.id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <span style={{ cursor: "pointer" }}>
                  <DeleteTwoTone twoToneColor="#eb2f96" />
                </span>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];

    const dataSource = documentList.map((document, index) => {
      return {
        "#": index + 1,
        date: formatDate(document.dateSign),
        plate: document.transporter?.plate,
        Line: document.line?.lineNumber,
        quantity: document.quantity,
        missQuantity: document.missQuantity,
        files: document.documentImg,
        id: document._id,
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
          <MainBreadcrumb contentTitle="Danh sách đăng ký" />

          {/* /.container-fluid */}
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

                  <Link to="/document/add" className="btn btn-primary">
                    <i className="fa fa-plus"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">{renderDocumentList()}</div>
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
