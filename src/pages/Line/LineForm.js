import { Button, Input, Select } from "antd";
import React, { useEffect } from "react";
import { CheckSquareTwoTone, CloseSquareTwoTone } from "@ant-design/icons";
import { useDispatch, connect } from "react-redux";
import { addLineAct, postLineAct } from "../../redux/line/LineAction";
import { withFormik } from "formik";
import * as Yup from "yup";

import { setSubmitAct } from "../../redux/modal/ModalAction";
const { Option } = Select;
const LineForm = (props) => {
  // Initialize state & action
  const dispatch = useDispatch();

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = props;

  const handleChangeStatus = () => {
    setFieldValue("status", !values.status);
  };

  useEffect(() => {
    dispatch(setSubmitAct(handleSubmit));
    return () => {};
  }, []);

  return (
    <>
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content">
          <div className="d-flex justify-content-center">
            <div className="col-12">
              <div className="card card-success">
                <div className="card-header mb-4">
                  <h5 className="card-title mb-0">Tuyến</h5>
                </div>
                {/* /.card-header */}
                {/* form start */}

                <form onBlur={handleBlur} onChange={handleChange}>
                  <input type="hidden" name="id" value={values.id} />
                  <div className="card-body">
                    <div className="form-group">
                      <label>Tuyến Số</label>
                      <Input
                        size="large"
                        style={{ width: "100%" }}
                        name="lineNumber"
                        value={values.lineNumber}
                      />
                      {errors.lineNumber && touched.lineNumber ? (
                        <p className="text-danger">{errors.lineNumber}</p>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label>Mô tả</label>
                      <Input
                        size="large"
                        type="text"
                        name="description"
                        value={values.description}
                      />
                    </div>

                    <Button
                      type="link"
                      className="my-2"
                      onClick={handleChangeStatus}
                    >
                      <span
                        style={{
                          lineHeight: "20px",
                          color: "black",
                          fontWeight: "bold",
                        }}
                        className="mr-1"
                      >
                        Tráng thái :
                      </span>
                      {values.status ? (
                        <CheckSquareTwoTone style={{ fontSize: "25px" }} />
                      ) : (
                        <CloseSquareTwoTone
                          twoToneColor="#eb2f96"
                          style={{ fontSize: "25px" }}
                        />
                      )}
                    </Button>
                  </div>
                  {/* /.card-body */}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
const LineFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { editingLine } = props;
    return {
      id: editingLine.id,
      lineNumber: editingLine.lineNumber,
      description: editingLine.description,

      status: editingLine.status,
    };
  },
  validationSchema: Yup.object().shape({
    lineNumber: Yup.string().required("Nhập số tuyến!"),
  }),
  handleSubmit: (values, { props }) => {
    console.log(values);
    if (values.id !== "") {
      props.dispatch(postLineAct(values));
    } else {
      props.dispatch(addLineAct(values));
    }
  },
})(LineForm);

const mapStateToProps = (state) => {
  return {
    editingLine: state.LineReducer.editingLine,
  };
};
export default connect(mapStateToProps)(LineFormik);
