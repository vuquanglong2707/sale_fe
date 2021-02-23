import { Card, Form, Row, Col, Input, Button, Upload, message, notification,Cascader,Select } from 'antd';
import React, { Component } from 'react'
import select from '../../utils/select';
import {InsertShopInfo, getShopById} from './redux/action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Router from '../../constants/Router';
import WithLoadingHOC from '../../hoc/loading';
import { UploadOutlined } from '@ant-design/icons';
import { HEADERS } from '../../constants/api';
import { API_URL } from '../../utils/Config';
import { beforeUpload } from '../../constants/ConvertImage';

class HomeComponents extends Component {
    
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
            shopInfoDetails: null,
           
        }
    }

    componentDidMount = async () => {
        await this.getData(null);
    }


    getData = (pramas) => {
        this.props.getShopById();
    }

    componentWillReceiveProps(nextStates) {
        if (nextStates && nextStates.shopInfoDetails) {
            const shopInfoDetails = nextStates.shopInfoDetails;
            // const { image } = this.state;
            this.setState({
                imageUrl: shopInfoDetails.image,
                shopInfoDetails: shopInfoDetails,
                
            });
           
            // const { imageUrl } = this.state;
            this.formRef.current.setFieldsValue({
                
                title: shopInfoDetails.title,
                manager: shopInfoDetails.manager,
                phone: shopInfoDetails.phone,
                email: shopInfoDetails.email,
                district_id: shopInfoDetails.district_id,
                province_id: shopInfoDetails.province_id,
                ward_id: shopInfoDetails.ward_id,

            });
        }
    }


    onFinish = (value) => {
        const { imageUrl, shopInfoDetails } = this.state;
        const shopInfo = {
            id: this.props.shopInfoDetails.id,
            title: value.title,
            manager: value.manager,
            phone: value.phone,
            email: value.email,
            image: imageUrl.length > 0 ? imageUrl : '',
            district_id: value.province_id,
            province_id: value.district_id ,
            ward_id: value.ward_id ,
        };
        this.props.InsertShopInfo(shopInfo,
            {
                onSuccess: () => {
                    notification.open({ message: shopInfoDetails !== null ?  `cập nhật thành công thông tin shop ${shopInfoDetails.title}`:'Thêm thành công shop'});
                    this.props.history.push(Router.LISTTEMPLATES);
                },
                onError: error => notification.error({ message: `${error} - Thêm thất bại` }),
            })

    }

    handleChange = info => {
        let file = info.file;
        const { status } = info.file;
        if (status === 'done') {
            file.url = file.response.data[0];
            this.setState({ imageUrl: file.response.data[0] });
            message.success(`${info.file.name} tải ảnh lên thành công .`);
            return file;
        } else if (status === 'error') {
            message.error(`${info.file.name} cập nhật ảnh thất bại.`);
        }
       
    };

    render() {
        const { imageUrl, shopInfoDetails } = this.state;
        // console.log("image" +imageUrl)
        return (
            
            <Card>
                <h1 style={{ textAlign: 'center' }}>
                    {shopInfoDetails !== null ? `Cập nhật thông tin shop ${shopInfoDetails.title}` : 'Tạo mới shop'}
                </h1>
                <Form
                    id='usersystem-form'
                    layout="vertical"
                    hideRequiredMark
                    ref={this.formRef}
                    onFinish={this.onFinish}
                >
                    <Row>
                        <Col span={16}>
                            <Row gutter={16}>
                                <Col span={12} >
                                    <Form.Item 
                                        name="title"
                                        label="Tên shop"
                                        rules={[{ required: true, message: 'xin kiểm tra lại tên shop' }]}
                                    >
                                        <Input
                                            style={{ borderRadius: "5px" }}
                                            type="text"
                                            placeholder="mời nhập tên shop"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item 
                                        name="manager"
                                        label="Quản lý cửa hàng"
                                        rules={[{ required: true, message: 'xin kiểm tra lại tên quản lý của hàng' }]}
                                    >
                                        <Input
                                            style={{ borderRadius: "5px" }}
                                            type="text"
                                            placeholder="mời nhập tên quản lý của hàng"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="phone"
                                        label="Số điện thoại của shop"
                                        rules={[{ required: true, message: 'xin kiểm tra lại số điện thoại của shop' }]}
                                    >
                                        <Input
                                            style={{ borderRadius: "5px" }}
                                            placeholder="mời  nhập số điện thoại của shop"
                                            type="phone"
                                        />
                                    </Form.Item>
                                </Col>  
                                <Col span={12}>
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[{ required: true, message: 'mời nhập email' }]}
                                    >
                                        <Input
                                            style={{ borderRadius: "5px" }}
                                            type="email"
                                            placeholder="mời nhập email"
                                        />
                                    </Form.Item>
                                </Col>   
                                <Col span={12}>
                                    <Form.Item
                                        name="province_id"
                                        label="Tỉnh/Thành phố"
                                        rules={[{ required: true, message: 'xin kiểm tra địa chỉ shop' }]}
                                        >
                                        <Input
                                            style={{ borderRadius: "5px" }}
                                            placeholder="Nhập thành phố của bạn"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="district_id"
                                        label="Quận/Huyện"
                                        >
                                        <Input style={{ borderRadius:"5px"}} placeholder="Nhập quận huyện của bạn" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="ward_id"
                                        label="Xã/ Phường"
                                    >
                                        <Input
                                            style={{ borderRadius:"5px" }}
                                            placeholder="Nhập xã phường của bạn"
                                        />
                                    </Form.Item>
                                </Col>  
                            </Row>
                        </Col>
                        <Col span={8} > 
                            <h1 style={{ textAlign: 'center' }}>logo Shop </h1>
                            <Row style={{ justifyContent: 'center' }}>
                                <Form.Item name="image" >
                                    <img
                                        src={ imageUrl ? `${API_URL}${imageUrl}` : ''}
                                        style={{
                                            height: 240,
                                            width: 240,
                                            borderRadius: '50%'
                                        }}
                                        alt="imageshop"
                                    />
                                </Form.Item>
                            </Row>
                            <Row style={{ justifyContent: 'center', padding: "30px" }}>
                                <Upload
                                    showUploadList={false}
                                    action={`${API_URL}/upload/shop/logo`}
                                    headers={HEADERS.JWT_HEADER()}
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                    
                                </Upload>
                            </Row>
                        </Col>
                    </Row>
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                        >
                        <Button
                            style={{
                                backgroundColor: '#40a9ff',
                                borderRadius: 5,
                                border: "#00d084",
                                marginRight: 8
                            }}
                                type="primary"
                                htmlType="submit"
                        >
                            OK
                        </Button>
                    </div> 
                </Form>
            </Card>
        )
    }
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        getShopById: () => {
            dispatch(getShopById());
        },
        InsertShopInfo:(payload,meta) => {
            dispatch(InsertShopInfo(payload, meta));
        }

    }
}


const mapStateToProps = (state) => {
    return { 
        // accountDetails: select(state, 'authReducer', 'accountDetails'),
        shopInfoDetails: select(state, 'shopInfoReducer', 'shopInfoDetails'),
        error:  select(state, 'shopInfoReducer','error')
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeComponents));
