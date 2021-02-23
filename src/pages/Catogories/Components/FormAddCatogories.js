import {
    Col, Form,
    Input,
    Modal, notification, Row, Switch
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inSertCatogories, updateCatogories } from '../redux/action';
import select from '../../..//utils/select'; 

class FormAddCatogories extends Component {

    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidUpdate() {
        if (this.props.type === "update" && this.props.dataEdit !== null) {
            const data = this.props.dataEdit;
            this.formRef.current.setFieldsValue({
                title: data.title,
                code: data.code,
                isActive: data.isActive,
                createBy: data.createBy,
                modifiedBy: data.modifiedBy,
                wareHouseTitle: data.wareHouseTitle,

            })
        }
        // else {
        //     this.formRef.current.resetFields();
        // }
    }

    handleOk = (value) => {

        const payload = {
            title: value.title,
            code: value.code,
            createBy: value.createBy,
            wareHouseTitle: value.wareHouseTitle,
            modifiedBy: value.modifiedBy,
            isActive: value.isActive ? value.isActive : false,
        }

        if (this.props.type === "update") {
            this.props.updateCatogories({ ...payload, id: this.props.dataEdit.id }, {
                onSuccess: () => {
                    notification.success({ message: `Đã cập nhật thành công  #${this.props.dataEdit.title} ` });
                    this.handleCancel();
                },
                onError: error => notification.error({ message: `${error} - Cập nhật thất bại #${this.props.dataEdit.title}  ` }),
            })
        } else {
            this.props.inSertCatogories({ ...payload }, {
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
                    title={this.props.type === 'update' ? `cập nhật thông tin ${this.props.dataEdit.title}` : "Tạo mới user"}
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
                                    name="title"
                                    label="Tên"
                                    rules={[{ required: true, message: 'Please enter name' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter name" />
                                </Form.Item>
                            </Col>


                            <Col span={6}>

                                <Form.Item
                                    name="code"
                                    label="code"
                                    rules={[{ required: true, message: 'Please enter code' }]}>
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter code" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item
                                    name="createBy"
                                    label="Người tạo"
                                    rules={[{ required: true, message: 'Please enter last createBy' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter createBy" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="modifiedBy"
                                    label="Người thay đổi"
                                    rules={[{ required: true, message: 'Please enter modifiedBy' }]}
                                >
                                <Input style={{ borderRadius: "5px" }} placeholder="Please enter modifiedBy" />
                                </Form.Item>

                            </Col>
                        </Row>



                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="wareHouseTitle"
                                    label="Tên kho"
                                    rules={[{ required: true, message: 'Please enter wareHouseTitle ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter wareHouseTitle" />
                                </Form.Item>
                            </Col>
                            {/* <Col span={12}>
                                <Form.Item
                                    name="phone"
                                    label="Phone"
                                    rules={[{ required: true, message: 'Please enter phone' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter phone" />
                                </Form.Item>
                            </Col> */}
                        </Row>

                        <Row gutter={24}>
                            {/* <Col span={12}>
                                <Form.Item
                                    // name="role"
                                    label="Role"
                                // rules={[{ required: true, message: 'Please enter password' }]}>
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter phone" />
                                </Form.Item>
                            </Col> */}
                            <Col span={6}>
                                <Form.Item
                                    name="isActive"
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
        CatogoriesData: select(state, 'catogoriesReducer', 'items'),
        // userData: select(state, 'userManagementReducer', 'userData'),
        isFetching: select(state, 'catogoriesReducer', 'isFetching'),
        error: select(state, 'catogoriesReducer', 'error'),

    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {

        inSertCatogories: (user, meta) => {
            dispatch(inSertCatogories(user, meta));
        },
        updateCatogories: (user, meta) => {
            dispatch(updateCatogories(user, meta));
        }
        // findbyidUser: (id) => {
        //     dispatch(findbyidUser(id));
        // },
        // getAll: () => {
        //     dispatch(getAll());
        // },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAddCatogories);
