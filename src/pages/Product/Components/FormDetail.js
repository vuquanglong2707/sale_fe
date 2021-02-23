import {
    Col, Form,
    Input,
    Modal, notification, Row, Switch,Select,Upload,Button , message,uploadButton
} from 'antd';
import React, { Component } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { HEADERS } from '../../../constants/api'; 
import { API_URL } from '../../../utils/Config';
import select from '../../..//utils/select';
import { connect } from 'react-redux';
import { beforeUpload } from '../../../constants/ConvertImage';
import { inSertProduct,updateProduct } from '../redux/action';
const { Option } = Select;

class FormDetail extends Component {

    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            fileList: [],
        }

    }
    
    componentDidUpdate() {
        if (this.props.type === "update" && this.props.dataEdit !== null) {
            const data = this.props.dataEdit;
            this.formRef.current.setFieldsValue({
                name: data.name,
                sku: data.sku,
                createdBy: data.createdBy,
                modifiedBy: data.createdBy,
                barCode: data.barCode,
                qrCode: data.qrCode,
                content: data.content,
                price: data.price,
                salePrice: data.salePrice,
                descs: data.descs,
                // images:data.images[0],
                quantitySold: data.quantitySold,
                quantityCurrent: data.quantityCurrent,
                unitsTitle: data.unitsTitle,
                productCategoriesName:data.productCategoriesName,
                active: data.active ,
                isActive: data.isActive,
            })
        }
        // else {
        //     this.formRef.current.resetFields();
        // }
    }

    // handleChange = info => {
    //     let fileList = [...info.fileList];
    //     let urlList = [];
    //     const { status } = info.file;
    //     if (status === 'done') {
    //         fileList.map(file => {
    //             if (file.response) {
    //                 file.url = file.response.data[0];
    //                 urlList.push(file.url);
    //             }
    //             return file;
    //         });
    //         this.setState({ fileList : urlList});
    //         message.success(` tải ảnh lên thành công .`);
    //     } else if (status === 'error') {
    //         message.error(` cập nhật ảnh thất bại.`);
    //     }
       
    // };

    // handleOk = (value) => {
    //     const { fileList, checked } = this.state;
    //     const payload = {
    //         name: value.name,
    //         sku: value.sku,
    //         createdBy: value.createdBy,
    //         createdDate: '',
    //         modifiedBy: value.createdBy,
    //         modifiedDate: '',
    //         barCode: value.barCode,
    //         qrCode: value.qrCode,
    //         content: value.content,
    //         price: value.price,
    //         salePrice: value.salePrice,
    //         descs: value.descs,
    //         quantitySold: value.quantitySold,
    //         quantityCurrent: value.quantityCurrent,
    //         unitsTitle: value.unitsTitle,
    //         images: fileList.length > 0 ? fileList : [],
    //         productCategoriesName:value.productCategoriesName,
    //         active: value.active ? value.active : false,
    //         isActive: value.isActive ? value.isActive : false,
    //     }
    //     if(this.props.type==="update"){
    //         this.props.updateProduct({ ...payload, id: this.props.dataEdit.id }, {
    //             onSuccess: () => {
    //                 notification.open({ message: `Đã cập nhật thành công tài khoản #${this.props.dataEdit.name} ` });
    //                 this.handleCancel();
    //             },
    //             onError: error => notification.error({ message: `${error} - Cập nhật thất bại tài khoản #${this.props.dataEdit.name}  ` }),
    //         })
    //     }
    //     else{
    //         this.props.inSertProduct(payload,
    //             {
    //                 onSuccess: () => {
    //                     notification.open({ message: 'Thêm thành công' });
    //                     this.handleCancel();
    //                 },
    //                 onError: error => notification.error({ message: `${error} - Thêm thất bại` }),
    //         })
    //     }
        
    //     this.formRef.current.resetFields();
    // };

    handleCancel = () => {
        this.props.onClose();
    };

    render() {
        const { fileList } = this.state;
        return (
            <>
                <Modal
                 
                    title= "cập nhật thông tin sản phẩm "
                    onCancel={this.handleCancel}
                    visible={this.props.visible}
                    // okButtonProps={this.handleCancel}
                    // okType="primary"
                >
                    <Form
                        id='usersystem-form'
                        layout="vertical"
                        hideRequiredMark
                        ref={this.formRef}
                        // onFinish={this.handleOk}
                    >
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="sku"
                                    label="Sku"
                                    rules={[{ required: true, message: 'Please enter sku' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter sku" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Tên"
                                    rules={[{ required: true, message: 'Please enter name' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter name" />
                                </Form.Item>
                            </Col>

                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>

                                <Form.Item
                                    name="barCode"
                                    label="Bar Code"
                                    rules={[{ required: true, message: 'Please enter barCode' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter barCode" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="qrCode"
                                    label="QRCode"
                                    rules={[{ required: true, message: 'Please enter qrCode' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter qrCode" />
                                </Form.Item>

                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="content"
                                    label="Nội dung"
                                    rules={[{ required: true, message: 'Please enter content ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter content" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="price"
                                    label="Gía"
                                    rules={[{ required: true, message: 'Please enter price' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter price" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="descs"
                                    label="Mô tả"
                                    rules={[{ required: true, message: 'Please enter descs ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter descs" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="productCategoriesName"
                                    label="Loại sản phẩm"
                                    rules={[{ required: true, message: 'Please enter unitsTitle ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter unitsTitle" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="createdBy"
                                    label="Người tạo"
                                    rules={[{ required: true, message: 'Please enter Người tạo' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter Người tạo" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="unitsTitle"
                                    label="Đơn vị"
                                    rules={[{ required: true, message: 'Please enter unitsTitle ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter unitsTitle" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="quantitySold"
                                    label="Số lượng đã bán"
                                    rules={[{ required: true, message: 'Please enter quantitySold' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter quantitySold" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="quantityCurrent"
                                    label="Số lượng hiện tại"
                                    rules={[{ required: true, message: 'Please enter quantityCurrent ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter quantityCurrent" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="salePrice"
                                    label="giá khuyến mãi"
                                    rules={[{ required: true, message: 'Please enter salePrice' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter salePrice" />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* <Row gutter={24}>
                            <Col span={24}>
                                <Upload
                                    action={`${API_URL}/upload/product/image`}
                          
                                    headers={HEADERS.JWT_HEADER()}
                                    name="file"
                                    method="POST"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                    onChange={this.handleChangeImage}
                              
                                    listType="picture"
                                    >
                                      
                                    <Button icon={<UploadOutlined 

                                    />}>Upload</Button>
                                </Upload>
                            </Col>
                        </Row> */}
                        <Row gutter={24}>
                            
                            <Col span={6}>
                                <Form.Item
                                    name="isActive"
                                    valuePropName="checked"
                                    label="Kích hoạt"
                                >
                                    <Switch />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="active"
                                    valuePropName="checked"
                                    label="Kích hoạt"
                                >
                                    <Switch />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </>
        );
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

        // inSertProduct: (user, meta) => {
        //     dispatch(inSertProduct(user, meta));
        // },
        // updateProduct: (user, meta) => {
        //     dispatch(updateProduct(user, meta));
        // },
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDetail);
