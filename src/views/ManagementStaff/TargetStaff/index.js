import React from "react";
import { Row, Col } from "antd";

import ChartManagementStaff from "../components/ChartManagementStaff";
import TableSalary from "../../../components/Table/Table";
import { upCaseFirst } from "config/func/handleString";
import { formatMoney } from "config/func/handleDate";

import { useSelector } from "react-redux";

const TargetStaff = (props) => {
  const dataManagement = useSelector(
    (state) => state.management.managementStaff
  );

  const data = dataManagement
    ? dataManagement.map((e, index) => {
        return {
          count: index + 1,
          name: e.name,
          phone: e.phone ? e.phone : "No phone",
          total_cost: e.total_cost + e.bonus + e.salary,
          revenue: e.total_cost,
          salary: e.salary,
          bonus: e.bonus,
        };
      })
    : [];

  const columns = [
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{upCaseFirst(text)}</a>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (value) => value.phone === "No phone",
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      sorter: (a, b) => a.total_cost - b.total_cost,
      render: (value) => formatMoney(value),
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      sorter: (a, b) => a.salary - b.salary,
      render: (value) => formatMoney(value),
    },
    {
      title: "Bonus",
      dataIndex: "bonus",
      key: "bonus",
      sorter: (a, b) => a.bonus - b.bonus,
      render: (value) => formatMoney(value),
    },
    {
      title: "Total",
      dataIndex: "total_cost",
      key: "total_cost",
      sorter: (a, b) => a.total_cost - b.total_cost,
      render: (value) => formatMoney(value),
    },
  ];
  return (
    <div>
      <Row>
        {/* <Col span={24}>
          <div className="management-staffs">
            <p>Manager Staff</p>
            <ChartManagementStaff id={"staff-management"} />
          </div>
        </Col> */}
        <Col span={24}>
          <div className="table-salary">
            <p>Salary Staffs</p>
            <TableSalary data={data} columns={columns} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

TargetStaff.propTypes = {};

export default TargetStaff;
