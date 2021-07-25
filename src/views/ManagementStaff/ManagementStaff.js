import React from "react";

import ModalHome from "components/Modal/Modal";
import "style/_Home.scss";
import { Tabs } from "antd";

import "./style.scss";
import { useState } from "react";
import { createStaff } from "action/Staff";
import { openNotificationWithIcon } from "components/Notification/Notification";
import ManageStaff from "./ManageStaff";
import TargetStaff from "./TargetStaff";
import { useDispatch } from "react-redux";
import {
  handleGetAllManagement,
  handleGetAllStaff,
} from "util/socket/actionHome";

const ManagementStaff = (props) => {
  const dispatch = useDispatch();
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
        <TabPane tab="STAFF" key="1">
          <ManageStaff setIsVisible={setIsVisible} />
        </TabPane>
        <TabPane tab="MANAGEMENT" key="2">
          <TargetStaff />
        </TabPane>
      </Tabs>
    </div>
  );
};

ManagementStaff.propTypes = {};

export default ManagementStaff;
