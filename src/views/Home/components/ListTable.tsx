import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Badge } from 'antd';
import { Table } from 'config/configTable';
import { IListTable } from 'interfaces/Home';



const ListTable: React.FunctionComponent<IListTable> = (props) => {
    const { handleSelectTable, listTable } = props;
    const isActiveTable =
        (item: any) => {
            const isNewTbale = listTable.some(e => e.id === item.id)
            const isOrderedTbale = listTable.some(e => e.id === item.id && e.isMakeFood)
            if (isNewTbale && isOrderedTbale) {
                return "processing"
            }
            if (isNewTbale) {
                return "active"
            }
        }

    const foodStatusOrder = (item: any) => {
        const table = listTable.find(e => e.id === item.id)
        if (!table) return;
        const countFoodHaveDone = table.menu.filter(e => e.status !== "Done");
        return countFoodHaveDone.length;
    }
    return (
        <>
            <Row>
                {Table.map((item, key) =>
                    <Col key={key} className="list_table" span={4}>
                        <Badge count={foodStatusOrder(item)}>
                            <div className={`table noselect ${isActiveTable(item)}`} onClick={() => { handleSelectTable(item) }}>
                                <h4>{item.name}</h4>
                            </div>
                        </Badge>
                    </Col>)}
            </Row>
        </>
    );
};

ListTable.propTypes = {};

export default ListTable;
