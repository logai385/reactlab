import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuOutlined,
  AppstoreOutlined,  
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link, Outlet,useNavigate  } from "react-router-dom";
import { useSelector } from "react-redux";
import FooterContent from "./Footer/Footer";
import Modal from "../../HOC/Modal";
import { LOCAL_STOGARE_TOKEN_NAME } from "../../ultil/systemSettings";

const { Header, Sider, Content } = Layout;

const Main = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.AuthReducer);
  const [state, setState] = useState({
    collapsed: false,
  });
  const toggle = () => {
    setState({ ...state, collapsed: !state.collapsed });
  };
  return (
    <>
      <Layout className="mainLayout">
        <Sider
          width="220"
          className="mainSider"
          trigger={null}
          collapsed={state.collapsed}
          breakpoint="md"
          collapsedWidth={0}
          onBreakpoint={(broken) => {
            setState({ collapsed: broken });
          }}
          onCollapse={(collapsed, type) => {
            // console.log("onCollapse", collapsed, type);
            // // setState({collapsed: true});
          }}
        >
          <div className="brand__link">
            <img src="./img/logo.png" alt="logo" />
            <span className="brand-text">Quản lý Tuyến</span>
          </div>
          {/* <div className="user-panel">
            <div>
              <div className="image">
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.username}`}
                  alt="avatar"
                />
              </div>
              <div className="info">{user?.username}</div>
            </div>
          </div> */}
          <Menu mode="vertical" className="userSection" key="menu1">
            <SubMenu
              key="sub2"
              icon={
                <div className="user-panel">
                  <div>
                    <div className="image">
                      <img
                        src={`https://ui-avatars.com/api/?name=${user?.name}`}
                        alt="avatar"
                      />
                    </div>
                    <div className="info">{user?.name}</div>
                  </div>
                </div>
              }
              mode="vertical"
            >
              <Menu.Item key="sub2_1" onClick={()=>{
                localStorage.removeItem(LOCAL_STOGARE_TOKEN_NAME);
                navigate("/login");
              }}>Thoát</Menu.Item>
              <Menu.Item key="sub2_2">
              <Link to="/user" >
               DS nhân viên
              </Link>
              
              </Menu.Item>
            </SubMenu>
          </Menu>
          <Menu mode="inline" defaultSelectedKeys={null}  key="menu2">
            <Menu.Item key="1">
              <Link to="/dashboard" key="1">
                <i className="nav-icon fas fa-tachometer-alt"></i> Dashboard
              </Link>
            </Menu.Item>

            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Quản lý">
              <Menu.Item key="sub1_4">
                <Link to="/unit">
                  <i className="nav-icon fa fa-bus"></i> Đại lý
                </Link>
              </Menu.Item>
              <Menu.Item key="sub1_1">
                <Link to="/line">
                  <i className="nav-icon fa fa-route"></i> Tuyến
                </Link>
              </Menu.Item>
              <Menu.Item key="sub1_2">
                <Link to="/transporter">
                  <i className="nav-icon fa fa-bus-alt"></i> Xe
                </Link>
              </Menu.Item>
              <Menu.Item key="sub1_3">
                <Link to="/document">
                  <i className="nav-icon fa fa-file-alt"></i> Giấy phép
                </Link>
              </Menu.Item>
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

          <Content>
            <Outlet />
          </Content>
          <FooterContent />
        </Layout>
      </Layout>
      <Modal />
    </>
  );
};

export default Main;
