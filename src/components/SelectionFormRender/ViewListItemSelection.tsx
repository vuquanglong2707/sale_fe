

import React  from 'react'
import {Card, Button, Row, Col, Image, List, Divider  } from 'antd';
import { EyeTwoTone, ShoppingTwoTone } from '@ant-design/icons';
import WithLoadingHOC from '../../hoc/loading';
import toJS from '../../hoc/toJS';
import * as Config from '../../utils/Config';

export  interface dataItemSelect {
  data: any,
  meta: any,
  onChangePage : () => void,
  onChangeSize: () => void,
  onView?: (id: any) => void,
  onSelection?: (id: any) => void,
  titleSelect?: String, 
  titleView?: String
};

const ViewListItemSelection: React.FC<dataItemSelect> = (props) => {
  const {data, meta, onChangePage, onChangeSize, onView, onSelection, titleSelect, titleView } = props;
  return (
    <>
      <List
        grid={{ gutter: 24, column: 3 }}
        dataSource={data}
        rowKey={(record: any) => record.id}
        pagination={{
          size: "small",
          current: meta?.current ? meta?.current : 0,
          total: meta?.total,
          pageSize: meta?.pageSize ? meta?.pageSize : 9,
          onChange: onChangePage,
          showSizeChanger: true,
          pageSizeOptions: ['9', '15', '18', '24'],
          onShowSizeChange: onChangeSize,
        }}
        renderItem={(item: any) =>(
          <List.Item key={item?.id}>
            <Card style={{backgroundColor:'#f0f2f5'}}>
              <Row gutter={24}>
                <Col span={24}>
                  <Card style={{fontFamily:'Roboto',borderRadius:5}} key={item.id}>                           
                    <Row gutter={24}>
                      <Col span={24}>
                        <div>                           
                            <Image 
                              preview={false}                   
                              src={`${Config.API_URL}${Array.isArray(item?.images) ? item?.images[0] : item.images ? item.images : '/null'}`}
                            />  
                        </div>
                        <div >
                          <h1 style={{paddingTop:20,fontWeight:'bold'}}>
                              {item.title}
                          </h1>
                        </div>
                        {item.owner && (
                          <p style={{fontSize:16}}>
                              <strong>Tác giả:</strong>
                              <a href="/#" 
                                style={{
                                  textDecoration:"none",
                                  fontWeight:'bold'
                                  }}
                              > 
                                {item.owner}
                              </a>
                          </p>
                        )}
                        {item.sku && (
                          <p style={{fontSize:16}}>
                              <strong>mã sản phẩm :</strong>
                              <span
                                style={{
                                  textDecoration:"none",
                                  fontWeight:'bold'
                                  }}
                              > 
                                {item.sku}
                              </span>
                          </p>
                        )}
                        {
                          titleView && onView && (
                            <>
                              <Button onClick ={() => onView(item.id) }target="_blank" > <EyeTwoTone /> {titleView} </Button>
                              <Divider type="vertical"></Divider>
                            </>
                          )
                        }
                        {
                          titleSelect && onSelection && (
                            <Button onClick={() => onSelection(item.id)} > <ShoppingTwoTone />  {titleSelect}</Button>
                          )
                        }
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
export default WithLoadingHOC(toJS(ViewListItemSelection));