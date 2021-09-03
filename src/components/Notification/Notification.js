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
