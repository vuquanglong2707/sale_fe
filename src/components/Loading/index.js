import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const LoadingIndicator = ({ tip, style, content, isFetching, children }) => (
  <Spin
    size="large"
    spinning={isFetching}
    tip={`${content || 'Đang tải'} ...`}
    style={{ maxHeight: '100%', textAlign: 'center', ...style }}
    indicator={<LoadingOutlined />}
  >
    {children}
  </Spin>
)

export default LoadingIndicator
