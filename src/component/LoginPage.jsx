import React, { useContext } from 'react';
import { Form, Input, Button, message, Card, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // 引入 AuthContext

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // 獲取 login 函數

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://192.168.0.110:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        message.success(data.message);
        login(data.user); // 更新用戶狀態
        navigate('/'); // 跳轉到首頁
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error('網路錯誤，請稍後重試！');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={20} sm={16} md={12} lg={8}>
        <Card 
          title="用戶登入" 
          variant="outlined"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
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
                autoComplete="username"
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
                autoComplete="current-password"
              />
            </Form.Item>

            {/* 提交按鈕 */}
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block
                style={{ marginBottom: '12px' }}
              >
                登入
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;