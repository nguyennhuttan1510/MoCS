import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { CloudUploadOutlined } from '@ant-design/icons';

import { Row, Col, Tabs, Table, Button, Space, Badge } from 'antd';
import { MenuFood, MenuDrink } from '../../../util/Table';
import { ITableDetail } from '../../../interfaces/Home';
import ModalHome from "components/Modal/Modal"
import { useCountUp } from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { payBill } from 'Reduces/dashboard';
import { defaultTitle } from 'config/_INT'
import { handlePayBillTable, handlePushMenuToChef } from 'util/socket/action';


var get = require('lodash/get');
var sum = require('lodash/sum');

export interface Iredux {
    dashboard: any
}

let config = {
    start: 0,
    end: 0,
    delay: 1000,
    duration: 1.5,
    separator: ".",
    onPauseResume: () => console.log('Paused or resumed!'),
}

const TableDetail: React.FunctionComponent<ITableDetail> = (props) => {
    const { order, handleAddMenu, handleRemoveMenu, onClose } = props;
    const dispatch = useDispatch();
    const table = useSelector((state: Iredux) => state.dashboard.table);
    const { tableDetail } = defaultTitle;

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isChange, setIsChange] = useState<boolean>(true);
    const [content, setContent] = useState<any>({
        cost: {
            cost: 0,
            format: "",
        },
        cash: 0
    });

    const { TabPane } = Tabs;
    // ============================== CONFIG COL TABLE 
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
        {
            title: 'Action',
            key: 'action',
            render: (item: any) => (

                <Space size="middle">
                    <Button className="delete" onClick={() => { handleRemoveMenu(item, table.id) }} >delete</Button>
                </Space>
            ),
        },
    ];

    // ============================== END CONFIG COL TABLE 


    const handleSetCountUp = () => {
        let start = content.cost.cost;
        return { ...config, start }
    }

    const { countUp, start } = useCountUp(handleSetCountUp());

    useEffect(() => {
        function sumMenu() {
            const cost = sum(order?.menu.map(e => e.total))
            console.log(cost)
            const format = new Intl.NumberFormat().format(cost)
            return { cost: cost, format: format, title: "Payment" }
        }
        const cost = sumMenu();
        setContent({ cost, cash: 0 });
    }, [order]);

    const data = get(order, 'menu');

    function onChange(pagination: any, filters: any, sorter: any, extra: any) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const handleSetIsVisible = () => {
        setIsVisible(false)

    }

    const handleChangeContent = (value: number) => {
        let cash = 0;
        if (content) {
            cash = value - content.cost.cost
            setContent((prev: any) => { return { ...prev, cash: cash } });
        }
    }
    const handleClickOK = () => {
        start();
        setIsChange(false)

        if (order) {
            // const action = payBill(order.id);
            // dispatch(action)

            handlePayBillTable(order.id)

            setTimeout(() => {
                onClose(false)
            }, 2000);
        }


    }

    const handleBadgeFood = useCallback((item: any) => {
        if (!data) return
        const isBadge = data.find((e: any) => e.id === item.id)
        console.log(isBadge)
        if (!isBadge || isBadge === undefined) return
        console.log(isBadge.count)
        return isBadge.count

    }, [data])

    return (
        <>
            <ModalHome content={content} isVisible={isVisible} handleSetIsVisible={handleSetIsVisible} handleChangeContent={handleChangeContent} handleClickOK={handleClickOK} />
            <Button className="close_table" onClick={() => { onClose(false) }}>X</Button>
            <div className="wrap_table_detail">
                <div className="total_cost" onClick={() => { setIsVisible(!isVisible) }} >
                    {isChange ? (`${content.cost.format} VND`) : (`${countUp} VND`)}
                </div>
                <Tabs defaultActiveKey="1">

                    <TabPane tab={tableDetail.tab.food} className="tab_table" style={{ color: "red" }} key="1">
                        <Row>
                            {MenuFood.map((item, key) => (
                                <Col key={key} className="list_table" span={6}>
                                    <Badge count={handleBadgeFood(item)}>
                                        <div className="table noselect" onClick={() => { handleAddMenu(item, order?.id) }} >
                                            <h4>{item.name}</h4>
                                        </div>
                                    </Badge>


                                </Col>

                            ))}
                        </Row>

                    </TabPane>
                    <TabPane tab={tableDetail.tab.drink} className="tab_table" key="2">
                        <Row>
                            {MenuDrink.map((item, key) => (
                                <Col key={key} className="list_table" span={6}>
                                    <Badge count={handleBadgeFood(item)}>
                                        <div className="table noselect" onClick={() => { handleAddMenu(item, order?.id) }}>
                                            <h4>{item.name}</h4>
                                        </div>
                                    </Badge>
                                </Col>
                            ))}
                        </Row>
                    </TabPane>
                    <TabPane tab={tableDetail.tab.bill} className="tab_table bold" key="3">
                        <Table columns={columns} dataSource={data} onChange={onChange} pagination={false} />
                        <div className="footer-action"><Button type="primary" shape="round" icon={<CloudUploadOutlined />} size={"large"} onClick={() => { handlePushMenuToChef(table) }} >
                            Push
        </Button></div>
                    </TabPane>
                </Tabs>

            </div>
        </>
    );
};

TableDetail.propTypes = {};

export default TableDetail;
