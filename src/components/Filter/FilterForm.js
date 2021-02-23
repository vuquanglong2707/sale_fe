import { Input } from 'antd';
import React, { Component } from 'react'
const { Search } = Input;
class FilterForm extends Component {
    render() {
        return (
            <>
                <Search placeholder="Tìm kiếm"
                    onSearch={value => this.props.onChange(value)}
                    size="large"
                    style={{ width: 300, borderRadius: 10, border: '1px solid white' }}
                />
            </>
        )
    }
}

export default FilterForm;
