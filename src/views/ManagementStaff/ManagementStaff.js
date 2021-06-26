import React from "react";
import PropTypes from "prop-types";
import ChartManagementStaff from "./components/ChartManagementStaff";
import TableSalary from "./components/TableSalary";

import { Row, Col } from "antd";

import "./style.scss";

const ManagementStaff = (props) => {
  return (
    <>
      <div className="management-admin">
        <Row>
          <Col span={24}>
            <div className="management-staffs">
              <p>Manager Staff</p>
              <ChartManagementStaff id={"staff-management"} />
            </div>
          </Col>
          <Col span={24}>
            <div className="table-salary">
              <p>Salary Staffs</p>
              <TableSalary />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

ManagementStaff.propTypes = {};

export default ManagementStaff;
