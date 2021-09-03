import React from "react";

import ModalHome from "components/Modal/Modal";
import "style/_Home.scss";
import { Tabs } from "antd";

import "./style.scss";
import { useState } from "react";
import { createStaff } from "api/Staff";
import { openNotificationWithIcon } from "components/Notification/Notification";
import InfoStaff from "./InfoStaff";
import SalaryStaff from "./Salary";
import {
  handleGetAllManagement,
  handleGetAllStaff,
} from "util/socket/ActionHome";

const ManagementStaff = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formCreate, setFormCreate] = useState({});

  const handleChangeData = (value, name) => {
    setFormCreate({ ...formCreate, [name]: value });
  };
  const { TabPane } = Tabs;

  const handleClickOK = async () => {
    await createStaff(formCreate)
      .then((res) => {
        if (res.status) {
          openNotificationWithIcon("success", "Success", res.message);
        } else {
          openNotificationWithIcon("error", "Fail", res.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    handleGetAllStaff();
    handleGetAllManagement();
  };

  const handleSetIsVisible = () => {
    setIsVisible(false);
  };

  return (
    <div className="management-admin">
      <ModalHome
        data={formCreate}
        contents={"createStaff"}
        isVisible={isVisible}
        handleChangeData={handleChangeData}
        handleClickOK={handleClickOK}
        handleSetIsVisible={handleSetIsVisible}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab="INFORMATION" key="1">
          <InfoStaff setIsVisible={setIsVisible} />
        </TabPane>
        <TabPane tab="SALARY" key="2">
          <SalaryStaff />
        </TabPane>
      </Tabs>
    </div>
  );
};

ManagementStaff.propTypes = {};

export default ManagementStaff;
