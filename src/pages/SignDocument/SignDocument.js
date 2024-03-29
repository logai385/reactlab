import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteTwoTone, FilePdfOutlined } from "@ant-design/icons";

import {
  deleteDocumentAct,
  getDocumentsAct,
  // setEditingDocumentAct,
} from "../../redux/document/DocumentAction";
import { Image, Popconfirm, Space, Table, Tag } from "antd";
import { URL_STATIC } from "../../ultil/systemSettings";
import MainBreadcrumb from "../../templates/main/MainBreadcrumb/MainBreadcrumb";
import { getDaysBetweenDates } from "../../ultil/utils";
import { date } from "yup";

// import { openFormEdit } from "../../redux/modal/ModalAction";
// import SignDocumentForm from "./SignDocumentForm";

export default function SignDocument() {
  const documentList = useSelector(
    (state) => state.DocumentReducer.documentList
  );
  const { user } = useSelector((state) => state.AuthReducer);
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
        width: "12%",
      },
      {
        title: "Tuyến",
        dataIndex: "Line",
        key: "Line",
        width: "7%",
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
        width: "12%",
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
        title: "Mất chuyến",
        dataIndex: "missQuantity",
        key: "missQuantity",
      },
      {
        title: "File",
        dataIndex: "files",
        key: "files",
        render: (text, record, index) => {
          return record.files.map((file, index) => {
            if (file.substr(file.length - 3) !== "pdf") {
              return (
                <Image key={index} src={`${URL_STATIC}/${file}`} width={20} />
              );
            } else
              return (
                <a
                  key={index}
                  href={`${URL_STATIC}/${file}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FilePdfOutlined />
                </a>
              );
          });
        },
      },
      {
        title: "#",
        fixed: "right",
        width: "7%",
        render: (text, record, index) => {
          const diff = getDaysBetweenDates(
            record.createdAt,
            new Date().toString()
          );
          return diff < 2 || user?.role === "ADMINISTRATOR" ? (
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
          ) : null;
        },
      },
    ];

    const dataSource = documentList.map((document, index) => {
      return {
        "#": index + 1,
        date: formatDate(document.dateSign),
        createdAt: document.createdAt || new date("1985-03-02"),
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
                    Tìm kiếm
                  </button>
                  {user?.role !== "ADMINISTRATOR" && (
                    <Link to="/document/add" className="btn btn-primary">
                      <i className="fa fa-plus"></i>
                    </Link>
                  )}
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
