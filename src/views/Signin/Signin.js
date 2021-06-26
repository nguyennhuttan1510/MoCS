import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, notification, Space } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./style.scss";
import { useHistory } from "react-router";

import Authenticator from "action/Login";
import { useDispatch } from "react-redux";
import { getProfile } from "Reduces/staffs";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Signin = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Sign In Failed",
      description: "username or password was incorrect",
    });
  };

  const onFinish = (values) => {
    const acc = {
      username: values.username,
      password: values.password,
    };
    Authenticator.signin(acc).then((response) => {
      console.log(response);
      if (!response) {
        openNotificationWithIcon("error");
        return;
      }
      if (response.status && response.data) {
        dispatch(getProfile(response.data));
        //DIVIDE PAGE FOR POSITION
        if (response.data?.position === "Admin") {
          history.push("/admin");
          return;
        }
        history.push("/");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const initValue = {
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Mininum 5 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  };

  const formik = useFormik(initValue);

  return (
    <div className="form-login">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // onSubmit={formik.handleSubmit}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
          // autoComplete="off"
          // type="text"
          // name="username"
          // value={formik.values.username}
          // onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
          // value={formik.values.passwold}
          // name="passwold"
          // onChange={formik.handleChange}
          />
          {/* {formik.errors.passwold && formik.touched.passwold && (
            <p>{formik.errors.passwold}</p>
          )} */}
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signin;
