import React, { useState } from "react";
import PropTypes from "prop-types";
import ChartRevenue from "./componrnts/ChartRevenue";
import ChartProfit from "./componrnts/ChartProfit";
import ChartBestSeller from "./componrnts/ChartBestSeller";

import { Row, Col, Button } from "antd";

// export interface IAdmin {}

const Admin = (props) => {
  const [state, setState] = useState(false);
  const {} = props;
  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <ChartRevenue id={"chartRevenue"} />
        </Col>
        <Col span={12}>
          <ChartRevenue id={"chartA"} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ChartProfit id={"chartprofit"} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ChartBestSeller id={"chartbestseller"} />
        </Col>
      </Row>
      <Button
        onClick={(e) => {
          setState(true);
        }}
      >
        click
      </Button>
    </>
  );
};

Admin.propTypes = {};

export default Admin;
