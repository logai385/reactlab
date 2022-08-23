import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { MenuOutlined, AppstoreOutlined } from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import FooterContent from "./Footer/Footer";
import Modal from "../../HOC/Modal";
import { LOCAL_STOGARE_TOKEN_NAME } from "../../ultil/systemSettings";

const { Header, Sider, Content } = Layout;

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.AuthReducer);
  // console.log(user);
  const [state, setState] = useState({
    collapsed: false,
  });
  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/dashboard"
      : location.pathname
  );
  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  function handleClick(e) {
    setCurrent(e.key);
  }
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
          breakpoint="lg"
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

          <Menu
            className="userSection"
            key="menu1"
            mode="vertical"
            selectedKeys={[current]}
            onClick={handleClick}
          >
            <SubMenu
              key="sub1"
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
            >
              <Menu.Item
                key="/login"
                onClick={() => {
                  localStorage.removeItem(LOCAL_STOGARE_TOKEN_NAME);
                  navigate("/login");
                }}
              >
                Thoát
              </Menu.Item>
              {user?.role === "ADMINISTRATOR" && (
                <Menu.Item key="/user">
                  <Link to="/user">DS nhân viên</Link>
                </Menu.Item>
              )}
            </SubMenu>
          </Menu>
          <Menu
            mode="inline"
            defaultSelectedKeys={["/dashboard"]}
            selectedKeys={[current]}
            onClick={handleClick}
          >
            <Menu.Item key="/dashboard">
              <Link to="/dashboard">
                <i className="nav-icon fas fa-tachometer-alt"></i> Thống kê
              </Link>
            </Menu.Item>
            {(user?.role === "ADMINISTRATOR" ||
              user?.role === "SUPERVISOR") && (
              <Menu.Item key="/insp/document">
                <Link to="/insp/document">
                  <i className="nav-icon fa fa-check-double"></i> Nghiệm thu
                </Link>
              </Menu.Item>
            )}
            {user?.role !== "SUPERVISOR" && (
              <>
                <SubMenu
                  key="sub2"
                  icon={<AppstoreOutlined />}
                  title="Quản lý"
                  mode="vertical"
                >
                  {user?.role === "ADMINISTRATOR" && (
                    <>
                      <Menu.Item key="/unit">
                        <Link to="/unit">
                          <i className="nav-icon fa fa-store"></i> DN Vận tải
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="/line">
                        <Link to="/line">
                          <i className="nav-icon fa fa-route"></i> Tuyến
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="/transporter">
                        <Link to="/transporter">
                          <i className="nav-icon fa fa-bus-alt"></i> Xe
                        </Link>
                      </Menu.Item>
                    </>
                  )}
                 
                    <Menu.Item key="/document">
                      <Link to="/document">
                        <i className="nav-icon fa fa-file-alt"></i> Lệnh vận chuyển
                      </Link>
                    </Menu.Item>
                  
                </SubMenu>
              </>
            )}
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
