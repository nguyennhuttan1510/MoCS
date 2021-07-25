import React, { useState } from "react";
import PropTypes from "prop-types";
import ChartRevenue from "./componrnts/ChartRevenue";
import ChartProfit from "./componrnts/ChartProfit";
import ChartBestSeller from "./componrnts/ChartBestSeller";
import ModalHome from "components/Modal/Modal";
import { openNotificationWithIcon } from "components/Notification/Notification";

import "style/_Home.scss";

import { upCaseFirst } from "config/func/handleString";
import { formatMoney } from "config/func/handleDate";
import { Row, Col, Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { createMenu, getAllMenu, deleteMenu } from "action/Default";
import { listMenu } from "Reduces/dashboard";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "components/Table/Table";
import { handleGetAllMenu } from "util/socket/actionHome";

// export interface IAdmin {}

const Admin = (props) => {
  const dispatch = useDispatch();
  const tableActive = useSelector((state) => state.dashboard.data);
  const listMenuDisplay = useSelector((state) => state.dashboard.listMenu);
  const [isVisible, setIsVisible] = useState(false);
  const [createForm, setCreateForm] = useState({});

  const handleClickOK = async () => {
    await createMenu(createForm)
      .then((res) => {
        if (res.status) {
          openNotificationWithIcon("success", "Success", res.message);
        } else {
          openNotificationWithIcon("error", "Fail", res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    handleGetAllMenu();
  };

  const handleChangeData = (value, name) => {
    setCreateForm({ ...createForm, [name]: value });
  };
  const handleSetIsVisible = () => {
    setIsVisible(false);
  };

  const data =
    listMenuDisplay &&
    [
      ...listMenuDisplay.menu_food,
      ...listMenuDisplay.menu_drink,
      ...listMenuDisplay.other,
    ].map((e, index) => {
      return {
        id: e.id,
        count: index + 1,
        name: e.name,
        price: e.price,
        discount: e.discount,
        category: e.category,
      };
    });

  const handleRemoveFood = async (idMenu) => {
    if (!idMenu) return;
    await deleteMenu(idMenu)
      .then((res) => {
        if (res.status) {
          openNotificationWithIcon("success", "Success", res.message);
        } else {
          openNotificationWithIcon("error", "Fail", res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    handleGetAllMenu();
  };

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
      title: "Category",
      dataIndex: "category",
      key: "category",
      // render: (text) => {
      //   upCaseFirst(text);
      // },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (value) => formatMoney(value),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      sorter: (a, b) => a.total_cost - b.total_cost,
      render: (value) => `${value} %`,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <DeleteOutlined
            onClick={() => {
              handleRemoveFood(record.id);
            }}
            style={{ color: "red" }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <ModalHome
        data={createForm}
        contents={"createMenu"}
        isVisible={isVisible}
        handleChangeData={handleChangeData}
        handleClickOK={handleClickOK}
        handleSetIsVisible={handleSetIsVisible}
      />
      {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
      </Row> */}
      <div style={{ marginBottom: "20px" }}>
        <Row justify="end">
          <Col span={4}>
            <div style={{ float: "right" }}>
              <Button
                disabled={tableActive && tableActive.length !== 0}
                onClick={() => {
                  setIsVisible(true);
                }}
              >
                Create Menu
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <TableComponent data={data} columns={columns} />
    </>
  );
};

Admin.propTypes = {};

export default Admin;
