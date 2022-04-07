import React, { useEffect } from "react";
import { Button, DatePicker, Input, Select, Space, Typography } from "antd";
import moment from "moment";

import { useSelector, useDispatch, connect } from "react-redux";
import MainBreadcrumb from "../../templates/main/MainBreadcrumb/MainBreadcrumb";
import { Link, Navigate } from "react-router-dom";
import { getLineByUserAct } from "../../redux/line/LineAction";
import { getTransporterByLineAct } from "../../redux/transporter/TransporterAction";
import { addSignDocumentAct } from "../../redux/document/DocumentAction";
import { withFormik } from "formik";
import * as Yup from "yup";
const { Option } = Select;
const { Text } = Typography;

const SignDocumentAdd = (props) => {
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  const userLine = useSelector((state) => state.LineReducer.userLine);
  const transporterByLine = useSelector(
    (state) => state.TransporterReducer.transporterByLine
  );

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
    setFieldValue("dateSign", dateString);
  };
  const handleTransporterChange = (value) => {
    setFieldValue("transporter", value);

  };
  const handleLineChange = (value) => {
    setFieldValue("line", value);
    setFieldValue("transporter", "");

    dispatch(getTransporterByLineAct(value));
  };
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    let newfile = values.documentImg;
    newfile.splice(0, 0, file);
    if (newfile.length > 2) newfile = newfile.slice(0, 2);
    setFieldValue("documentImg", newfile);
  };

  useEffect(() => {
    dispatch(getLineByUserAct());
    const searchLine = values.line||userLine[0]?._id;
    dispatch(getTransporterByLineAct(searchLine));

    return () => {};
  }, [userLine[0]?._id]);

  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <MainBreadcrumb contentTitle="Đăng ký" />
        </section>
        {/* Main content */}

        <section className="content">
          <form
            onBlur={handleBlur}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
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
                    defaultValue={moment(new Date())}
                  />
                  {errors.dateSign && touched.dateSign && (
                    <Text type="danger">Yêu cầu nhập</Text>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress ">Tuyến</label>
                <Select
                  name="line"
                  size="large"
                  style={{ width: "100%" }}
                  value={values.line}
                  onChange={handleLineChange}
                >
                  {renderLineOption()}
                </Select>
                {errors.line && touched.line && (
                  <Text type="danger">{errors.line}</Text>
                )}
              </div>
              <div className="form-group">
                <label>Số Xe</label>
                <Select
                  name="transporter"
                  size="large"
                  style={{ width: "100%" }}
                  value={values.transporter}
                  onChange={handleTransporterChange}
                >
                  {renderTransporterOption()}
                </Select>
                {errors.transporter && touched.transporter && (
                  <Text type="danger">Số xe</Text>
                )}
              </div>
              <div className="form-group">
                <label>Số Chuyến </label>
                <Input
                  size="large"
                  type="number"
                  name="quantity"
                  value={values.quantity}
                  onChange={(e) => {
                    setFieldValue("quantity", e.target.value);
                  }}
                ></Input>
                {errors.quantity && touched.quantity && (
                  <Text type="danger">{errors.quantity}</Text>
                )}
              </div>
              <div className="form-group">
                <label>Số mất chuyến </label>
                <Input
                  size="large"
                  type="number"
                  name="missQuantity"
                  value={values.missQuantity}
                  onChange={(e) => {
                    setFieldValue("missQuantity", e.target.value);
                  }}
                ></Input>
                {errors.missQuantity && touched.missQuantity && (
                  <Text type="danger">{errors.missQuantity}</Text>
                )}
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
                 {errors.documentImg && touched.documentImg && (
                  <Text type="danger">{errors.documentImg}</Text>
                )}
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
const SignDocumentFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { userLine } = props;
    return {
      id: "",
      dateSign: new Date(),
      line: userLine[0]?._id,
      transporter: null,
      quantity: 15,
      missQuantity: 0,
      documentImg: [],
    };
  },
  validate: (values, props) => {
    const errors={};
    if(values.missQuantity>values.quantity) errors.missQuantity="Số mất chuyến không được lớn hơn số chuyến";
    return errors;
  },
  validationSchema: Yup.object().shape({
    dateSign: Yup.string().required("Ngày không được để trống"),
    line: Yup.string().required("Tuyến không được để trống"),
    transporter: Yup.string().required("Số xe không được để trống"),
    quantity: Yup.number()
      .required("Số chuyến không được để trống")
      .min(1, "Số chuyến phải lớn hơn 0"),
    missQuantity: Yup.number()
      .required("Số lỡ chuyến không được để trống")
      .min(0, "Số lỡ chuyến phải lớn hơn hoặc bằng 0"),
    documentImg: Yup.array()
      .min(1, "Yêu cầu nhập file")
      .required("Yêu cầu nhập file"),
  }),
  handleSubmit: (values, { props }) => {
    const formData = new FormData();
    formData.append("transporter", values.transporter);
    formData.append("dateSign", values.dateSign);
    formData.append("line", values.line);
    formData.append("quantity", values.quantity);
    formData.append("missQuantity", values.missQuantity);
    for (let i = 0; i < values.documentImg.length; i++) {
      formData.append("documentImg", values.documentImg[i]);
    }

    props.dispatch(addSignDocumentAct(formData));
  },

  displayName: "SignDocumentForm",
})(SignDocumentAdd);
const mapStateToProps = (state) => {  
  return {
    userLine: state.LineReducer.userLine,
  };
};
export default connect(mapStateToProps)(SignDocumentFormik);
