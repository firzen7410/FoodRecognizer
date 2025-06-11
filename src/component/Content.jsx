import React from 'react';
import { Outlet } from 'react-router-dom';

const Content = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Outlet /> {/* 這裡會根據路由動態渲染 LoginPage 或 RegisterPage */}
    </div>
  );
};

export default Content;