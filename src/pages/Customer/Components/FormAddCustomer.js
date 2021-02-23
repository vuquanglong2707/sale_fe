import {
    Col, Form,
    Input,
    Modal, notification, Row, Switch
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inSertCustomer} from '../redux/action';
import select from '../../../utils/select'; 

class FormAddCustomer extends Component {

    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {}

    }
    componentDidUpdate() {
        if (this.props.type === "update" && this.props.dataEdit !== null) {
            const data = this.props.dataEdit;
            this.formRef.current.setFieldsValue({
                name: data.phone,
                phone: data.title,
            })
        }
    }

    handleOk = (value) => {
        const payload = {
            phone: value.phone,
            name: value.name,

        }

        if (this.props.type === "update") {
            this.props.onClose();
        } else {
            this.props.inSertCustomer({ ...payload }, {
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
                                    name="name"
                                    label="Tên khách hàng"
                                    rules={[{ required: true, message: 'Please enter last title' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter title" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="phone"
                                    label="Số điện thoại"
                                    rules={[{ required: true, message: 'Please enter phone' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter phone" />
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
        customerData: select(state, 'customerReducer', 'items'),
        isFetching: select(state, 'customerReducer', 'isFetching'),
        meta: select(state, 'customerReducer', 'meta'),
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        inSertCustomer: (user, meta) => {
            dispatch(inSertCustomer(user, meta));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAddCustomer);
