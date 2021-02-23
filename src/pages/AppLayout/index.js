import React from 'react';
import SideBarComponent from "../../components/SideBar/sideBar";
import HeaderComponent from '../../components/Header/header';
import FooterComponent from '../../components/Footer/footer';
import {  Redirect, Route, Switch, withRouter  } from 'react-router-dom';
import { Layout } from 'antd';
import ROUTER from '../../constants/Router';
import changePassword from '../auth/ChangePassword';
import AuthDetail from '../auth/AuthDetail';
import Product from '../Product/Product';
import Catogories from '../Catogories/Catogories';
import TiketDetail from '../TiketDetail/TiketDetail';
import OrderDetail from '../OrderDetail/OrderDetail';
import Customer from '../Customer/Customer';
import Supplier from '../Supplier/Supplier';
// import AddPro from '../Product/components/AddPro';
import HomeComponents from '../Home/Shop';
import WithAuthenticationHOC from '../../hoc/authenticate';

const { Footer, Sider, Content } = Layout;

function AppLayout() {
  return (
    <>
      < Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <SideBarComponent />
        </Sider>
        <Layout className="site-layout">
          <HeaderComponent />
          <Content style={{ padding: 20 }}>         
            <Switch>
              <Route path={ROUTER.ACCOUNT.PASSWORD} component={changePassword} exact />
              <Route path={ROUTER.HOME} component={HomeComponents}  exact/>
              <Route path={ROUTER.ACCOUNT.AUTHDETAIL} component={AuthDetail} exact />
              <Route path={ROUTER.PRODUCTS.PRODUCTS} component={Product} exact />
              <Route path={ROUTER.CATOGORIES.CATOGORIES} component={Catogories} exact />
              <Route path={ROUTER.TIKETDETAIL.TIKETDETAIL} component={TiketDetail} exact />
              <Route path={ROUTER.ORDERDETAIL.ORDERDETAIL} component={OrderDetail} exact />
              <Route path={ROUTER.CUSTOMER.CUSTOMER} component={Customer} exact />
              <Route path={ROUTER.SUPPLIER.SUPPLIER} component={Supplier} exact />
              <Redirect from="*" to={ROUTER.HOME} />
              
            </Switch>
          </Content>
          <Footer>
            <FooterComponent />
          </Footer>
        </Layout>
      </Layout>  
    </>
  );  
}

export default  WithAuthenticationHOC(true)(withRouter(AppLayout));
