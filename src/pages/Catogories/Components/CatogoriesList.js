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
    title: 'Tên loại sản phẩm',
    dataIndex: 'title',
    key: 'title',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'code',
    dataIndex: 'code',
    key: 'code',
    width:150,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Tạo bởi',
    dataIndex: 'createBy',
    key: 'createBy',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Thay đổi bởi',
    dataIndex: 'modifiedBy',
    key: 'modifiedBy',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'isActive',
    key: 'isActive',
    width:120,
    align: "center",
    render: (value, record) => (
      <Switch  key={record.id} checked={value} onChange={() => onChangeStatus(record.id, value)} />
    ),
  },
  {
    title: "Chức năng",
    key: "action",
    width: 100,
    render: (record) => (
      <Space>
        <EditOutlined onClick={() => onEdit("update", record)} />
        <Popconfirm
          title="Bạn có muốn xóa User này?"
          onConfirm={() => onDelete(record)}
        >
          <DeleteOutlined />
        </Popconfirm>
      </Space>
    ),
  },

]

const CatogoriesList = ({
    CatogoriesData,
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
          dataSource={CatogoriesData}
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


CatogoriesList.propTypes = {
    CatogoriesData: PropTypes.array,
    meta: PropTypes.object,
    onChangeSize: PropTypes.func,
    onChangeStatus: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
}

CatogoriesList.defaultProps = {
    CatogoriesData: [],
    meta: {},
    onChangePage: () => {},
    onChangeSize: () => {},
    onChangeStatus: () => {},
    onDelete: () => {},
    onEdit: () => {},
}

export default WithLoading(ToJS(CatogoriesList))
