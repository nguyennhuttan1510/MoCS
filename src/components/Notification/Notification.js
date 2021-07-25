import React from "react";
import PropTypes from "prop-types";
import { notification } from "antd";

export const openNotificationWithIcon = (
  type = "success",
  message = "",
  description = ""
) => {
  notification[type]({
    message: message,
    description: description,
  });
};
