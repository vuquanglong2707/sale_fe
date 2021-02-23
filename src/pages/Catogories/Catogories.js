import React, { Component } from 'react';
import { Card, Col, Button, Row, notification } from 'antd';
import { connect } from 'react-redux';
import select from '../../utils/select';
import WithPageHOC from '../../hoc/page';
import ROUTER from '../../constants/Router';
import { PlusOutlined } from '@ant-design/icons';
import FilterForm from '../../components/Filter/FilterForm';
import {getCatogories,deleteCatogories,inSertCatogories,updateCatogories} from '../Catogories/redux/action';
import CatogoriesList from './Components/CatogoriesList';
import FormAddCatogories from './Components/FormAddCatogories';
import { withRouter } from 'react-router-dom';
// import FormAddCatogories from './Components/FormAddCatogories';
import _ from 'lodash';


class Catogories extends Component {

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
        props.getCatogories(JSON.parse(params))
      } else {
        props.getCatogories()
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
      this.props.history.push(ROUTER.CATOGORIES.CATOGORIES.concat(`?${urlParameters.join('&')}`))
    } else {
      this.props.history.push(ROUTER.CATOGORIES.CATOGORIES.concat(`?page=${page}&size=${size}`))
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




  search(filter) {
        if (filter) {
            this.props.history.push(ROUTER.CATOGORIES.CATOGORIES.concat(`?query=${filter}`))
        } else {
            this.props.history.push(ROUTER.CATOGORIES.CATOGORIES)
            this.props.getCatogories()
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
        await this.props.getCatogories()
        this.setState({
          showModal:  !this.state.showModal
        });
    };
    

    onDelete = (data) => {
        let pramas ={id: data.id}
        this.props.deleteCatogories(pramas, {
            onSuccess: () => {
                notification.success({ message: `Đã xoá thành công  #${data.title} ` });
                this.props.getCatogories();
            },
            onError: error => notification.error({ message: `${error} - xoá #${data.title}` }),
          })
    }

  render() {
      const { isFetching, meta, CatogoriesData } = this.props;
      console.log(CatogoriesData)
    return (
        <Card title="Loại sản phẩm" style={{ borderRadius: 5 }}>
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
                        <PlusOutlined /> Thêm loại sản phẩm
                    </Button>
                    <FormAddCatogories
                        visible = {this.state.showModal}
                        onClose={this.onClose}
                        dataEdit = {this.state.dataEdit}
                        type={this.state.type}
                    />
                </Col>
            </Row>
            <br />
            <CatogoriesList
                CatogoriesData={CatogoriesData}
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
    CatogoriesData: select(state, 'catogoriesReducer', 'items'),
    isFetching: select(state, 'catogoriesReducer', 'isFetching'),
    meta: select(state, 'catogoriesReducer', 'meta'),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getCatogories: (filterOptions) => {
      dispatch(getCatogories(filterOptions));
    },
    updateCatogories: (payload, meta) => {
      dispatch(updateCatogories(payload, meta));
    },
      deleteCatogories: (pramas, meta) => {
        dispatch(deleteCatogories(pramas, meta));
    }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Catogories));
// export default connect(mapStateToProps, mapDispatchToProps)(WithPageHOC('catogories', 'data')(Catogories));
