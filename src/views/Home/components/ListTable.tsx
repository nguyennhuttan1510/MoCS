import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import { Table } from '../../../util/Table';
import { IListTable } from '../../../interfaces/Home';
const ListTable: React.FunctionComponent<IListTable> = (props) => {
    const { handleSelectTable } = props;
    return (
        <>
            <Row>
                {Table.map((item, key) =>
                    <Col className="list_table" span={4}>
                        <div className="table" onClick={() => { handleSelectTable(item) }}>
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
