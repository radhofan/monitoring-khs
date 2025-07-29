'use client';

import { Button, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter(); 

  const onFinish = (values: any) => {
    console.log('Login values:', values);
    router.push('/'); 
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 24, border: '1px solid #d9d9d9', borderRadius: 8 }}>
      <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
      <Form
        name="login"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input placeholder="Enter your username" />
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
