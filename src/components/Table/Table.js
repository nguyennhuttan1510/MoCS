import React from "react";
import { Table, Space } from "antd";

const TableComponent = (props) => {
  const { data, columns } = props;
  return (
    <>
      <Space style={{ marginBottom: 16 }}></Space>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

TableComponent.propTypes = {};

export default TableComponent;
