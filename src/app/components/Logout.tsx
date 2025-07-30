'use client';

import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });

      if (!res.ok) throw new Error('Logout failed');

      message.success('Logged out successfully');
      setOpen(false);

      // Optional: clear auth state here (e.g. Zustand)

      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
      message.error('Logout failed');
    }
  };

  return (
    <>
      <Button
        type="primary"
        danger
        icon={<LogoutOutlined />}
        onClick={showModal}
      >
        Logout
      </Button>

      <Modal
        title="Confirm Logout"
        open={open}
        onOk={handleLogout}
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
