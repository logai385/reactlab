import React, { useState } from "react";
import {
  Drawer,
  Button,  
  Space,
} from "antd";

import { useSelector, useDispatch } from "react-redux";
import { HIDE_MODAL } from "../redux/modal/ModalConst";
export default function Modal() {
  const dispatch = useDispatch();
  const { visible, ComponentContent, callBackSubmit } = useSelector(
    (state) => state.ModalReducer
  );

  const onClose = () => {
    dispatch({ type: HIDE_MODAL });
  };
  return (
    <>
      <Drawer
        className="modal__drawer"
        title="Add/Update"
        
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}

        extra={
            <Space>
              <Button onClick={onClose}><i className="fa fa-angle-double-left"></i></Button>
              <Button onClick={callBackSubmit} type="primary">
                Submit
              </Button>
            </Space>
          }
      >
        {ComponentContent}
      </Drawer>
    </>
  );
}
