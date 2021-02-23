import { Popconfirm, Space, Switch, Table } from 'antd';
import React from 'react'
import WithLoading from '../../../hoc/loading';
import ToJS from '../../../hoc/toJS';
import PropTypes from 'prop-types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const columns = (onChangeStatus) => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width:50,
    render: value => (
      <span>  {value} </span>

    )
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'name',
    key: 'name',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },

]

const CustomerList = ({
    customerData,
    meta,
    onChangePage,
    onChangeSize,
    onChangeStatus,
    isFetching,

}) => {
  return (
    <>
      { isFetching === false && (
        <Table
          columns={columns(onChangeStatus)}
          dataSource={customerData}
          rowKey={record => record.id}
          pagination={{
            size: "small",
            current: meta.current ? meta.current : 0,
            total: meta.total,
            pageSize: meta.pageSize ? meta.pageSize : 10,
            onChange: onChangePage,
            showSizeChanger: true,
            pageSizeOptions: ['10', '15', '20', '25'],
            onShowSizeChange: onChangeSize,
          }}
          scroll={{ x: 800 }}
        />
      )}
    </>
  )
}


CustomerList.propTypes = {
  customerData: PropTypes.array,
    meta: PropTypes.object,
    onChangeSize: PropTypes.func,
    onChangeStatus: PropTypes.func,
    // onDelete: PropTypes.func,
    onEdit: PropTypes.func,
}

CustomerList.defaultProps = {
  customerData: [],
    meta: {},
    onChangePage: () => {},
    onChangeSize: () => {},
    onChangeStatus: () => {},
    onDelete: () => {},
    onEdit: () => {},
}

export default WithLoading(ToJS(CustomerList))
