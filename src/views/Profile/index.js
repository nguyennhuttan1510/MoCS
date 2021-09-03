import { StarFilled } from "@ant-design/icons";
import { Col, Row } from "antd";
import Authenticator from "api/Auth";
import { openNotificationWithIcon } from "components/Notification/Notification";
import { convertDate, formatMoney } from "config/func/handleDate";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

const range = [1, 2, 3, 4];

const Profile = (props) => {
  const [profile, setProfile] = useState({});
  let { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await Authenticator.getStaff(id);
      if (res.status) {
        setProfile(res.data);
      } else {
        openNotificationWithIcon("error", "Failed", res.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="profile-page">
      <Row justify="space-around">
        <Col span={6}>
          <div className="salary">
            <div className="title">
              <h3>Salary Table</h3>
            </div>
            <div className="info">
              <div>
                <span>Top range:</span>
                <div>
                  {range.map(() => {
                    return <StarFilled />;
                  })}
                </div>
              </div>
              <div>
                <span>Salary:</span>
                <h4>
                  <b>{formatMoney(profile.salary) || 0}</b>
                </h4>
              </div>
              <div>
                <span>Bonus:</span>
                <h4>
                  <b>{formatMoney(profile.bonus) || 0}</b>
                </h4>
              </div>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="profile">
            <div className="title">
              <h2 style={{ fontSize: "2.3vw" }}>Profile</h2>
            </div>
            <div
              className="avatar"
              style={{
                backgroundImage: profile.avatar
                  ? `url("http://localhost:5000/public/uploads/1626881544984-1f1d4099-6fb5-45e8-9bdb-ab5e155c291d.jpg")`
                  : "black",
              }}
            ></div>
          </div>
        </Col>
        <Col span={6}>
          <div className="detail">
            <div className="title">
              <h3>Detail</h3>
            </div>
            <div className="info">
              <div>
                <span>Full Name:</span>
                <h4>
                  <b>{profile.name || "No Data"}</b>
                </h4>
              </div>
              <div>
                <span>Age:</span>
                <h4>
                  <b>20</b>
                </h4>
              </div>
              <div>
                <span>Phone:</span>
                <h4>
                  <b>{profile.phone || "No phone"}</b>
                </h4>
              </div>
              <div>
                <span>Position:</span>
                <h4>
                  <b>{profile.position || "No position"}</b>
                </h4>
              </div>
              <div>
                <span>Created At:</span>
                <h4>
                  <b>{convertDate(profile.createdAt) || "Null"}</b>
                </h4>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

Profile.propTypes = {};

export default Profile;
