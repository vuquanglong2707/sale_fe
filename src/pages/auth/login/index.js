import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { Form, Input, Button, Card, Row, Col, Image } from 'antd';
// import ReCAPTCHA from 'react-grecaptcha';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { loginUser } from './redux/action';
import { Link } from 'react-router-dom';
import ROUTER from '../../../constants/Router';
import select from '../../../utils/select';
import { history } from '../../../constants/history';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isShow: false, 
          videoURL: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4' 
      };
      this.callback = this.callback.bind(this);
      this.expiredCallback = this.expiredCallback.bind(this);
    }


    onFinish = (value) => {
      const user = {
        username: value.userName,
        password: value.passWord,
      }
      this.props.loginUser(user);
    };


   callback = () => {
    this.setState({
         isShow: true
       })
     };
  expiredCallback  = () => {
      
    };
    

  
    componentDidMount() {
      if(this.props.isAuthenticated) {
         history.push(ROUTER.HOME);
      }
  }
  
  componentWillReceiveProps(nextProps) {
    const { history,  isAuthenticated} = nextProps
      if(isAuthenticated){
        history.push(ROUTER.HOME)
      }
  }

  
  render() {
    const { error } = this.props;
    return (
      <>
        <video className="video" id="background-video" loop autoPlay>
                <source src={this.state.videoURL} type="video/mp4" />
                <source src={this.state.videoURL} type="video/ogg" />
                Your browser does not support the video tag.
        </video>
        <Row className="login">
          <Col span={4} />
          <Col span={10} style={{ marginTop: '100px'}}>
            <Image
              style={{ 
                width: 580,
                height: 335
              }}
              preview={false}
              src={require("../../../assets/banner.jpg")}
              alt="image" />
          </Col>
          <Col span={6} style={{ marginTop: '100px'}} >
              <Card
                bordered={false}
                  style={{
                    maxWidth: '100%',
                    background: 'while'
                  }}
              >
                <h1 style={{ textAlign: 'center' }}>Đăng nhập trang ADMIN</h1>
                { error? <h4 style={{ textAlign: 'center', color: 'red'}}>{error}</h4> : undefined}
                <Form
                  name="normal_login"
                  className="login-form"
                  layout="vertical"
                  initialValues={{ remember: true }}
                  onFinish={this.onFinish}
                >
                  <Form.Item
                  name="userName"
                  label="Tên đăng nhập"
                  rules={[{ required: true, message: 'kiểm tra tên đăng nhập!' }]}
                  validateStatus={error ? error : undefined}
                  >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="nhập tên đăng nhập"
                    />
                  </Form.Item>
                  <Form.Item
                    name="passWord"
                    label="Mật khẩu"
                      rules={[{ required: true, message: 'kiểm tra lại mật khẩu!' }]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="nhập mật khẩu"
                    />
                  </Form.Item>
                  {/* <Form.Item >
                    <ReCAPTCHA
                            sitekey="6Lc_IQIaAAAAAGWCZ1XsOnI7nKyS8VvxowxuSNkN"
                            callback={this.callback}
                            expiredCallback={() => this.expiredCallback()}
                            locale="vn"
                      />
                  </Form.Item> */}
                  <Form.Item >
                     {this.state.isShow === true &&( <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        style={{ width: '100%' }} 
                      >
                      Đăng nhập <LoginOutlined /> 
                    </Button>
                  )}
                  <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        style={{ width: '100%' }} 
                      >
                      Log in <LoginOutlined /> 
                  </Button>
                  {/* <Link to={ROUTER.AUTH.REGISTER} > <span style={{ marginLeft: '40%'}}> Tạo mới tài khoản </span></Link> */}

                  </Form.Item>
                </Form>
              </Card>
          </Col>
      </Row>
    </>
  )}
  
};



const mapDispatchToProps = (dispatch, props) => {
  return {
    loginUser: (user) => {
      dispatch(loginUser(user))
     }
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: select(state, 'authReducer', 'isAuthenticated'),
    isFetching: select(state, 'authReducer', 'isFetching'),
    forwardLocation: select(state, 'authReducer', 'forwardLocation'),
    error: select(state, 'authReducer', 'error'),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
