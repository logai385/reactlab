import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  TeamOutlined,
  MenuOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";

const { Header, Footer, Sider, Content } = Layout;

const Main = () => {
  const [state, setState] = useState({
    collapsed: false,
  });
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  return (
    <>
      <Layout className="mainLayout">
        <Sider
          className="mainSider"
          trigger={null}
          collapsed={state.collapsed}
          breakpoint="md"
          collapsedWidth={0}
          onBreakpoint={(broken) => {
            setState({ collapsed: broken });
          }}
          style={{ width: "250px", maxWidth: "250px" }}
          onCollapse={(collapsed, type) => {
            console.log("onCollapse", collapsed, type);
            // setState({collapsed: true});
          }}
        >
          <div className="brand__link">
            <img src="./logo192.png" alt="logo" />
            <span className="brand-text">Hoàng Giang</span>
          </div>
          <div class="user-panel">
            <div>
              <div className="image">
                <img src="./logo512.png" alt="logo" />
              </div>
              <div className="info">Alexander Pierce</div>
            </div>
          </div>

          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <i class="nav-icon fas fa-tachometer-alt"></i> Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="4" icon={<UploadOutlined />}>
                Tom
              </Menu.Item>
              <Menu.Item key="5">Bill</Menu.Item>
              <Menu.Item key="6">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="7">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <MenuOutlined
              style={{ cursor: "pointer", padding: "8px 0" }}
              onClick={toggle}
            />
          </Header>
          <div className="breadcrumb__path">
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Main;
