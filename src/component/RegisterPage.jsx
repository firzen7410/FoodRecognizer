import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const RegisterPage = () => {
  const [form] = Form.useForm();

  // 處理表單提交
  const onFinish = async (values) => {
    try {
      const response = await fetch('http://192.168.0.110:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        message.success(data.message || '註冊成功！');
        form.resetFields();
      } else {
        message.error(data.message || '註冊失敗！');
      }
    } catch (error) {
      message.error('網路錯誤，請稍後重試！');
    }
  };

  // 表單驗證失敗時的處理
  const onFinishFailed = (errorInfo) => {
    console.log('表單驗證失敗:', errorInfo);
    message.error('請填寫正確的註冊資訊！');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>註冊帳號</h1>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* 用戶名 */}
        <Form.Item
          name="username"
          rules={[
            { required: true, message: '請輸入用戶名！' },
            { min: 3, message: '用戶名至少 3 個字元！' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="用戶名"
            autoComplete="username" // 添加 autocomplete 屬性
          />
        </Form.Item>

        {/* 密碼 */}
        <Form.Item
          name="password"
          rules={[
            { required: true, message: '請輸入密碼！' },
            { min: 6, message: '密碼至少 6 個字元！' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="密碼"
            autoComplete="new-password" // 添加 autocomplete 屬性
          />
        </Form.Item>

        {/* 確認密碼 */}
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: '請確認密碼！' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('兩次輸入的密碼不一致！'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="確認密碼"
            autoComplete="new-password" // 添加 autocomplete 屬性
          />
        </Form.Item>

        {/* 電子郵件 */}
        <Form.Item
          name="email"
          rules={[
            { required: true, message: '請輸入電子郵件！' },
            { type: 'email', message: '請輸入有效的電子郵件地址！' },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="電子郵件"
            autoComplete="email" // 添加 autocomplete 屬性
          />
        </Form.Item>

        {/* 提交按鈕 */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            註冊
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;