import { Popconfirm, Space, Switch, Table } from 'antd';
import React from 'react'
import WithLoading from '../../../hoc/loading';
import ToJS from '../../../hoc/toJS';
import PropTypes from 'prop-types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const columns = (onChangeStatus, onDelete, onEdit) => [
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
    title: 'Mã hóa đơn',
    dataIndex: 'codeOrder',
    key: 'code_order',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Tiền đã trả',
    dataIndex: 'cash_money',
    key: 'cash_money',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Chiết khấu',
    dataIndex: 'discount_money',
    key: 'discount_money',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Người xác nhận',
    dataIndex: 'modified_by',
    key: 'modified_by',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Người tạo',
    dataIndex: 'createdBy',
    key: 'createdBy',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: "Chức năng",
    key: "action",
    width: 100,
    render: (record) => (
      <Space>
        <EditOutlined onClick={() => onEdit("update", record)} />
      </Space>
    ),
  },

]

const OrderDetailList = ({
  importOrderData,
    meta,
    onChangePage,
    onChangeSize,
    onChangeStatus,
    isFetching,
    onDelete,
    onEdit
}) => {
  return (
    <>
      { isFetching === false && (
        <Table
          columns={columns(onChangeStatus, onDelete, onEdit)}
          dataSource={importOrderData}
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


OrderDetailList.propTypes = {
  importOrderData: PropTypes.array,
    meta: PropTypes.object,
    onChangeSize: PropTypes.func,
    onChangeStatus: PropTypes.func,
    // onDelete: PropTypes.func,
    onEdit: PropTypes.func,
}

OrderDetailList.defaultProps = {
  importOrderData: [],
    meta: {},
    onChangePage: () => {},
    onChangeSize: () => {},
    onChangeStatus: () => {},
    onDelete: () => {},
    onEdit: () => {},
}

export default WithLoading(ToJS(OrderDetailList))
