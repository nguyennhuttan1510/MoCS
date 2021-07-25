import React from "react";
import { Table, Space, Button, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { deleteStaff } from "action/Staff";
import { openNotificationWithIcon } from "components/Notification/Notification";

import { upCaseFirst } from "config/func/handleString";
import { convertDate } from "config/func/handleDate";
import {
  handleGetAllManagement,
  handleGetAllStaff,
} from "util/socket/actionHome";

const ManageStaff = (props) => {
  const { setIsVisible } = props;

  const listStaff = useSelector((state) => state.dashboard.staffs);

  const handleRemoveStaff = async (id) => {
    await deleteStaff(id)
      .then((res) => {
        if (res.status) {
          openNotificationWithIcon("success", "Success", res.message);
        } else {
          openNotificationWithIcon("error", "Failed", res.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    handleGetAllStaff();
    handleGetAllManagement();
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => convertDate(text),
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (tags) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <DeleteOutlined
            onClick={() => {
              handleRemoveStaff(record.id);
            }}
            style={{ color: "red" }}
          />
        </Space>
      ),
    },
  ];

  const data = listStaff.map((e, index) => {
    return {
      id: e.id,
      count: index + 1,
      name: e.name,
      phone: e.phone ? e.phone : "No Phone",
      position: e.position,
      createdAt: e.createdAt,
    };
  });

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Row justify="end">
          <Col span={4}>
            <div style={{ float: "right" }}>
              <Button
                onClick={() => {
                  setIsVisible(true);
                }}
              >
                Create Staff
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

ManageStaff.propTypes = {};

export default ManageStaff;
