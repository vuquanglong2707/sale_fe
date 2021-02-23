import {Form, Button, DatePicker, Select } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';
const { Option } = Select;

class FilterFormAboutTime extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            showFilter : false
        }
    }  

    onShowFilter = () => {
        this.setState({ showFilter: !this.state.showFilter });
    }
      
    render() {
        const { showFilter } = this.state;
        return (
            <>
                <h4> 
                    Chọn mốc thời gian
                    <Select 
                        style={{marginLeft: 20, width: "150px"}}
                        placeholder="Please choose the role"
                        defaultValue={this.props.dataSelected[0].value}
                        onChange={(e) => this.props.onSelect(e)}
                    >
                        {this.props.dataSelected.map(item => (<Option value={item.value} key={item.id}>{item.name}</Option>))}          
                    </Select>
                </h4>
                <span onClick={this.onShowFilter}>Tìm trong khoảng thời gian</span>
                {
                    showFilter && (
                        <Form style={{marginTop: 20}} onFinish={(e)=>this.props.onFilter(e)} >
                            <Form.Item 
                                    name="fromDate"
                                    label="Từ ngày"
                                    rules={[{ required: true, message: 'Mời chọn thời gian' }]}
                                >
                                <DatePicker
                                    disabledDate={current => current && current > moment().endOf('day')}
                                />
                            </Form.Item>
                            <Form.Item 
                                    name="toDate"
                                    label="Đến ngày"
                                    rules={[{ required: true, message: 'Mời chọn thời gian' }]}
                                >
                                <DatePicker
                                    disabledDate={current => current && current > moment().endOf('day')}
                                />
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" htmlType="submit">
                                    Tìm kiếm
                                </Button>
                            </Form.Item>
                        </Form>  
                    )
               }
              
            </>
        )
    }
}

export default FilterFormAboutTime;
