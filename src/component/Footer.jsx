import React from 'react';
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#f0f2f5', padding: '24px 0', marginTop: '48px', borderTop: '1px solid #d9d9d9' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
        <Space direction="vertical" size="small">
          <Text type="secondary">
            &copy; {new Date().getFullYear()} 110321075. All rights reserved.
          </Text>
          <Space size="middle">
            <Link href="https://github.com/yourname" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
            <Link href="https://linkedin.com/in/yourname" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Link>
            <Link href="https://twitter.com/yourname" target="_blank" rel="noopener noreferrer">
              Twitter
            </Link>
          </Space>
        </Space>
      </div>
    </footer>
  );
}
