import React, { useState } from "react";
import ChartRevenue from "./components/ChartRevenue";
import ChartProfit from "./components/ChartProfit";
import ChartBestSeller from "./components/ChartBestSeller";
import ModalHome from "components/Modal/Modal";

import { openNotificationWithIcon } from "components/Notification/Notification";

import "style/_Home.scss";

import { upCaseFirst } from "config/func/handleString";
import { formatMoney } from "config/func/handleDate";
import { Row, Col, Button, Space, Tabs } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import {
  createMenu,
  deleteMenu,
  updateMenu,
  createTable,
  updateTable,
  deleteTable,
} from "api/TableAndMenu";
// import { listMenu } from "reduces/dashboard";
import { useSelector } from "react-redux";
import TableComponent from "components/Table/Table";
import {
  handleGetAllMenu,
  handleGetAllTableDefault,
} from "util/socket/ActionHome";

const Admin = () => {
  // const dispatch = useDispatch();
  const tableActive = useSelector((state) => state.dashboard.data);
  const listMenu = useSelector((state) => state.dashboard.listMenu);
  const listTable = useSelector((state) => state.dashboard.listTable);
  const dataBestSeller = useSelector(
    (state) => state.management.managementBestSeller
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [createForm, setCreateForm] = useState({});
  const [contentModal, setContentModal] = useState("createMenu");

  const { TabPane } = Tabs;

  const handleClickOK = async () => {
    const res = isUpdate
      ? contentModal === "createTable"
        ? await updateTable(createForm)
        : await updateMenu(createForm)
      : contentModal === "createTable"
      ? await createTable(createForm)
      : await createMenu(createForm);
    if (res.status) {
      openNotificationWithIcon("success", "Success", res.message);
    } else {
      openNotificationWithIcon("error", "Fail", res.message);
    }
    if (contentModal === "createMenu") {
      handleGetAllMenu();
    } else if (contentModal === "createTable") {
      handleGetAllTableDefault();
    }
    setCreateForm({});
  };

  const handleChangeData = (value, name) => {
    setCreateForm({ ...createForm, [name]: value });
  };
  const handleSetIsVisible = () => {
    setIsVisible(false);
  };

  const dataListMenu =
    listMenu &&
    [...listMenu.menu_food, ...listMenu.menu_drink, ...listMenu.other].map(
      (e, index) => {
        return {
          id: e.id,
          count: index + 1,
          name: e.name,
          price: e.price,
          discount: e.discount,
          category: e.category,
        };
      }
    );

  const dataListTable =
    listTable &&
    listTable.map((e, index) => ({
      count: index + 1,
      id: e.id,
      name: e.name,
    }));

  const handleDeleteMenu = async (idMenu) => {
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

  const handleDeleteTable = async (idTable) => {
    if (!idTable) return;
    await deleteTable(idTable)
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
    handleGetAllTableDefault();
  };

  const columnsListMenu = [
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{upCaseFirst(text)}</b>,
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
              handleDeleteMenu(record.id);
            }}
            style={{ color: "red" }}
          />
          <FormOutlined
            onClick={() => {
              setIsVisible(true);
              setIsUpdate(true);
              setCreateForm({
                id: record.id,
                name: record.name,
                price: record.price,
                category: record.category,
                discount: record.discount,
              });
            }}
            style={{ color: "green" }}
          />
        </Space>
      ),
    },
  ];

  const columnsListTable = [
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <DeleteOutlined
            onClick={() => {
              handleDeleteTable(record.id);
            }}
            style={{ color: "red" }}
          />
          <FormOutlined
            onClick={() => {
              setIsVisible(true);
              setIsUpdate(true);
              setCreateForm({
                id: record.id,
                name: record.name,
              });
            }}
            style={{ color: "green" }}
          />
        </Space>
      ),
    },
  ];

  const convertDataBestSeller = () => {
    let result = [];
    if (!dataBestSeller) return [];
    result = dataBestSeller.map((e) => ({
      category: e.name_food,
      value: e.count,
    }));
    return result;
  };
  const dataConvertBestSeller = convertDataBestSeller();
  return (
    <>
      <ModalHome
        data={createForm}
        contents={contentModal}
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
      <Tabs
        defaultActiveKey="1"
        onChange={(key) => {
          if (key === "1") {
            setContentModal("createMenu");
          } else if (key === "2") {
            setContentModal("createTable");
          }
        }}
      >
        <TabPane tab="MENU" key="1">
          <div style={{ marginBottom: "20px" }}>
            <Row justify="end">
              <Col span={4}>
                <div style={{ float: "right" }}>
                  <Button
                    disabled={tableActive && tableActive.length !== 0}
                    onClick={() => {
                      setIsVisible(true);
                      setIsUpdate(false);
                      setCreateForm({});
                    }}
                  >
                    Create Menu
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          <TableComponent data={dataListMenu} columns={columnsListMenu} />
        </TabPane>
        <TabPane tab="TABLE" key="2">
          <div style={{ marginBottom: "20px" }}>
            <Row justify="end">
              <Col span={4}>
                <div style={{ float: "right" }}>
                  <Button
                    disabled={tableActive && tableActive.length !== 0}
                    onClick={() => {
                      setIsVisible(true);
                      setIsUpdate(false);
                      setCreateForm({});
                    }}
                  >
                    Create Table
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          <TableComponent data={dataListTable} columns={columnsListTable} />
        </TabPane>
        <TabPane tab="BEST SELLER" key="3">
          <Row>
            <Col span={24}>
              <ChartBestSeller
                dataBestSeller={dataConvertBestSeller}
                columns={dataListMenu.name}
                id={"chart_bestseller"}
              />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </>
  );
};

export default Admin;
