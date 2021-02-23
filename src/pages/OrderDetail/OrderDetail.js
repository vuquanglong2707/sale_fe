import React, { Component } from 'react';
import { Card, Col, Button, Row, notification } from 'antd';
import { connect } from 'react-redux';
import select from '../../utils/select';
import WithPageHOC from '../../hoc/page';
import ROUTER from '../../constants/Router';
import { PlusOutlined } from '@ant-design/icons';
import FilterForm from '../../components/Filter/FilterForm';
import {getOrderDetail,inSertOrder} from '../OrderDetail/redux/action';
import OrderDetailList from './Components/OrderDetailList';
import FormAddOrderDetail from './Components/FormAddOrderDetail';
import { withRouter } from 'react-router-dom';

import _ from 'lodash';


class TiketDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
        filterOptions: {},
        search: null,
        type: '',
        showModal: false,
        dataEdit: {}

    }
  }
  static getDerivedStateFromProps(props, state) {
    const { search } = props.history.location
    let params
    if (search !== state.search) {
      const filterOptions = search.split('?')[1]
      if (filterOptions !== undefined) {
        params = `{"${decodeURI(filterOptions)
          .replace(/"/g, '\\"').replace(/&/g, '","')
          .replace(/=/g, '":"')}"}`
        props.getOrderDetail(JSON.parse(params))
      } else {
        props.getOrderDetail()
      }
      return { ...state, search, filterOptions: params }
    }
    return state
  }



  onChangePage = (page, size) => {
    const { search } = this.props.history.location
    if (search !== '') {
      let params
      const filterOptions = search.split('?')[1]
      if (filterOptions !== undefined) {
        params = `{"${decodeURI(filterOptions)
          .replace(/"/g, '\\"').replace(/&/g, '","')
          .replace(/=/g, '":"')}"}`
      }

      const obj = JSON.parse(params)
      params = { ...obj, page, size }
      const urlParameters = []
      Object.entries(params).forEach(e => {
        if (e[1] !== undefined && e[1] !== '') {
          urlParameters.push(e.join('='))
        }
      })
      this.props.history.push(ROUTER.ORDERDETAIL.ORDERDETAIL.concat(`?${urlParameters.join('&')}`))
    } else {
      this.props.history.push(ROUTER.ORDERDETAIL.ORDERDETAIL.concat(`?page=${page}&size=${size}`))
    }
  }
  search(filter) {
        if (filter) {
            this.props.history.push(ROUTER.ORDERDETAIL.ORDERDETAIL.concat(`?query=${filter}`))
        } else {
            this.props.history.push(ROUTER.ORDERDETAIL.ORDERDETAIL)
            this.props.getOrderDetail()
        }

    }
    
    showModal = (type, item) => {
        if (type === "update") {
         this.setState({
            showModal: !this.state.showModal,
            type: type, 
            dataEdit: type === "update" ? _.cloneDeep(item) : {}
         });
        } else {
         this.setState({
            showModal: !this.state.showModal,
             type: type,
             dataEdit: null
         });
        }
    };

    onClose = async() => {
        await this.props.getOrderDetail()
        this.setState({
          showModal:  !this.state.showModal
        });
    };
    



  render() {
      const { isFetching, meta, importOrderData } = this.props;
      console.log(importOrderData)
    return (
        <Card title="Người dùng" style={{ borderRadius: 5 }}>
            <Row>
                <Col span={8}>
                    <FilterForm
                      onChange={(e) => this.search(e)}
                    />
                </Col>
                <Col span={8}>
                    {/* <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Danh sách tài khoản</h1> */}
                </Col>
                <Col span={8} style={{textAlign: 'end'}}>
                    <Button
                        style={{
                            // backgroundColor: '#00d084',
                            borderRadius: 5,
                            border: "#00d084"
                        }}
                        type="primary"
                        onClick={() => this.showModal("create", null)}
                    >
                        <PlusOutlined /> Add User
                    </Button>
                    <FormAddOrderDetail
                        visible = {this.state.showModal}
                        onClose={this.onClose}
                        dataEdit = {this.state.dataEdit}
                        type={this.state.type}
                    />
                </Col>
            </Row>
            <br />
            <OrderDetailList
                importOrderData={importOrderData}
                onChangePage={this.onChangePage}
                onChangeSize={this.onChangePage}
                isFetching={isFetching}
                onDelete={this.onDelete}
                // onChangeStatus={this.onChangeStatus}
                meta={meta}
                onEdit={this.showModal}
            />

        </Card>
        )
    }

}


const mapStateToProps = (state) => {
  return {
    importOrderData: select(state, 'orderDetailReducer', 'items'),
    isFetching: select(state, 'orderDetailReducer', 'isFetching'),
    meta: select(state, 'orderDetailReducer', 'meta'),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getOrderDetail: (filterOptions) => {
      dispatch(getOrderDetail(filterOptions));
    },

  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TiketDetail));

