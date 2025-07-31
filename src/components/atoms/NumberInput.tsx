'use client';
import { InputNumber } from 'antd';

type Props = {
  value: number | null;
  // eslint-disable-next-line no-unused-vars
  onChange: (val: number | null) => void;
  placeholder?: string;
  status?: '' | 'error';
};

export default function NumberInput({
  value,
  onChange,
  placeholder,
  status,
}: Props) {
  return (
    <InputNumber
      value={value ?? undefined}
      onChange={onChange}
      style={{ width: '100%' }}
      placeholder={placeholder}
      status={status}
    />
  );
}
