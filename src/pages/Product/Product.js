import React, { Component } from 'react';
import { Card, Col, Button, Row, notification } from 'antd';
import { connect } from 'react-redux';
import select from '../../utils/select';
import WithPageHOC from '../../hoc/page';
import ROUTER from '../../constants/Router';
import { PlusOutlined } from '@ant-design/icons';
import FilterForm from '../../components/Filter/FilterForm';
import { withRouter } from 'react-router-dom';
import { getProductOfShop,inSertProduct,deleteProduct,updateProduct} from '../Product/redux/action';
import FormAddProduct from './Components/FormAddProduct';
import FormDetail from './Components/FormDetail';
import ProductList from './Components/ProductList';
import _ from 'lodash';


class Product extends Component {

  constructor(props) {
    super(props)
    this.state = {
        filterOptions:{},
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
        props.getProductOfShop(JSON.parse(params))
      } else {
        props.getProductOfShop()
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
      this.props.history.push(ROUTER.PRODUCTS.PRODUCTS.concat(`?${urlParameters.join('&')}`))
    } else {
      this.props.history.push(ROUTER.PRODUCTS.PRODUCTS.concat(`?page=${page}&size=${size}`))
    }
  }


  // onChangeStatus = (id, value) => {
  //   const payload = { id: id, status: !value };
  //   this.props.updateStatus(payload, {
  //     onSuccess: () => {
  //       notification.success({ message: `Đã cập nhật trạng thái cho UserID #${id} ` });
  //     },
  //     onError: error => notification.error({ message: `${error} - Cập nhật thất bại cho UserID  #${id} ` }),
  //   })
  // }




  // onChangePage = (page, size) => {
  //   const { search } = this.props.history.location
  //   if (search !== '') {
  //     let params
  //     const filterOptions = search.split('?')[1]
  //     if (filterOptions !== undefined) {
  //       params = `{"${decodeURI(filterOptions)
  //         .replace(/"/g, '\\"').replace(/&/g, '","')
  //         .replace(/=/g, '":"')}"}`
  //     }

  //     const obj = JSON.parse(params)
  //     params = { ...obj, page, size }
  //     const urlParameters = []
  //     Object.entries(params).forEach(e => {
  //       if (e[1] !== undefined && e[1] !== '') {
  //         urlParameters.push(e.join('='))
  //       }
  //     })
  //     this.props.history.push(ROUTER.USERSYSTEM.concat(`?${urlParameters.join('&')}`))
  //   } else {
  //     this.props.history.push(ROUTER.USERSYSTEM.concat(`?page=${page}&size=${size}`))
  //   }
  // }


  // onChangeStatus = (id, value) => {
  //   const payload = { id: id, status: !value };
  //   this.props.updateProduct(payload, {
  //     onSuccess: () => {
  //       notification.success({ message: `Đã cập nhật trạng thái cho UserID #${id} ` });
  //     },
  //     onError: error => notification.error({ message: `${error} - Cập nhật thất bại cho UserID  #${id} ` }),
  //   })
  // }




  search(filter) {
        if (filter) {
            this.props.history.push(ROUTER.PRODUCTS.PRODUCTS.concat(`?query=${filter}`))
        } else {
            this.props.history.push(ROUTER.PRODUCTS.PRODUCTS)
            this.props.getProductOfShop()
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
        await this.props.getProductOfShop()
        this.setState({
          showModal:  !this.state.showModal
        });
    };
    

    onDelete = (data) => {
        let pramas ={id: data.id}
        this.props.deleteProduct(pramas, {
            onSuccess: () => {
                notification.success({ message: `Đã xoá thành công tài khoản #${data.name} ` });
                this.props.getProductOfShop();
                // this.state = { isLoading: true }
            },
            onError: error => notification.error({ message: `${error} - xoá tài khoản #${data.name}` }),
          })
    }

  render() {
      const { isFetching, meta, product } = this.props;
      console.log(product)
    return (
        <Card title="Người dùng" style={{ borderRadius: 5 }}>
            <Row>
                <Col span={8}>
                    <FilterForm
                      onChange={(e) => this.search(e)}
                    />
                </Col>
                <Col span={8}>

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
                    <FormAddProduct
                        visible = {this.state.showModal}
                        onClose={this.onClose}
                        dataEdit = {this.state.dataEdit}
                        type={this.state.type}
                    />
                    {/* <FormDetail
                        visible = {this.state.showModal}
                        onClose={this.onClose}
                        dataEdit = {this.state.dataEdit}
                        type={this.state.type}
                    /> */}
                </Col>
            </Row>
            <br />
            <ProductList
                product={product}
                onChangePage={this.onChangePage}
                onChangeSize={this.onChangePage}
                isFetching={isFetching}
                onDelete={this.onDelete}
                onChangeStatus={this.onChangeStatus}
                meta={meta}
                onEdit={this.showModal}
            />

        </Card>
        )
    }

}


const mapStateToProps = (state) => {
  return {
    product: select(state, 'productReducer', 'items'),
    isFetching: select(state, 'productReducer', 'isFetching'),
    meta: select(state, 'productReducer', 'meta'),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getProductOfShop: (filterOptions) => {
      dispatch(getProductOfShop(filterOptions));
    },
    updateProduct: (payload, meta) => {
      dispatch(updateProduct(payload, meta));
    },
      deleteProduct: (pramas, meta) => {
        dispatch(deleteProduct(pramas, meta));
    }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
// export default connect(mapStateToProps, mapDispatchToProps)(Product));
