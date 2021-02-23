import React  from 'react'
import {Select } from 'antd';

export interface dataSelect {
    data: any| [];
    onChange?: () => void;
}

const {Option} = Select;

const SelectionThemes:React.FC<dataSelect> = (props) =>  {
    const {data, onChange} = props;
    return(
    <>
        <Select 
            defaultValue="--Mời chọn chủ đề--"
            style={{ width: 200,float:'right' }} 
            bordered={true}
            onChange={onChange}
        >
        <Option value={"0"}>Tất cả </Option>
        {
            data && data.length > 0 ? data.map((item: any) => {
                return(
                    <Option key={item?.id} value={item?.id}>{item?.title}</Option>
                )
            }): null
        }
        </Select>
            
    </>
            
    );
}

export default SelectionThemes;