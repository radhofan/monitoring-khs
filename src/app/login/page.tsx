'use client';
import { Button, Form, Input, Typography, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  type LoginFormValues = {
    email: string;
    password: string;
  };

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        message.success('Login successful!');
        router.push('/');
      } else {
        message.error(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Network error:', err);
      message.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '100px auto',
        padding: 24,
        border: '1px solid #d9d9d9',
        borderRadius: 8,
      }}
    >
      <Title level={2} style={{ textAlign: 'center' }}>
        Login
      </Title>
      <Form name="login" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
