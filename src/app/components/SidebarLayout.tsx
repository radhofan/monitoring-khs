'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  ApartmentOutlined,
  FileAddOutlined,
  FileTextOutlined,
  MailOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { usePathname } from 'next/navigation';

const { Sider, Header, Content, Footer } = Layout;

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const selectedKey = (() => {
    if (pathname === '/') return '1';
    if (pathname.startsWith('/pengajuanBaru')) return '2';
    if (pathname.startsWith('/daftarVendor')) return '3';
    return '';
  })();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top: Logo + Menu */}
        <div style={{ flexGrow: 1 }}>
          <div
            style={{
              height: 64,
              margin: 16,
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 12,
              textAlign: 'center',
              lineHeight: '32px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {collapsed ? 'MONITORING' : 'APLIKASI MONITORING KHS'}
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ marginTop: 8 }}
            items={[
              {
                key: '1',
                icon: <FileTextOutlined />,
                label: <Link href="/">Daftar Kontrak</Link>,
              },
              {
                key: '2',
                icon: <FileAddOutlined />,
                label: <Link href="/pengajuanBaru">Pengajuan Baru</Link>,
              },
              {
                key: '3',
                icon: <TeamOutlined />,
                label: <Link href="/daftarVendor">Daftar Vendor</Link>,
              },
            ]}
          />
        </div>
        <div style={{ padding: 16, color: '#fff' }}>
          {!collapsed && (
            <>
              <div style={{ marginBottom: '390%' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <UserOutlined />
                <span style={{ fontSize: 16, fontWeight: 'bold' }}>Radho Ramdhani</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <MailOutlined />
                <span style={{ fontSize: 14 }}>radho@email.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <ApartmentOutlined />
                <span style={{ fontSize: 14 }}>Bidang Perencanaan</span>
              </div>
            </>
          )}
        </div>
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s ease' }}>
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>© 2025 PLN KHS Monitoring System</Footer>
      </Layout>
    </Layout>
  );
}
