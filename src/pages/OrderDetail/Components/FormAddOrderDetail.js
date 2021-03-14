import {
    Col, Form,
    Input,
    Modal, notification, Row, Switch
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inSertOrder} from '../redux/action';
import select from '../../../utils/select'; 

class FormAddOrderDetail extends Component {

    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {}

    }
    componentDidUpdate() {
        if (this.props.type === "update" && this.props.dataEdit !== null) {
            const data = this.props.dataEdit;
            this.formRef.current.setFieldsValue({
                cash_money: data.cash_money,
                discount_money: data.cash_money,
                discount_percent: data.discount_percent,
                codeOrder:data.codeOrder,
                paid_money: data.paid_money,
                total_money:data.total_money,
                address: data.address,
                district_id: data.district_id,
                province_id: data.province_id,
                ward_id: data.ward_id,
                order_status: data.order_status,
                createBy: data.createdBy,
                createdDate: "2021-02-02T09:41:53.000+0000",
                modified_by: data.modified_by,
                modifiedDate: "2021-02-02T09:42:00.000+0000",
                customer_name:data.customer_name,
                customer_phone:data.customer_phone,
                quantity: data.dtoOrderDetails[0].quantity,
                variation: data.dtoOrderDetails[0].variation,
                productId: data.dtoOrderDetails[0].productId,
                property: data.dtoOrderDetails[0].property
               
            })
        }
    }

    handleOk = (value) => {
        const payload = {
            cash_money: value.cash_money,
            discount_money: value.cash_money,
            discount_percent: value.discount_percent,
            codeOrder:value.codeOrder,
            paid_money: value.paid_money,
            total_money:value.total_money,
            address: value.address,
            district_id: value.district_id,
            province_id: value.province_id,
            ward_id: value.ward_id,
            order_status: value.order_status,
            createdBy: value.createBy,
            createdDate: "2021-02-02T09:41:53.000+0000",
            modified_by: value.modified_by,
            modifiedDate: "2021-02-02T09:42:00.000+0000",
            customer_name:value.customer_name,
            customer_phone:value.customer_phone,
            dtoOrderDetails: [{
                quantity: value.quantity,
                productId: value.productId,
                variation:"Size",
                property:"22"
            }],
        }

        if (this.props.type === "update") {
            this.props.onClose();
        } else {
            this.props.inSertOrder({ ...payload }, {
                onSuccess: () => {
                    notification.success({ message: `Thêm mới thành công ` });
                    this.handleCancel();
                },
                onError: error => notification.error({ message: `${error} - Thêm mới thất bại` }),
            })
        }
        this.formRef.current.resetFields();
    };

    handleCancel = () => {
        this.props.onClose();
    };

    render() {
        return (
            <>
                <Modal
                    title={this.props.type === 'update' ? `Thông tin đơn nhập ${this.props.dataEdit.codeOrder}` : "Tạo mới phiếu nhập"}
                    onCancel={this.handleCancel}
                    visible={this.props.visible}
                    okButtonProps={{ form: 'usersystem-form', key: 'submit', htmlType: 'submit' }}
                    okType="primary"
                >
                    <Form
                        id='usersystem-form'
                        layout="vertical"
                        hideRequiredMark
                        ref={this.formRef}
                        onFinish={this.handleOk}
                    >
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item
                                    name="cash_money"
                                    label="Tiền mặt"
                                    rules={[{ required: true, message: 'Nhập tiền phải thanh toán' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter tiền thanh toán" />
                                </Form.Item>
                            </Col>


                            <Col span={6}>

                                <Form.Item
                                    label="Tiền chiết khấu"
                                    name="discount_money"
                                    rules={[{ required: true, message: 'Hãy nhập tiền chiết khấu' }]}>
                                    <Input style={{ borderRadius: "5px" }} placeholder="Hãy nhập tiền chiết khấu" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item
                                    name="discount_percent"
                                    label="Phần trăm chiết khấu"
                                    rules={[{ required: true, message: 'Nhập phần trăm chiết khấu' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Nhập phần trăm chiết khấu" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="codeOrder"
                                    label="Mã hóa đơn"
                                    rules={[{ required: true, message: 'Hãy nhập mã hóa đơn' }]}
                                >
                                <Input style={{ borderRadius: "5px" }} placeholder="Hãy nhập mã hóa đơn" />
                                </Form.Item>

                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item
                                    name="paid_money"
                                    label="Tiền đã trả"
                                    rules={[{ required: true, message: 'Tiền đã trả ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Tiền đã trả" />
                                </Form.Item>
                            </Col>
   
                            <Col span={6}>
                                <Form.Item
                                    name="total_money"
                                    label="Tổng tiền"
                                    rules={[{ required: true, message: 'Please enter note ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter note" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="address"
                                    label="Địa chỉ"
                                    rules={[{ required: true, message: 'Please enter địa chỉ ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter địa chỉ" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                    <Form.Item
                                        name="district_id"
                                        label="Quận/huyện"
                                        rules={[{ required: true, message: 'Please enter quận huyện ' }]}
                                    >
                                        <Input style={{ borderRadius: "5px" }} placeholder="Please enter quận huyện" />
                                    </Form.Item>
                                </Col>
                        </Row>
    
 
                        <Row gutter={24}>
         
                            <Col span={6}>
                                <Form.Item
                                    name="province_id"
                                    label="Tỉnh/Thành phố"
                                    rules={[{ required: true, message: 'Please enter tỉnh/ thành phố ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter tỉnh/thành phố" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="ward_id"
                                    label="Xã/Phường"
                                    rules={[{ required: true, message: 'Please enter Xã/Phường ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter Xã/Phường" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="order_status"
                                    label="Order status"
                                    rules={[{ required: true, message: 'Please enter Order status ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter Order status" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
         
                            <Col span={6}>
                                <Form.Item
                                    name="createBy"
                                    label="Người tạo"
                                    rules={[{ required: true, message: 'Please enter người tạo ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter người tạo" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="modified_by"
                                    label="người xác nhận"
                                    rules={[{ required: true, message: 'Please enter nguồi xác nhận ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter người xác nhận" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="customer_name"
                                    label="Tên khách hàng"
                                    rules={[{ required: true, message: 'Please enter Mã khách hàng ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter Mã khách hàng" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="customer_phone"
                                    label="Số điện thoại khách hàng"
                                    rules={[{ required: true, message: 'Please enter Mã khách hàng ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter Mã khách hàng" />
                                </Form.Item>
                            </Col>
                            {/* <Col span={6}>
                                <Form.Item
                                    name="customer_name"
                                    label="customer_name"
                                    rules={[{ required: true, message: 'Please enter supplierId ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter supplierId" />
                                </Form.Item>
                            </Col> */}
                        </Row>
                    <div style={{border:"1px solid red", padding:"10px 10px"}}>
                        <h2 style={{textAlign:"center"}}>Chi tiết phiếu nhập</h2>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item
                                    name="quantity"
                                    label="Số lượng"
                                    rules={[{ required: true, message: 'Please enter importPrice ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter quantity" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="variation"
                                    label="Tên biến thể"
                                    rules={[{ required: true, message: 'Please enter Biến thể ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter totalPrice" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="productId"
                                    label="mã sản phẩm"
                                    rules={[{ required: true, message: 'Please enter productId ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter productId" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="property"
                                    label="Tên thuộc tính"
                                    rules={[{ required: true, message: 'Please enter thuộc tính ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter thuộc tính" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    </Form>
                </Modal>
            </>
        );
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
        inSertOrder: (data, meta) => {
            dispatch(inSertOrder(data, meta));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAddOrderDetail);
