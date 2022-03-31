import React, { useEffect, useState } from "react";
import { Button, DatePicker, Input, Select, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import MainBreadcrumb from "../../templates/main/MainBreadcrumb/MainBreadcrumb";
import { Link, Navigate } from "react-router-dom";
import { getLineByUserAct } from "../../redux/line/LineAction";
import { getTransporterByLineAct } from "../../redux/transporter/TransporterAction";
import { addSignDocumentAct } from "../../redux/document/DocumentAction";

const { Option } = Select;
const SignDocumentAdd = () => {
  const dispatch = useDispatch();

  const userLine = useSelector((state) => state.LineReducer.userLine);
  const transporterByLine = useSelector(
    (state) => state.TransporterReducer.transporterByLine
  );
  const addSuccess = useSelector((state) => state.DocumentReducer.addSuccess);
  const [signDocument, setSignDocument] = useState({
    dateSign: "",
    transporter: "",
    line: "",
    quantity: 0,
    missQuantity: 0,
    documentImg: [],
  });
  const renderLineOption = () => {
    return userLine.map((line, index) => (
      <Option key={index} value={line._id}>
        {line.lineNumber}
      </Option>
    ));
  };
  const renderTransporterOption = () => {
    return transporterByLine.map((transporter, index) => (
      <Option key={index} value={transporter._id}>
        {transporter.plate}
      </Option>
    ));
  };
  const handleDateChange = (date, dateString) => {
    setSignDocument({ ...signDocument, dateSign: dateString });
  };
  const handleTransporterChange = (value) => {
    setSignDocument({ ...signDocument, transporter: value });
  };
  const handleLineChange = (value) => {
    setSignDocument({ ...signDocument, line: value, transporter: "" });
    dispatch(getTransporterByLineAct(value));
  };
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    let newfile = signDocument.documentImg;
    newfile.splice(0,0,file);
    if(newfile.length>2) newfile=newfile.slice(0,2);
    setSignDocument({ ...signDocument, documentImg: newfile });

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("transporter", signDocument.transporter);
    console.log("dateSign", signDocument.dateSign);
    formData.append("line", signDocument.line);
    formData.append("quantity", signDocument.quantity);    
    formData.append("missQuantity", signDocument.missQuantity);    
    for(let i=0;i<signDocument.documentImg.length;i++){
      formData.append("documentImg", signDocument.documentImg[i]);    
    }
    // console.log(signDocument.documentImg);
    dispatch(addSignDocumentAct(formData));
  };
  useEffect(() => {
    dispatch(getLineByUserAct());
    if (addSuccess) {
      <Navigate to="/document" />;
    }
    // dispatch(getTransporterByLineAct(values.line));

    return () => {};
  }, []);

  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <MainBreadcrumb contentTitle="Đăng ký" />
        </section>
        {/* Main content */}

        <section className="content">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="card-body col-12 col-md-8 mx-auto">
              <input name="id" type="hidden" />
              <div className="form-row">
                <div className="form-group col-12">
                  <label htmlFor="inputEmail4">Ngày</label>
                  <DatePicker
                    name="dateSign"
                    size="large"
                    style={{ width: "100%" }}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress ">Tuyến</label>
                <Select
                  name="line"
                  size="large"
                  style={{ width: "100%" }}
                  value={signDocument.line}
                  onChange={handleLineChange}
                >
                  {renderLineOption()}
                </Select>
              </div>
              <div className="form-group">
                <label>Số Xe</label>
                <Select
                  name="transporter"
                  size="large"
                  style={{ width: "100%" }}
                  value={signDocument.transporter}
                  onChange={handleTransporterChange}
                >
                  {renderTransporterOption()}
                </Select>
              </div>
              <div className="form-group">
                <label>Số Chuyến </label>
                <Input
                  size="large"
                  type="number"
                  name="quantity"
                  value={signDocument.quantity}
                  onChange={(e) => {
                    setSignDocument({
                      ...signDocument,
                      quantity: e.target.value,
                    });
                  }}
                ></Input>
              </div>
              <div className="form-group">
                <label>Số lỡ chuyến </label>
                <Input
                  size="large"
                  type="number"
                  name="quantity"
                  value={signDocument.missQuantity}
                  onChange={(e) => {
                    setSignDocument({
                      ...signDocument,
                      missQuantity: e.target.value,
                    });
                  }}
                ></Input>
              </div>
              <div className="form-group">
                <label>File </label>
                <Input
                  size="large"
                  type="file"
                  name="documentImg"
                  onChange={handleChangeFile} 
                  className="mb-3"                 
                ></Input>
                
                <Input
                  size="large"
                  type="file"
                  name="documentImg"
                  onChange={handleChangeFile}                  
                ></Input>
              </div>
              <div className=" text-right">
                <Space>
                  <Button type="primary" size="large" ghost>
                    <Link to="/document">
                      <i className="fa fa-angle-double-left"></i>
                    </Link>
                  </Button>

                  <Button htmlType="submit" size="large" type="primary">
                    Save
                  </Button>
                </Space>
              </div>
            </div>
            {/* /.card-body */}
          </form>
        </section>
        {/* /.content */}
      </div>
    </>
  );
};
export default SignDocumentAdd;
