import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:9000/login", values);
      const data = response.data;
      console.log("Success:", data);
      if (data?.error) {
        notification.open({
          message: "Error",
          description: "Invalid Credentials",
        });
      } else {
        notification.open({
          type: "success",
          message: data?.message,
        });
        localStorage.setItem("token", data?.token);
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
      notification.open({
        message: "Error",
        description: "Invalid Credentials",
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-container">
      <Form
        name="basic"
        style={{
          maxWidth: 600,
        }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input placeholder="Enter your email" type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null} className="login-form-button">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            onClick={() => {
              navigate("/signup");
            }}
          >
            I'm a new user
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
