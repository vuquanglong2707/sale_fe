import {
    Col, Form,
    Input,
    Modal, notification, Row, Switch,Select,Upload,Button , message,uploadButton,Tag,Menu,Dropdown
} from 'antd';
import axios from 'axios';

import { TweenOneGroup } from 'rc-tween-one';
import React, { Component } from 'react';
import { UploadOutlined ,PlusOutlined } from '@ant-design/icons';

import { HEADERS } from '../../../constants/api'; 
import { API_URL } from '../../../utils/Config';
import select from '../../..//utils/select';
import { connect } from 'react-redux';
import { beforeUpload } from '../../../constants/ConvertImage';
import { inSertProduct,updateProduct,getAll } from '../redux/action';
const { Option } = Select;
const { TextArea } = Input;
function handleChange(value) {
    console.log(`selected ${value}`);
  }

class FormAddProduct extends Component {

    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            fileList: [],
            tags: [],
            inputVisible: false,
            inputValue: '',
            persons: [],
            productId: "",
        }

    }
    

    componentDidUpdate() {

        if (this.props.type === "update" && this.props.dataEdit !== null) {
            const data = this.props.dataEdit;
            // this.setState({
            //     productId: data.id,
            //     fileList: data.images,
            //   });
            this.formRef.current.setFieldsValue({
                name: data.name,
                sku: data.sku,
                createdBy: data.createdBy,
                modifiedBy: data.createdBy,
                barCode: data.barCode,
                qrCode: data.qrCode,
                content: data.content,
                price: data.price,
                salePrice: data.salePrice,
                descs: data.descs,
                // images:data.images[0],
                quantitySold: data.quantitySold,
                quantityCurrent: data.quantityCurrent,
                unitsTitle: data.unitsTitle,
                productCategoriesName:data.productCategoriesName,
                active: data.active ,
                isActive: data.isActive,
                title:data.dtoVariationList[0].title,
                active:data.dtoVariationList[0].active,
                crb:data.dtoVariationList[0].properties,
            })
        }
    }

    handleChange = info => {
        let fileList = [...info.fileList];
        let urlList = [];
        const { status } = info.file;
        if (status === 'done') {
            fileList.map(file => {
                if (file.response) {
                    file.url = file.response.data[0];
                    urlList.push(file.url);
                }
                return file;
            });
            this.setState({ fileList : urlList});
            message.success(` tải ảnh lên thành công .`);
        } else if (status === 'error') {
            message.error(` cập nhật ảnh thất bại.`);
        }
       
    };

    handleOk = (value) => {
        const { fileList,tags } = this.state;
        const payload = {
            name: value.name,
            sku: value.sku,
            createdBy: value.createdBy,
            createdDate: '',
            modifiedBy: value.createdBy,
            modifiedDate: '',
            barCode: value.barCode,
            qrCode: value.qrCode,
            content: value.content,
            price: value.price,
            salePrice: value.salePrice,
            descs: value.descs,
            quantitySold: value.quantitySold,
            quantityCurrent: value.quantityCurrent,
            unitsTitle: value.unitsTitle,
            images: fileList.length > 0 ? fileList : [],
            productCategoriesName:value.productCategoriesName,
            // active: value.active ? value.active : false,
            isActive: value.isActive ? value.isActive : false,
            dtoVariationList:[
                {
                    title:value.title,
                    active:value.active,
                    createBy:"quang long",
                    properties:tags.length > 0 ? tags : []
                }
            ]
        }
        if(this.props.type==="update"){
            this.props.updateProduct({ ...payload, id: this.props.dataEdit.id }, {
                onSuccess: () => {
                    // fileList=[];
                    notification.open({ message: `Đã cập nhật thành công tài khoản #${this.props.dataEdit.name} ` });
                    this.handleCancel();
                },
                onError: error => notification.error({ message: `${error} - Cập nhật thất bại tài khoản #${this.props.dataEdit.name}  ` }),
            })
        }
        else{
            this.props.inSertProduct(payload,
                {
                    onSuccess: () => {
                        notification.open({ message: 'Thêm thành công' });
                        this.handleCancel();
                    },
                    onError: error => notification.error({ message: `${error} - Thêm thất bại` }),
            })
        }
        
        this.formRef.current.resetFields();
    };

    handleCancel = () => {
        this.props.onClose();
    };

    
      handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        // console.log(tags);
        this.setState({ tags });
      };
    
      showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      };
    
      handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
      };
    
      handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        // console.log("tags",tags);
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',
        });
      };
    
      saveInputRef = input => {
        this.input = input;
      };
    
      forMap = tag => {
        const tagElem = (
          <Tag
            closable
            onClose={e => {
              e.preventDefault();
              this.handleClose(tag);
            }}
          >
            {tag}
          </Tag>
        );
        return (
          <span key={tag} style={{ display: 'inline-block' }}>
            {tagElem}
          </span>
        );
      };
        componentDidMount() {
        axios({
            method: 'get',
            url: `${API_URL}/api/catogories/getAll`,
            headers: HEADERS.JWT_HEADER(),
            responseType: 'json'
          })
            .then(res => {
            const data_export = res.data.data;
            const persons=[];
            for(let i=0;i<data_export.length;i++){
                persons.push(data_export[i].title)
            }
            this.setState({ persons });
            })
            .catch(error => console.log(error));
        }
    render() {
        const { fileList,tags, inputVisible, inputValue,persons } = this.state;
        console.log(tags)
        console.log(persons)
        // for(let j=0;i=j)
        console.log("file list: ",this.props.dataEdit.images)
        const tagChild = tags.map(this.forMap);
        return (
            <>
                <Modal
                    title={this.props.type === 'update' ? `cập nhật thông tin sản phẩm ${this.props.dataEdit.name}` : "Tạo mới sản phẩm"}
                    onCancel={this.handleCancel}
                    visible={this.props.visible}
                    okButtonProps={{ form: 'usersystem-form', key: 'submit', htmlType: 'submit' }}
                    okType="primary"
                >
                    <Form
                        id='usersystem-form'
                        layout="vertical"
                        hideRequiredMark
                        ref={this.formRef}
                        onFinish={this.handleOk}
                    >
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item
                                    name="sku"
                                    label="Sku"
                                    rules={[{ required: true, message: 'Please enter sku' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter sku" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="name"
                                    label="Tên"
                                    rules={[{ required: true, message: 'Please enter name' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter name" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item
                                    name="barCode"
                                    label="Bar Code"
                                    rules={[{ required: true, message: 'Please enter barCode' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter barCode" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="qrCode"
                                    label="QRCode"
                                    rules={[{ required: true, message: 'Please enter qrCode' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter qrCode" />
                                </Form.Item>

                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item
                                    name="price"
                                    label="Gía"
                                    rules={[{ required: true, message: 'Please enter price' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter price" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="productCategoriesName"
                                    label="Loại sản phẩm"
                                    rules={[{ required: true, message: 'Please enter unitsTitle ' }]}
                                >
                                    <Select defaultValue="Loại sản phẩm" style={{ width: 180 }} onChange={handleChange}>
                                         {persons.map(item => (
                                            <Option value={item}>{item}</Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                      
                            <Col span={6}>
                                <Form.Item
                                    name="createdBy"
                                    label="Người tạo"
                                    rules={[{ required: false, message: 'Please enter unitsTitle ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter unitsTitle" />
                                </Form.Item>
                            </Col>

                        </Row>

    
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item
                                    name="unitsTitle"
                                    label="Đơn vị"
                                    rules={[{ required: true, message: 'Please enter unitsTitle ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter unitsTitle" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="quantitySold"
                                    label="Số lượng đã bán"
                                    rules={[{ required: true, message: 'Please enter quantitySold' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter quantitySold" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="quantityCurrent"
                                    label="Số lượng hiện tại"
                                    rules={[{ required: true, message: 'Please enter quantityCurrent ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter quantityCurrent" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="salePrice"
                                    label="giá khuyến mãi"
                                    rules={[{ required: true, message: 'Please enter salePrice' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter salePrice" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="content"
                                    label="Nội dung"
                                    rules={[{ required: true, message: 'Please enter content ' }]}
                                >
                                    <TextArea  style={{ borderRadius: "5px" }} placeholder="Please enter content" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="descs"
                                    label="Mô tả"
                                    rules={[{ required: true, message: 'Please enter descs ' }]}
                                >
                                    <TextArea style={{ borderRadius: "5px" }} placeholder="Please enter descs" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>

                        </Row>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Upload
                                    action={`${API_URL}/upload/product/image`}
                                    // action={`${API_URL}/${fileList[0]}`}
                                    headers={HEADERS.JWT_HEADER()}
                                    name="file"
                                    method="POST"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                    // onChange={this.handleChangeImage}
                                    // defaultFileList={[...fileLists]}
                                    listType="picture"
                                    >
                                      {/* {[...fileLists] ? <img src={`${API_URL}${fileLists}`} alt="product-images" style={{ width: '100%' }} /> : uploadButton} */}
                                    <Button icon={<UploadOutlined 

                                    />}>Upload</Button>
                                </Upload>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            
                            <Col span={6}>
                                <Form.Item
                                    name="isActive"
                                    valuePropName="checked"
                                    label="Kích hoạt"
                                >
                                    <Switch />
                                </Form.Item>
                            </Col>
   
                        </Row>
                        <div style={{border:"1px solid red", padding:"10px 10px"}}>
                            <h2>Nhập biến thể sản phẩm</h2> 
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item
                                        name="title"
                                        label="Tên biến thể 1"
                                        rules={[{ required: true, message: 'Please enter biến thể ' }]}
                                    >
                                        <Input style={{ borderRadius: "5px" }} placeholder="Please enter biến thể" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        name="crb"
                                        label="Tên biến thể"
                                        rules={[{ required:false }]}
                                    >
                                        <Input style={{ borderRadius: "5px" }}  disabled/>
                                    </Form.Item>
                                </Col>
                                <Col  span={6}>
                                <div style={{ marginBottom: 16 }}>
                                    <TweenOneGroup
                                        enter={{
                                        scale: 0.8,
                                        opacity: 0,
                                        type: 'from',
                                        duration: 100,
                                        onComplete: e => {
                                            e.target.style = '';
                                        },
                                        }}
                                        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                                        appear={false}
                                    >
                                        {tagChild}
                                    </TweenOneGroup>
                                    </div>
                                    {inputVisible && (
                                    <Input
                                        ref={this.saveInputRef}
                                        type="text"
                                        size="small"
                                        style={{ width: 78 }}
                                        value={inputValue}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleInputConfirm}
                                        onPressEnter={this.handleInputConfirm}
                                    />
                                    )}
                                    {!inputVisible && (
                                    <Tag onClick={this.showInput} className="site-tag-plus">
                                        <PlusOutlined /> New Tag
                                    </Tag>
                                    )}
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        name="active"
                                        valuePropName="checked"
                                        label="Kích hoạt"
                                    >
                                        <Switch />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </Modal>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        // catogory:select(state, 'productReducer', 'items'),
        product: select(state, 'productReducer', 'items'),
        isFetching: select(state, 'productReducer', 'isFetching'),
        meta: select(state, 'productReducer', 'meta'),

    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        // getAll: (filterOptions) => {
        //     dispatch(getAll(filterOptions));
        //   },
        inSertProduct: (user, meta) => {
            dispatch(inSertProduct(user, meta));
        },
        updateProduct: (user, meta) => {
            dispatch(updateProduct(user, meta));
        },
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAddProduct);
