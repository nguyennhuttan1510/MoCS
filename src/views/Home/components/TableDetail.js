import React, { useCallback, useEffect, useState } from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import { openNotificationWithIcon } from "components/Notification/Notification";

import { Row, Col, Tabs, Table, Button, Space, Badge } from "antd";
import ModalHome from "components/Modal/Modal";
import { useCountUp } from "react-countup";
import { useSelector } from "react-redux";
import { defaultTitle } from "config/_INT";
import {
  handlePayBillTable,
  handlePushMenuToChef,
} from "util/socket/ActionHome";
import { formatMoney } from "config/func/handleDate";
import { upCaseFirst } from "config/func/handleString";

var get = require("lodash/get");
var sum = require("lodash/sum");

let config = {
  start: 0,
  end: 0,
  delay: 1000,
  duration: 1.5,
  separator: ".",
};

const TableDetail = (props) => {
  const { order, handleAddMenu, handleRemoveMenu, onClose } = props;
  const table = useSelector((state) => state.dashboard.table);
  const Menu = useSelector((state) => state.dashboard.listMenu);
  const profile = useSelector((state) => state.user.profile);

  const { tableDetail } = defaultTitle;

  const [isVisible, setIsVisible] = useState(false);
  const [isChange, setIsChange] = useState(true);
  const [checkPay, setCheckPay] = useState(0);
  const [priceBill, setPriceBill] = useState({
    cost: {
      cost: 0,
      format: "",
    },
    cash: 0,
  });

  const { TabPane } = Tabs;
  // ============================== CONFIG COL TABLE
  const columns = [
    {
      title: "Name Food",
      dataIndex: "name",
      render: (value) => upCaseFirst(value),
    },
    {
      title: "Count",
      dataIndex: "count",
      sorter: {
        compare: (a, b) => a.count - b.count,
        multiple: 3,
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 2,
      },
      render: (value) => formatMoney(value),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      sorter: {
        compare: (a, b) => a.discount - b.discount,
        multiple: 2,
      },
      render: (value) => `${value} %`,
    },
    {
      title: "Total",
      dataIndex: "total",
      sorter: {
        compare: (a, b) => a.total - b.total,
        multiple: 1,
      },
      render: (value) => formatMoney(value),
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space size="middle">
          {item?.status === "Order" ? (
            <Button
              className="delete"
              onClick={() => {
                handleRemoveMenu(item, table.id);
              }}
            >
              delete
            </Button>
          ) : item?.status === "Pending" ? (
            <div className="noti-table-bill"> Pending </div>
          ) : (
            <div className="noti-table-bill food-done"> Done </div>
          )}
        </Space>
      ),
    },
  ];

  // ============================== END CONFIG COL TABLE

  const handleSetCountUp = () => {
    let start = priceBill.cost.cost;
    return { ...config, start };
  };

  const { countUp, start } = useCountUp(handleSetCountUp());

  useEffect(() => {
    function sumMenu() {
      const cost = sum(order?.menu.map((e) => e.total));
      const format = new Intl.NumberFormat().format(cost);
      return { cost: cost, format: format, title: "Payment" };
    }
    const cost = sumMenu();
    setPriceBill({ cost, cash: 0 });
  }, [order]);

  const listFoodOrder = get(order, "menu", []);
  const isMakeFood = get(order, "isMakeFood");

  const handleSetIsVisible = () => {
    setIsVisible(false);
  };

  const handleChangePriceBill = (value) => {
    let cash = 0;
    setCheckPay(value);
    if (priceBill) {
      cash = value - priceBill.cost.cost;
      setPriceBill((prev) => {
        return { ...prev, cash: cash };
      });
    }
  };
  const handleClickOK = () => {
    if (!order || checkPay <= 0 || priceBill.cash < 0) return;
    start();
    setIsChange(false);
    const payload = {
      id: order.id,
      server: profile,
    };
    handlePayBillTable(payload);
    setTimeout(() => {
      onClose(false);
    }, 2000);
  };

  const handleBadgeFood = useCallback(
    (item) => {
      if (!listFoodOrder) return;
      const isBadge = listFoodOrder.find((e) => e.id === item.id);
      if (!isBadge || isBadge === undefined) return;
      return isBadge.count;
    },
    [listFoodOrder]
  );

  return (
    <div className="dashboard">
      <ModalHome
        contents="priceBill"
        data={priceBill}
        isVisible={isVisible}
        handleSetIsVisible={handleSetIsVisible}
        handleChangeData={handleChangePriceBill}
        handleClickOK={handleClickOK}
      />
      <Button
        className="close_table"
        onClick={() => {
          onClose(false);
        }}
      >
        X
      </Button>
      <div className="wrap_table_detail">
        <div
          className="total_cost"
          onClick={() =>
            isMakeFood || priceBill.cost.cost === 0
              ? setIsVisible(!isVisible)
              : openNotificationWithIcon(
                  "error",
                  "Failed",
                  "Client is ordering, can't pay!"
                )
          }
        >
          {isChange ? `${priceBill.cost.format} VND` : `${countUp} VND`}
        </div>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={tableDetail.tab.food}
            className="tab_table"
            style={{ color: "red" }}
            key="1"
          >
            <Row>
              {Menu?.menu_food.map((item, key) => (
                <Col key={key} className="list_table" span={6}>
                  <Badge count={handleBadgeFood(item)}>
                    <div
                      className="table noselect"
                      onClick={() => {
                        handleAddMenu(item, table.id);
                      }}
                    >
                      <h4>{item.name}</h4>
                    </div>
                  </Badge>
                </Col>
              ))}
            </Row>
          </TabPane>
          <TabPane tab={tableDetail.tab.drink} className="tab_table" key="2">
            <Row>
              {Menu?.menu_drink.map((item, key) => (
                <Col key={key} className="list_table" span={6}>
                  <Badge count={handleBadgeFood(item)}>
                    <div
                      className="table noselect"
                      onClick={() => {
                        handleAddMenu(item, table.id);
                      }}
                    >
                      <h4>{item.name}</h4>
                    </div>
                  </Badge>
                </Col>
              ))}
            </Row>
          </TabPane>
          <TabPane
            tab={tableDetail.tab.bill}
            className="tab_table bold"
            key="3"
          >
            <Table
              columns={columns}
              dataSource={listFoodOrder}
              pagination={false}
            />
            <div className="footer-action">
              <Button
                type="primary"
                shape="round"
                icon={<CloudUploadOutlined />}
                size={"large"}
                onClick={() => {
                  handlePushMenuToChef(table);
                  openNotificationWithIcon(
                    "success",
                    "Success",
                    "Food is making , please wait"
                  );
                }}
                disabled={isMakeFood || listFoodOrder?.length === 0}
              >
                Push
              </Button>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default TableDetail;
