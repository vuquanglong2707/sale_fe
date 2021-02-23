import React from 'react';
import { Form, Input, Button,  Row, Col,  Upload, message, Card, notification } from 'antd';
import ROUTER from '../../../constants/Router';
import { UploadOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAccount, updatedAccount} from './redux/action';
import select from '../../../utils/select';
import WithLoadingHOC from '../../../hoc/loading';
import { HEADERS } from '../../../constants/api';
import { API_URL } from '../../../utils/Config';

  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}



class AuthDetail extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = { 
            // loading: false,
      };
    
    }
    formRef = React.createRef();


    onCancel = () => {
        this.props.history.push(ROUTER.HOME)
    }

    
    handleChange = info => {
        let file = info.file;
    if (file.status === 'uploading') {
        this.setState({ loading: true });
        return;
    }
        if (file.status === 'done') {
            this.setState({ image: file.response.data[0] });
            message.success(`${info.file.name} cập nhật ảnh thành công !!!.`);
        }
        else if (file.status === 'error') {
            message.error(`${info.file.name} cập nhật ảnh thất bại.`);
        }
    };
    
    componentDidMount() {
        if (this.props.accountDetails) {
            const account = this.props.accountDetails;
            this.setState({ image: account.image });
            this.formRef.current.setFieldsValue({
                name: account.title,
                email: account.email,
                phone: account.phone,
            });
        }
    }

    componentWillReceiveProps(nextStates) {
        if (nextStates && nextStates.accountDetails) {
            const account = nextStates.accountDetails;
            this.setState({ image: account.image });
            this.formRef.current.setFieldsValue({
                name: account.title,
                email: account.email,
                phone: account.phone,
            });
        }
    }
    
    onFinish = async (value) => {
        const { image } = this.state;
        const payload = { 
            id: this.props.accountDetails.id,
            title: value.name,
            email: value.email,
            phone: value.phone,
            image: image.length > 0 ? image : "",
            
        }
        await this.props.updatedAccount(payload,
            {
                onSuccess: () => {
                    notification.open({ message: 'cập nhật thành công' });
                },
                onError: error => notification.error({ message: `${error} - Cập nhật thất bại` }),
            }
        )
            
    }
  
  render() {
    const { image } = this.state;
    return (
        <Card style={{ background: 'white', padding: 40, borderRadius: 10 }}>
            <h3 style={{ textAlign: 'center', fontSize: 'large' }}>Cập nhật thông tin tài khoản {this.props.accountDetails.username}</h3>
            <Form
                layout="vertical"
                hideRequiredMark
                style={{ backgroundColor: 'smoke' }}
                ref={this.formRef}
                onFinish={this.onFinish}
            >
                <Row>
                    <Col span={8} > 
                        <Row style={{ justifyContent: 'center' }}>
                            <Form.Item name="image" >
                                <img
                                    src={ image ? `${API_URL}${image}` : ''}
                                    style={{
                                        height: 240,
                                        width: 240,
                                        borderRadius: '50%'
                                    }}
                                    alt="imageaccount"
                                />
                            </Form.Item>
                        </Row>
                        <Row style={{paddingTop: 20,justifyContent:'center'}}>
                                <Upload
                                    headers={HEADERS.JWT_HEADER()}
                                    showUploadList={false}
                                    action={`${API_URL}/upload/user/image`}
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Row>
                    </Col>
                    <Col span={16}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item 
                                        name="name"
                                        label="Name"
                                        rules={[{ required: true, message: 'Please enter name' }]}
                                    >
                                    
                                        <Input style={{ borderRadius: "5px" }}
                                            placeholder="Please enter name"
                                            value={this.state.name}
                                            
                                        />
                                    
                                </Form.Item>
                            </Col>
                          
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[{ required: true, message: 'Please enter mail' }]}
                                >
                                    <Input
                                        type="email"
                                        style={{ borderRadius:"5px" }}
                                        placeholder="Please enter mail"
                                    />
                                </Form.Item>
                            </Col>  
                            <Col span={12}>
                                <Form.Item
                                    name="phone"
                                    label="Phone"
                                    rules={[{ required: true, message: 'Please enter phone' }]}
                                    >
                                    <Input style={{ borderRadius:"5px"}} placeholder="Please enter phone" />
                                </Form.Item>
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
                            <Button style={{ backgroundColor:'#f44336',borderRadius: 5,border:"#f44336", }} onClick={this.onCancel} >
                                Cancel
                            </Button>
                        </div> 
                    
                    </Col>
                </Row>
            </Form>
        </Card>
    )}
  
};


const mapDispatchToProps = (dispatch, props) => {
    return {
        getAccount: (params) => {
            dispatch(getAccount(params));
        },
        updatedAccount:(payload,meta) => {
            dispatch(updatedAccount(payload, meta));
        }
    }
}

const mapStateToProps = (state) => {
    return { 
        accountDetails: select(state, 'authDetailReducer', 'accountDetails'),
        error:  select(state, 'authDetailReducer','error')
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithLoadingHOC(AuthDetail)));
