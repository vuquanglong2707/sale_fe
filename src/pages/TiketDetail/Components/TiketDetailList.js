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
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Tên đơn',
    dataIndex: 'title',
    key: 'title',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Tên khách',
    dataIndex: 'supplierTitle',
    key: 'supplierTitle',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Người tạo',
    dataIndex: 'createBy',
    key: 'createBy',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Người xác nhận',
    dataIndex: 'modifiedBy',
    key: 'modifiedBy',
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

const TiketDetailList = ({
  importTiketData,
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
          dataSource={importTiketData}
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


TiketDetailList.propTypes = {
  importTiketData: PropTypes.array,
    meta: PropTypes.object,
    onChangeSize: PropTypes.func,
    onChangeStatus: PropTypes.func,
    // onDelete: PropTypes.func,
    onEdit: PropTypes.func,
}

TiketDetailList.defaultProps = {
  importTiketData: [],
    meta: {},
    onChangePage: () => {},
    onChangeSize: () => {},
    onChangeStatus: () => {},
    onDelete: () => {},
    onEdit: () => {},
}

export default WithLoading(ToJS(TiketDetailList))
