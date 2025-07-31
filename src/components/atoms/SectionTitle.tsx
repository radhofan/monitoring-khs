'use client';
import { Typography } from 'antd';

const { Title } = Typography;

type Props = {
  children: React.ReactNode;
};

export default function SectionTitle({ children }: Props) {
  return <Title level={4}>{children}</Title>;
}

export { Title };
