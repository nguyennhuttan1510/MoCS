import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tabs, Table, Button } from 'antd';
import { MenuFood, MenuDrink } from '../../../util/Table';
import { ITableDetail } from '../../../interfaces/Home';
var _ = require('lodash');

const TableDetail: React.FunctionComponent<ITableDetail> = (props) => {

    const { order, handleAddMenu, onClose } = props;
    const { TabPane } = Tabs;

    const columns = [
        {
            title: 'Name Food',
            dataIndex: 'name',
        },
        {
            title: 'Count',
            dataIndex: 'count',
            sorter: {
                compare: (a: any, b: any) => a.count - b.count,
                multiple: 3,
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: {
                compare: (a: any, b: any) => a.price - b.price,
                multiple: 2,
            },
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            sorter: {
                compare: (a: any, b: any) => a.discount - b.discount,
                multiple: 2,
            },
        },
        {
            title: 'Total',
            dataIndex: 'total',
            sorter: {
                compare: (a: any, b: any) => a.total - b.total,
                multiple: 1,
            },
        },
    ];

    const data = _.get(order, 'menu');
    // const Bill = useMemo(() => {
    //     console.log("re-render")
    //     const datas = _.get(order, 'menu');
    //     return datas;
    // }, [order]);
    console.log(data)
    function onChange(pagination: any, filters: any, sorter: any, extra: any) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <>

            <Tabs defaultActiveKey="1" centered>
                <Button className="close_table" onClick={() => { onClose(false) }}>close</Button>
                <TabPane tab="Tab 1" key="1">
                    <Row>
                        {MenuFood.map((item, key) => (
                            <Col key={key} className="list_table" span={6}>
                                <div className="table" onClick={() => { handleAddMenu(item, order?.id) }} >
                                    <h4>{item.name}</h4>
                                </div>
                            </Col>
                        ))}
                    </Row>

                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    <Row>
                        {MenuDrink.map((item, key) => (
                            <Col key={key} className="list_table" span={6}>
                                <div className="table" onClick={() => { handleAddMenu(item, order?.id) }}>
                                    <h4>{item.name}</h4>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    <Table columns={columns} dataSource={data} onChange={onChange} />
                </TabPane>
            </Tabs>

        </>
    );
};

TableDetail.propTypes = {};

export default TableDetail;
