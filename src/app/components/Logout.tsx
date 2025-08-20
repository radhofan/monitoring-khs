'use client';

import { authStore } from '@/stores/useAuthStore';
import { LogoutOutlined } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Logout() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/logout', { method: 'POST' });

      if (!res.ok) throw new Error('Logout failed');

      authStore.getState().logout();
      message.success('Logged out successfully');
      setOpen(false);
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
      message.error('Logout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="text"
        icon={<LogoutOutlined />}
        onClick={showModal}
        style={{
          color: '#fc0824ff',
          paddingLeft: 0,
        }}
      >
        Logout
      </Button>

      <Modal
        title="Confirm Logout"
        open={open}
        onOk={handleLogout}
        confirmLoading={loading}
        onCancel={handleCancel}
        okText="Logout"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </>
  );
}
