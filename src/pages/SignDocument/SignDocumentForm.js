import React, { useEffect } from "react";
import { DatePicker, Input, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";

import { getLineByUserAct } from "../../redux/line/LineAction";
import { setSubmitAct } from "../../redux/modal/ModalAction";
import { getTransporterByLineAct } from "../../redux/transporter/TransporterAction";
import { addSignDocumentAct } from "../../redux/document/DocumentAction";

const { Option } = Select;
const SignDocumentForm = (props) => {
  // Initialize state & action
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
  const transporterByLine = useSelector((state) => state.TransporterReducer.transporterByLine);
  useEffect(() => {
    dispatch(setSubmitAct(handleSubmit));
    dispatch(getLineByUserAct());
    dispatch(getTransporterByLineAct(values.line));

    return () => {};
  }, []);

  // Handle change
  const handleDateChange = (date, dateString) => {
    setFieldValue("dateSign", dateString);
  };

  const handleTransporterChange = (value) => {
    setFieldValue("transporter", value);
  };
  const handleLineChange = (value) => {
    setFieldValue("line", value);
    dispatch(getTransporterByLineAct(value));
    setFieldValue("transporter", "");      
  };
  const handleChangeFile = (e) => {
    const file = e.currentTarget.files[0];
    setFieldValue("documentImg", file);
  };

  // Render fuction
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
  // const handleChangeCustomer=(e)=>{
  //   handleChange(e);
  //   console.log(e);
  // }
  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}

        <section className="content ">
          <div className="d-flex justify-content-center">
            <div className="col-12">
              <div className="card card-success">
                <div className="card-header">
                  <h5 className="card-title mb-0">Đăng ký Xe</h5>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form
                  onBlur={handleBlur}
                  onChange={handleChange}
                  encType="multipart/form-data"
                >
                  <div className="card-body">
                    <input name="id" type="hidden" />
                    <div className="form-row">
                      <div className="form-group col-12">
                        <label>Ngày</label>
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
                        value={values.line}
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
                        value={values.transporter}
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
                        value={values.quantity}
                      ></Input>
                    </div>
                    <div className="form-group">
                      <label>File </label>
                      <Input
                        size="large"
                        type="file"
                        name="documentImg"
                        onChange={handleChangeFile}
                        value={values.documentImg}
                      ></Input>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
const SignDocumentFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { editingDocument, userLine } = props;
    return {
      id: editingDocument.id,
      dateSign: editingDocument.dateSign,
      line: editingDocument.line || userLine[0]?._id,
      transporter: editingDocument.transporter,
      quantity: editingDocument.quantity,
      documentImg: null,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props }) => {
    const formData = new FormData();
 
    formData.append("dateSign", values.dateSign);
    formData.append("transporter", values.transporter);
    formData.append("line", values.line);
    formData.append("quantity", values.quantity);
    formData.append("documentImg", values.documentImg);
    // console.log(formData);
    props.dispatch(addSignDocumentAct(formData));
  },

  displayName: "BasicForm",
})(SignDocumentForm);
const mapStateToProps = (state) => {
  return {
    editingDocument: state.DocumentReducer.editingDocument,
    userLine: state.LineReducer.userLine,
  };
};
export default connect(mapStateToProps)(SignDocumentFormik);
