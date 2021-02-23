import {
    Col, Form,
    Input,
    Modal, notification, Row, Switch
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inSertTiketDetail} from '../redux/action';
import select from '../../../utils/select'; 

class FormAddTiketDetail extends Component {

    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {}

    }
    componentDidUpdate() {
        if (this.props.type === "update" && this.props.dataEdit !== null) {
            const data = this.props.dataEdit;
            this.formRef.current.setFieldsValue({
                phone: data.phone,
                title: data.title,
                createBy: data.createBy,
                modifiedBy: data.modifiedBy,
                note: data.note,
                shipCode: data.shipCode,
                total: data.total,
                orderCode: data.orderCode,
                supplierId: data.supplierId,
                supplierTitle: data.supplierTitle,

                importPrice: data.importTicketDetails[0].importPrice,
                totalPrice: data.importTicketDetails[0].totalPrice,
                totalQuantity: data.importTicketDetails[0].totalQuantity,
                productId: data.importTicketDetails[0].productId,
                productName: data.importTicketDetails[0].productName,
            })
        }
    }

    handleOk = (value) => {
        const payload = {
            phone: value.phone,
            title: value.title,
            createBy: value.createBy,
            createdDate: "2021-02-20T07:31:23.883+0000",
            modifiedBy: value.modifiedBy,
            note: value.note,
            shipCode: value.shipCode,
            total: value.total,
            orderCode: value.orderCode,
            supplierId: value.supplierId,
            supplierTitle: value.supplierTitle,
            importTicketDetails: [
                {
                    importPrice: value.importPrice,
                    totalPrice: value.totalPrice,
                    totalQuantity: value.totalQuantity,
                    productId: value.productId,
                    productName: value.productName,
                }
            ],
        }

        if (this.props.type === "update") {
            this.props.onClose();
        } else {
            this.props.inSertTiketDetail({ ...payload }, {
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
                    title={this.props.type === 'update' ? `Thông tin đơn nhập ${this.props.dataEdit.title}` : "Tạo mới phiếu nhập"}
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
                                    name="phone"
                                    label="Số điện thoại"
                                    rules={[{ required: true, message: 'Please enter phone' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter phone" />
                                </Form.Item>
                            </Col>


                            <Col span={6}>

                                <Form.Item
                                    name="orderCode"
                                    label="Mã phiếu"
                                    rules={[{ required: true, message: 'Please enter code' }]}>
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter code" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item
                                    name="title"
                                    label="Tên phiếu nhập"
                                    rules={[{ required: true, message: 'Please enter last title' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter title" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="createBy"
                                    label="Người tạo"
                                    rules={[{ required: true, message: 'Please enter createBy' }]}
                                >
                                <Input style={{ borderRadius: "5px" }} placeholder="Please enter createBy" />
                                </Form.Item>

                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item
                                    name="modifiedBy"
                                    label="Người xác nhận"
                                    rules={[{ required: true, message: 'Please enter modifiedBy ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter modifiedBy" />
                                </Form.Item>
                            </Col>
   
                            <Col span={6}>
                                <Form.Item
                                    name="note"
                                    label="Ghi chú"
                                    rules={[{ required: true, message: 'Please enter note ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter note" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="supplierTitle"
                                    label="Tên khách"
                                    rules={[{ required: true, message: 'Please enter supplierTitle ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter supplierTitle" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                    <Form.Item
                                        name="shipCode"
                                        label="Mã ship"
                                        rules={[{ required: true, message: 'Please enter shipCode ' }]}
                                    >
                                        <Input style={{ borderRadius: "5px" }} placeholder="Please enter shipCode" />
                                    </Form.Item>
                                </Col>
                        </Row>
    
 
                        <Row gutter={24}>
         
                            <Col span={6}>
                                <Form.Item
                                    name="total"
                                    label="Số lượng nhập"
                                    rules={[{ required: true, message: 'Please enter total ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter total" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="orderCode"
                                    label="Mã order"
                                    rules={[{ required: true, message: 'Please enter orderCode ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter orderCode" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="supplierId"
                                    label="Mã khách hàng"
                                    rules={[{ required: true, message: 'Please enter supplierId ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter supplierId" />
                                </Form.Item>
                            </Col>
                        </Row>

                    <div style={{border:"1px solid red", padding:"10px 10px"}}>
                        <h2 style={{textAlign:"center"}}>Chi tiết phiếu nhập</h2>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item
                                    name="importPrice"
                                    label="Gía nhập"
                                    rules={[{ required: true, message: 'Please enter importPrice ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter importPrice" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="totalPrice"
                                    label="Tổng tiền"
                                    rules={[{ required: true, message: 'Please enter totalPrice ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter totalPrice" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="totalQuantity"
                                    label="Tổng số lượng"
                                    rules={[{ required: true, message: 'Please enter totalQuantity ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter totalQuantity" />
                                </Form.Item>
                            </Col>
                            
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item
                                    name="productId"
                                    label="Mã sản phẩm"
                                    rules={[{ required: true, message: 'Please enter productId ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter productId" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="productName"
                                    label="Tên sản phẩm"
                                    rules={[{ required: true, message: 'Please enter productName ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter productName" />
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
        importTiketReducer: select(state, 'importTiketReducer', 'items'),
        isFetching: select(state, 'importTiketReducer', 'isFetching'),
        error: select(state, 'importTiketReducer', 'error'),
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        inSertTiketDetail: (user, meta) => {
            dispatch(inSertTiketDetail(user, meta));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAddTiketDetail);
