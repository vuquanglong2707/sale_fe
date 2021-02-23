import {
  DollarOutlined, ShopFilled, SignalFilled,FileAddOutlined,
  FileDoneOutlined ,  UserOutlined,
  UserSwitchOutlined,PieChartOutlined
} from "@ant-design/icons";

import { Image, Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import ROUTER from '../../constants/Router';
import React from "react";
import "antd/dist/antd.css";
const { Sider } = Layout;
class SideBarComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
      nameOfContent: ""
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <>
            {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
                })} */}
        <Sider
          width={200}
          // className="site-layout-background"
          trigger={null}
          
          collapsed={this.state.collapsed}
        >
          <div className="logo" >
            <Image
              src={require("../../assets/banner.jpg")}
              style={{ height: "150px", borderRight: 0 }}
              preview={false}
            />
          </div>
    
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            inlineCollapsed={this.state.collapsed}
          >
            
            <Menu.Item style={{ textAlign: "left" }} key="2" icon={<SignalFilled />} >
              <Link to={ROUTER.HOME}>Thông tin shop</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ShopFilled />} >
            <Link to={ROUTER.CATOGORIES.CATOGORIES} >  Danh mục sản phẩm</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<DollarOutlined />} >
            <Link to={ROUTER.PRODUCTS.PRODUCTS} >  Sản phẩm</Link>
            </Menu.Item>
            <Menu.Item key="́5" icon={<FileAddOutlined />}>
            <Link to={ROUTER.TIKETDETAIL.TIKETDETAIL} >  Phiếu nhập kho</Link>
            </Menu.Item>
            <Menu.Item key="́6" icon={<FileDoneOutlined />}>
            <Link to={ROUTER.ORDERDETAIL.ORDERDETAIL} >  Hóa đơn</Link>
            </Menu.Item>
            <Menu.Item key="́7" icon={<UserOutlined />}>
            <Link to={ROUTER.CUSTOMER.CUSTOMER} >  Khách hàng</Link>
            </Menu.Item>
            <Menu.Item key="́8" icon={<UserSwitchOutlined />}>
            <Link to={ROUTER.SUPPLIER.SUPPLIER} > Nhà cung cấp</Link>
            </Menu.Item>
            <Menu.Item key="́9">
            <PieChartOutlined />Thống kê báo cáo
            </Menu.Item>

          </Menu>
          
        </Sider>
      </>
    );
  }
}

export default SideBarComponent;
