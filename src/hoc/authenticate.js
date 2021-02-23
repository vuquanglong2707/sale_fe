import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import LoadingIndicator from '../components/Loading/index';
import select from '../utils/select'
import ROUTER from '../constants/Router';
import { loginWithTokenIfNeed } from '../pages/auth/login/redux/action';

const WithAuthenticationHOC = needAuthenticated => WrappedComponent => {
  class Authentication extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    static getDerivedStateFromProps(nextProps) {
      nextProps.loginWithTokenIfNeed()
      return null
    }

    render() {
      const { isAuthenticated, error, isFetching } = this.props
      if (!isAuthenticated && error && !isFetching) {
        return <Redirect to={ROUTER.AUTH.LOGIN} />
      }
      if (!needAuthenticated || isAuthenticated) {
        return <WrappedComponent {...this.props} />
      }
      if ((isFetching && !error && !isAuthenticated) || localStorage.getItem('jwtToken')) {
        return (
          <div
            style={{
              height: '100vh',
              width: '100%',
              display: 'grid',
              placeContent: 'center',
            }}
          >
            <LoadingIndicator />
          </div>
        )
      }
      return <Redirect to={ROUTER.AUTH.LOGIN} />
    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: select(state, 'authReducer', 'isAuthenticated'),
    isFetching: select(state, 'authReducer', 'isFetching'),
    error: select(state, 'authReducer', 'error'),
  })

  const mapDispatchToProps = dispatch => ({ loginWithTokenIfNeed: () => dispatch(loginWithTokenIfNeed()) })

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Authentication)
}

export default WithAuthenticationHOC
