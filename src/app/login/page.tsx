'use client';

import { Button, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter();

  type LoginFormValues = {
    email: string;
    password: string;
  };

  const onFinish = async (values: LoginFormValues) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        router.push('/');
      } else {
        const data = await res.json();
        console.error('Login error:', data.error);
      }
    } catch (err) {
      console.error('Network error:', err);
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
          rules={[{ required: true, message: 'Please enter your email!' }]}
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
          <Button type="primary" htmlType="submit" block>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
