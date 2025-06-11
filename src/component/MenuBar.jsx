import React, { useContext } from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import {
  HomeOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  PictureOutlined
} from '@ant-design/icons';

const MenuBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // 獲取用戶狀態和登出函數

  // 定義主選單的 items
  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
      onClick: () => navigate('/'),
    },
    {
      key: 'user',
      icon: <UserOutlined />,
      label: 'User',
    },
    {
      key: 'auth',
      icon: <UserOutlined />,
      label: user ? user.username : 'Auth', // 顯示用戶名或 "Auth"
      children: user
        ? [ // 如果用戶已登入，顯示登出按鈕
            { 
              key: 'logout', 
              icon: <LogoutOutlined />, 
              label: '登出', 
              onClick: () => {
                logout(); // 執行登出
                navigate('/'); // 跳轉到首頁
              }
            },
          ]
        : [ // 如果用戶未登入，顯示登入和註冊按鈕
            { 
              key: 'login', 
              icon: <LoginOutlined />, 
              label: '登入', 
              onClick: () => navigate('/login') 
            },
            { 
              key: 'register', 
              icon: <UserAddOutlined />, 
              label: '註冊', 
              onClick: () => navigate('/register') 
            },
          ],
    },
    {
      key: 'foodRecognizer',
      icon: <PictureOutlined />,
      label: 'foodRecognizer',
      onClick: () => navigate('/foodRecognizer'),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      {/* 主選單 */}
      <Menu mode="horizontal" theme="dark" items={menuItems} />
    </div>
  );
};

export default MenuBar;