import { Popconfirm, Space, Switch, Table } from 'antd';
import React from 'react'
import WithLoading from '../../../hoc/loading';
import ToJS from '../../../hoc/toJS';
import PropTypes from 'prop-types';
import { DeleteOutlined, EditOutlined,EyeOutlined } from '@ant-design/icons';
function refreshPage(){ 
    window.location.reload(); 
}
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
    title: 'Tên Sản Phẩm',
    dataIndex: 'name',
    key: 'name',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Sku',
    dataIndex: 'sku',
    key: 'sku',
    width:150,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Loại sản phẩm',
    dataIndex: 'productCategoriesName',
    key: 'productCategoriesName',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Số lượng hiện tại',
    dataIndex: 'quantityCurrent',
    key: 'quantityCurrent',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Số lượng đã bán',
    dataIndex: 'quantitySold',
    key: 'quantitySold',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'giá sale',
    dataIndex: 'salePrice',
    key: 'salePrice',
    width:120,
    ellipsis: true,

    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'giá bán',
    dataIndex: 'price',
    key: 'price',
    width:120,

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
    title: "Tính năng",
    key: "action",
    width: 100,
    render: (record) => (
      <Space>
        <EditOutlined onClick={() => onEdit("update", record)} />
        {/* <EyeOutlined onClick={() => onEdit("update", record)} /> */}
        <Popconfirm
          // onClick={ refreshPage }
          title="Bạn có muốn xóa sản phẩm này?"
          onConfirm={() => onDelete(record )  }
          // refreshPage
        >
          <DeleteOutlined />
        </Popconfirm>
      </Space>
    ),


  },
]

const ProductList = ({
    product,
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
          dataSource={product}
          rowKey={record => record.id}
          pagination={{
            size: "small",
            current: meta.current ? meta.current : 2,
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


ProductList.propTypes = {
  product: PropTypes.array,
    meta: PropTypes.object,
    onChangeSize: PropTypes.func,
    onChangeStatus: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
}

ProductList.defaultProps = {
    product: [],
    meta: {},
    onChangePage: () => {},
    onChangeSize: () => {},
    onChangeStatus: () => {},
    onDelete: () => {},
    onEdit: () => {},
}

export default WithLoading(ToJS(ProductList))
