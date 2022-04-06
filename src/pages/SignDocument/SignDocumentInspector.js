import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  deleteDocumentAct,
  getDocumentByLineAct,
} from "../../redux/document/DocumentAction";
import { Image, Popconfirm, Space, Table, Tag, Select, DatePicker } from "antd";
import { URL_STATIC } from "../../ultil/systemSettings";
import MainBreadcrumb from "../../templates/main/MainBreadcrumb/MainBreadcrumb";
import { getLineListAct } from "../../redux/line/LineAction";
// import { openFormEdit } from "../../redux/modal/ModalAction";
// import SignDocumentForm from "./SignDocumentForm";
const { Option } = Select;
export default function SignDocument() {
  const documentList = useSelector(
    (state) => state.DocumentReducer.documentList
  );
  const lineLst = useSelector((state) => state.LineReducer.lineList);

  const dispatch = useDispatch();
  const date = new Date();
  const [queryData, setQueryData] = useState({
    line: lineLst[0]?._id,
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
    endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString(),
  });
  const renderLineOption = () => {
    const ops = lineLst.map((item) => (
      <Option key={item._id} value={item._id}>
        {item.lineNumber} - {item.description}
      </Option>
    ));
    ops.push((<Option key="all" value="undefined">Tất cả</Option>));
    return ops;
  };
  // useEffect(() => {
  //   dispatch(getLineListAct());
  // }, []);

  useEffect(() => {
    dispatch(getLineListAct());
    dispatch(
      getDocumentByLineAct({
        lineId: queryData.line ? queryData.line : lineLst[0]?._id,
        startDate: queryData.startDate,
        endDate: queryData.endDate,
      })
    );

    return () => {};
  }, [queryData]);

  const formatDate = (strDate) => {
    let newDate = new Date(strDate).toLocaleDateString("vi-GB");
    return newDate;
  };
  const handleDelete = (id) => {
    dispatch(deleteDocumentAct(id));
  };

  const renderDocumentList = () => {
    const columns = [
      {
        title: "#",
        dataIndex: "#",
        key: "#",
        width: "7%",
        fixed: "left",
      },
      {
        title: "Ngày",
        dataIndex: "date",
        key: "date",
        fixed: "left",
      },
      {
        title: "Tuyến",
        dataIndex: "Line",
        key: "Line",
        fixed: "left",
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
          <Image.PreviewGroup>
            {record.files.map((file, index) => {
              return <Image key={index} width={20} src={`${URL_STATIC}/${file}`} />;
            })}
          </Image.PreviewGroup>
        ),
      },
      // {
      //   title: "#",
      //   fixed: "right",
      //   width: "7%",
      //   render: (text, record, index) => {
      //     return (
      //       <Space size="middle">
      //         <Popconfirm
      //           placement="topRight"
      //           title="Bạn có chắc chắn muốn xóa?"
      //           onConfirm={() => {
      //             handleDelete(record.id);
      //           }}
      //           okText="Yes"
      //           cancelText="No"
      //         >
      //           <span style={{ cursor: "pointer" }}>
      //             <DeleteTwoTone twoToneColor="#eb2f96" />
      //           </span>
      //         </Popconfirm>
      //       </Space>
      //     );
      //   },
      // },
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
        rowKey={"id"}
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

          <div className="data__action"></div>
        </section>
        {/* Main content */}

        <section className="content">
          <div className="row mb-3 ">
          
            <div className="data__action col-12 input-group justify-content-end">
              <Select
                name="line"
                onChange={(value) => {
                  setQueryData({ ...queryData, line: value });
                }}
                className="mr-1"
                style={{ maxWidth: "40%" }}
                value={queryData.line ? queryData.line : lineLst[0]?._id}
              >
                {renderLineOption()}
              </Select>
              <DatePicker
                name="startDate"
                className="mr-1"
                placeholder="Ngày bắt đầu"
                defaultValue={moment(queryData.startDate)}
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
