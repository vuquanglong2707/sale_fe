    
// import { ArrowLeftOutlined, LockOutlined, } from '@ant-design/icons';
// import { Row, Col, Form, Button, Card, Input} from 'antd';
// import React, { Component } from 'react';
// import jwt_decode from "jwt-decode";
// import ROUTER from '../../../constants/Router';
// import { API } from '../../../constants/api';
// import { Link, withRouter } from 'react-router-dom';
// import callApi from '../../../utils/apiCall';

// class changePassword extends Component {

//     constructor(props) {
//         super(props);
//         this.state =({
//             oldPassword: '',
//             newPassword: '',
//             newPassword1: '',
//             error: ''
//         })
//     }

//     onFinish = async() => {
//         const accountId = jwt_decode(localStorage.getItem('jwtToken'));
//         const {  newPassword, newPassword1 } = this.state;
//         if (newPassword.length !== newPassword1.length) {
//             this.setState({error: "kiểm tra lại mật khẩu"})
//         }
//         else {
//             const payload = { id: accountId.sub, password: newPassword }
//             const api = API.ACCOUNT.changePassword()
//             const { response, error } = await callApi({ ...api, payload })
//             if (!error && response.status === 200) {
//                 this.props.history.push(ROUTER.HOME);
//             }
//             else {
//                 this.setState({ error: error})
//             }
//         }
//     }

//     onChange = (e, field) => {
//         var target = e.target;
//         var name = field;
//         var value = target.value;
//         this.setState({
//             [name]: value
//         });
    
//     }

//     render() {
//         return (
//             <div>
//                 <Row>
//                     <Col span={6} />
//                     <Col span={12} >
//                         <Card
//                             bordered={false}
//                             style={{
//                                 maxWidth: '100%',
//                                 background: 'while'
//                             }}
//                         >
//                         <h1 style={{ textAlign: 'center' }}>Đổi mật khẩu</h1>
//                         <Form
//                         name="normal_Resgiter"
//                         className="Resgiter-form"
//                         layout="vertical"
//                         initialValues={{ remember: true }}
//                         onFinish={this.onFinish}
//                         >
//                             <h6> {this.state.error !== '' ? this.state.error : ''}</h6>    
//                             <Form.Item
//                                 name="oldPassword"
//                                 label="Mật khẩu cũ"
//                                 rules={[{ required: true, message: 'Please input your oldPassword!' }]}
//                             >
//                                 <Input
//                                     type='password'
//                                     prefix={<LockOutlined className="site-form-item-icon" />}
//                                     placeholder="nhập mật khẩu cũ"
//                                     onChange={(e) => this.onChange(e, "oldPassword")}
//                                 />
//                             </Form.Item>
//                             <Form.Item
//                                 name="newPassword"
//                                 label="Mật khẩu mới"
//                                 rules={[{ required: true, message: 'Please input your new Password!' }]}
//                             >
//                                 <Input
//                                 prefix={<LockOutlined className="site-form-item-icon" />}
//                                 type="password"
//                                 placeholder="new passWord"
//                                 onChange={(e) => this.onChange(e, "newPassword")}
//                                 />
//                             </Form.Item>
//                             <Form.Item
//                                 name="newPassword1"
//                                 label="Nhập lại mật khẩu mới"
//                                         rules={[{ required: true, message:  'Please input your new Password!' }]}>
//                                     <Input
//                                         prefix={<LockOutlined className="site-form-item-icon" />}
//                                         type="password"
//                                         placeholder="new passWord"
//                                         onChange={(e) => this.onChange(e, "newPassword1")}
//                                         />         
//                             </Form.Item>
                    
//                             <Form.Item >
//                                 <Button
//                                     type="primary"
//                                     htmlType="submit"
//                                     className="Resgiter-form-button"
//                                     style={{ width: '100%' }} 
//                                 >
//                                     Xác nhận
//                                 </Button>
//                                 <Link to={ROUTER.HOME}> <span style={{ marginLeft: '45%'}}><ArrowLeftOutlined /> back </span> </Link>
//                             </Form.Item>        
                            
//                         </Form>
//                     </Card>
//                 </Col>
//                 <Col span={6}/>
//             </Row>
//             </div>
//         )
//     }
// }

// export default  withRouter(changePassword);
