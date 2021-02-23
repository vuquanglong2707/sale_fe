import {
    Col, Form,
    Input,
    Modal, notification, Row, Switch
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inSertSupplier} from '../redux/action';
import select from '../../../utils/select'; 

class FormAddSupplier extends Component {

    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {}

    }
    componentDidUpdate() {
        if (this.props.type === "update" && this.props.dataEdit !== null) {
            const data = this.props.dataEdit;
            this.formRef.current.setFieldsValue({
                address:data.address,
                phone: data.phone,
                title: data.title,
                createBy: data.createBy,

            })
        }
    }

    handleOk = (value) => {
        const payload = {
            address:value.address,
            phone: value.phone,
            title: value.title,
            createBy: value.createBy,
            createdDate: "2021-02-20T10:14:17.000+0000"
        }

        if (this.props.type === "update") {
            this.props.onClose();
        } else {
            this.props.inSertSupplier({ ...payload }, {
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
                                    name="address"
                                    label="Địa chỉ"
                                    rules={[{ required: true, message: 'Please enter phone' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter phone" />
                                </Form.Item>
                            </Col>


                            <Col span={6}>

                                <Form.Item
                                    name="phone"
                                    label="Số điện thoại"
                                    rules={[{ required: true, message: 'Please enter code' }]}>
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter code" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item
                                    name="title"
                                    label="Tên nhà cung cấp"
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


  
                    </Form>
                </Modal>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        supplierData: select(state, 'supplierReducer', 'items'),
        isFetching: select(state, 'supplierReducer', 'isFetching'),
        meta: select(state, 'supplierReducer', 'meta'),
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        inSertSupplier: (user, meta) => {
            dispatch(inSertSupplier(user, meta));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAddSupplier);
