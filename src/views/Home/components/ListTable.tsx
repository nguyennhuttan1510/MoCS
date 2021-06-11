import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import { Table } from '../../../util/Table';
import { IListTable } from '../../../interfaces/Home';



const ListTable: React.FunctionComponent<IListTable> = (props) => {
    const { handleSelectTable, listTable } = props;
    const isActiveTable =
        (item: any) => {
            const isNewTbale = listTable.some(e => e.id === item.id)
            const isOrderedTbale = listTable.some(e => e.id === item.id && e.menu.length > 0)
            console.log("is new", isNewTbale)
            console.log("is process", isOrderedTbale)
            if (isNewTbale && isOrderedTbale) {
                return "processing"
            }
            if (isNewTbale) {
                return "active"
            }
        }
    return (
        <>
            <Row>
                {Table.map((item, key) =>
                    <Col key={key} className="list_table" span={4}>
                        <div className={`table noselect ${isActiveTable(item)}`} onClick={() => { handleSelectTable(item) }}>
                            <h4>{item.name}</h4>
                        </div>
                    </Col>)}
                {/* <Col className="list_table" span={4}>
                    <div className="table" >
                        <h4>table 1</h4>
                    </div>
                </Col>
                <Col className="list_table" span={4}>
                    <div className="table">
                        <h4>table 2</h4>
                    </div>
                </Col>
                <Col className="list_table" span={4}>
                    <div className="table">
                        <h4>table 3</h4>
                    </div>
                </Col>
                <Col className="list_table" span={4}>
                    <div className="table">
                        <h4>table 4</h4>
                    </div>
                </Col>
                <Col className="list_table" span={4}>
                    <div className="table">
                        <h4>table 4</h4>
                    </div>
                </Col>
                <Col className="list_table" span={4}>
                    <div className="table">
                        <h4>table 4</h4>
                    </div>
                </Col>
                <Col className="list_table" span={4}>
                    <div className="table">
                        <h4>table 4</h4>
                    </div>
                </Col>
                <Col className="list_table" span={4}>
                    <div className="table">
                        <h4>table 4</h4>
                    </div>
                </Col>
                <Col className="list_table" span={4}>
                    <div className="table">
                        <h4>table 4</h4>
                    </div>
                </Col> */}
            </Row>
        </>
    );
};

ListTable.propTypes = {};

export default ListTable;
