import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './style.scss';
import { useHistory } from 'react-router';

import Authenticator from 'action/Login';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Signin = () => {
  const history = useHistory();

  const onFinish = (values) => {
    console.log('Success:', values);
    const acc = {
      username: values.username,
      password: values.password,
    };
    // axios
    //   .post('https://localhost:5000/login/', acc)
    //   .then((res) => console.log(res));
    Authenticator.signin(acc).then((response) => {
      if (!response) return;
      try {
        if (response.status) {
          history.push('/');
          console.log('Successful');
        }
      } catch (error) {
        console.log('fail');
      }
    });
    // if (checkLogin.status) {
    //   history.push('/');
    // }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const initValue = {
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, 'Mininum 5 characters')
        .max(15, 'Maximum 15 characters')
        .required('Required!'),
      password: Yup.string()
        .min(8, 'Minimum 8 characters')
        .required('Required!'),
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
          rules={[{ required: true, message: 'Please input your username!' }]}
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
          rules={[{ required: true, message: 'Please input your password!' }]}
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
