'use client';
import { Button } from 'antd';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
};

export default function PrimaryButton({ children, onClick, loading }: Props) {
  return (
    <Button
      type="primary"
      size="large"
      onClick={onClick}
      loading={loading}
      block
    >
      {children}
    </Button>
  );
}
