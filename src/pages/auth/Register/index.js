import React from 'react';
import { Form, Input, Button, Card, Row, Col, Image, notification } from 'antd';
import { UserOutlined, LockOutlined, ArrowLeftOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import ROUTER from '../../../constants/Router';
import { Link } from 'react-router-dom';
import select from '../../../utils/select';
import { registerUser } from './redux/action';
import { connect } from 'react-redux';

class Resgiter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: ''
         };
    }


    onFinish = (value) => {
            const user = {
                username: value.username,
                password: value.password,
                phone: value.phone,
                email: value.email,
                title: value.title,
            }
            this.props.registerUser(user, {
                onSuccess: () => {
                    notification.success({ message: 'Tạo mới thành công' })
                    this.props.history.push(ROUTER.AUTH.LOGIN)
                },
                onError: error => notification.error({ message: `Tạo mới thất bại - ${error}` }),
            });
    };

   
  render() {
      
    return (
      <div style={{ background: 'whilesmoke'}}>
        <Row>
            <Col span={4} />
            <Col span={10} style={{ paddingTop: '180px'}}>
                <Image style={{ 
                width: 490,
                height: 128
                }} src={require("../../../assets/banner.jpg")}  alt="image"  />
            </Col>
            <Col span={6} style={{ marginTop: '100px'}} >
                <Card
                    bordered={false}
                    style={{
                        maxWidth: '100%',
                        background: 'while'
                    }}
                >
                    <h1 style={{ textAlign: 'center' }}>Tạo tài khoản đăng nhập </h1>
                    {this.state.error > 0 && (<Form.Item>  <h6>{this.state.error} </h6></Form.Item>)}
                    <Form
                        name="normal_Resgiter"
                        className="Resgiter-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="title"
                            label="Tên"
                            rules={[{ required: true, message: 'Mời nhập lại tên !' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                type="text"
                                placeholder="Mời nhập tên "
                            />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="Tên đăng nhập"
                            rules={[{ required: true, message: 'Mời nhập lại tên đăng nhập!' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                type="text"
                                placeholder="Mời nhập tên đăng nhập"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Mật khẩu đăng nhập"
                            rules={[{ required: true, message: 'Mời nhập lại mật khẩu vào ô input!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="mời nhập mật khẩu"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Mail đăng ký"
                            rules={[{ required: true, message: 'Mời nhập mail vào ô nhập mail!' }]}
                        >
                            <Input
                                type='email'
                                prefix={<MailOutlined  className="site-form-item-icon" />}
                                placeholder="mời nhập email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Nhập số điện thoại"
                            rules={[{ required: true, message: 'Mời nhập lại số điện thoại!' }]}
                        >
                            <Input
                                prefix={<PhoneOutlined  className="site-form-item-icon" />}
                                type="phone"
                                placeholder="Mời nhập lại số điện thoại"
                                />         
                        </Form.Item>
                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="Resgiter-form-button"
                                style={{ width: '100%' }} 
                            >
                                Tạo mới tài khoản 
                            </Button>
                            <Link to={ROUTER.AUTH.LOGIN}><span style={{ marginLeft: '40%'}}><ArrowLeftOutlined /> back </span> </Link>
                        </Form.Item>        
                    </Form>
                </Card>
            </Col>
        <Col span={4}/>
    </Row>
    </div>
  )}
  
};


const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: select(state, 'registerReducer', 'isFetching'),
        error: select(state, 'registerReducer', 'error'),
      }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        registerUser: (user, meta) => {
        dispatch(registerUser(user,meta))
       }
      }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Resgiter);
