import React from "react";
import "antd/dist/antd.css";

import {  Col,   Modal, Row } from "antd";
import UserDropdown from "./Components/UserDropdown";
import Avatar from "antd/lib/avatar/avatar";
import ROUTER from "../../constants/Router";
import select from "../../utils/select";
import { connect } from "react-redux";
import { logoutUser } from "../../pages/auth/login/redux/action";
import { withRouter } from "react-router-dom";
import { getAccount } from "../../pages/auth/AuthDetail/redux/action";
import jwt_decode from "jwt-decode";
import { API_URL } from "../../utils/Config";

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {
    const accountId = jwt_decode(localStorage.getItem('jwtToken'));
    const params = { id: accountId.sub }; 
    this.props.getAccount(params);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logOut = () => {
    Modal.confirm({
      title: 'Bạn chắc chắn đăng xuất ?',
      okText: 'Có',
      cancelText: 'Không',
      onOk: () => {
        this.props.logOut()
        this.props.history.push(ROUTER.AUTH.LOGIN);
      },
      onCancel() {
      },
    })
  }

  
  onChangeProfile = () => {
    this.props.history.push(ROUTER.ACCOUNT.AUTHDETAIL)
  }

  onChangePassword = () => {
    this.props.history.push(ROUTER.ACCOUNT.PASSWORD)
  }
  
  render() {
    // const { image } = this.props.accountDetails;
    return (
    
      <Row style={{backgroundColor:'white'}}>
        <Col span={8}>

        </Col>
        <Col span={8} >
          
        </Col>
        <Col span={8}>
        <div style={{ padding: 20}} >
        <span style={{
          paddingLeft: '30px',
          fontSize: '24px'
        }}
        >
          {/* {title} */}
        </span> 
        

        <div
          style={{ float: 'right' }}
        >

         <span style={{ marginRight: 10 }}>
            {'HI HI HI'}
            {/* <b>{this.props.accountDetails.username}</b> */}
            !
          </span>
          <UserDropdown onClick={this.onChangeProfile} logOut={this.logOut} onChangePassword={this.onChangePassword}>
            <Avatar
              src="https://lh3.googleusercontent.com/proxy/KNcW4RVoN2mHCGJLCNGiMR72SsNALDM0TKMCHIsZgguBCiqlBdMYOgNjJKWbznivIUchK1Bk7z2mbi_QyzA8tCMnodV7A294trHoqzuwaCxLMvjDw-TE0CDyA_LqPAB4w-MEcRsC"
            />
          </UserDropdown>
        </div>
      </div>
        </Col>
      </Row>
    
    );
  }
}


const mapDispatchToProps = (dispatch, props) => {
  return {
    logOut: () => {
      dispatch(logoutUser())
    },
    getAccount: (params) => {
      dispatch(getAccount(params));
    },
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: select(state, 'authReducer', 'isAuthenticated'),
    isFetching: select(state, 'authReducer', 'isFetching'),
    error: select(state, 'authReducer', 'error'),
    // accountDetails: select(state, 'authDetailReducer', 'accountDetails'),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent));
