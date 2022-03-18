import React, { useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { Input, Select } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import { getLineListAct } from "../../redux/line/LineAction";
import { setSubmitAct } from "../../redux/modal/ModalAction";
import {
  addTransporterAct,
  postTransporterAct,
} from "../../redux/transporter/TransporterAction";

const { Option } = Select;

const TransporterForm = (props) => {
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
  const lineList = useSelector((state) => state.LineReducer.lineList);

  useEffect(() => {
    dispatch(getLineListAct());
    dispatch(setSubmitAct(handleSubmit));

    return () => {};
  }, []);
  // const handleNameChange = (e) => {
  //   // console.log(e);
  //   let { value } = e.target;
  //   value = value.toUpperCase().replace(/[^A-Z0-9]/, "");
  // };

  const renderLineList = () => {
    return lineList.map((line, index) => {
      const { _id, lineNumber } = line;
      return (
        <Option key={index} value={_id}>
          {lineNumber}
        </Option>
      );
    });
    
  };
  const handleLineChange = (value, target) => {
    setFieldValue(target, value);
  };

  return (
    <>
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content">
          <div className="d-flex justify-content-center">
            <div className="col-12">
              <div className="card card-success">
                <div className="card-header mb-4">
                  <h5 className="card-title mb-0">Bus</h5>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form onBlur={handleBlur} onChange={handleChange}>
                  <input type="hidden" name="id" value={values.id} />

                  <div className="card-body">
                    <div className="form-group">
                      <label>Biển số</label>
                      <Input
                        size="large"
                        style={{ width: "100%" }}
                        name="plate"
                        value={values.plate}
                      />
                      {errors.plate && touched.plate ? (
                        <p className="text-danger">{errors.plate}</p>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label>Tuyến chính</label>
                      <Select
                        name="mainLines"
                        size="large"
                        mode="multiple"
                        style={{ width: "100%" }}
                        value={values.mainLines}                   
                        onChange={(values) =>
                          handleLineChange(values, "mainLines")
                        }
                      >
                        {renderLineList()}
                      </Select>
                    </div>
                    <div className="form-group">
                      <label>Tuyến tăng cường</label>
                      <Select
                        name="minorLines"
                        mode="multiple"
                        style={{ width: "100%" }}
                        size="large"
                        value={values.minorLines}
                        onChange={(values) =>
                          handleLineChange(values, "minorLines")
                        }
                      >
                        {renderLineList()}
                      </Select>
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
const TransporterFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { editingTransporter } = props;    
    return {
      id: editingTransporter.id,
      plate: editingTransporter.plate,
      mainLines: editingTransporter.mainLines,
      minorLines: editingTransporter.minorLines,
    };
  },
  validationSchema: Yup.object().shape({
    plate: Yup.string().required("Biển số không được để trống"),
  }),
  handleSubmit: (values, { props }) => {
    console.log(values);
    if (values.id) {
      props.dispatch(postTransporterAct(values));
    } else {
      props.dispatch(addTransporterAct(values));
    }
  },
})(TransporterForm);
const mapStateToProps = (state) => {
  return {
    editingTransporter: state.TransporterReducer.editingTransporter,
  };
};
export default connect(mapStateToProps)(TransporterFormik);
