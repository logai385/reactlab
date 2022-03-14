import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;
const FooterContent = () => {
  return (
    <Footer>
      <footer className="main-footer">
        <strong>
          Copyright © 2022-2030 <a href="/">QLT</a>.
        </strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 1.0.0
        </div>
      </footer>
    </Footer>
  );
};
export default FooterContent;
