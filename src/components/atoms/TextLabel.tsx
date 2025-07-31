'use client';
import { Typography } from 'antd';

const { Text } = Typography;

export default function TextLabel({ children }: { children: React.ReactNode }) {
  return <Text>{children}</Text>;
}
