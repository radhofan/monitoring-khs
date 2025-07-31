'use client';
import { Input } from 'antd';

type Props = {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (val: string) => void;
  placeholder?: string;
  status?: '' | 'error';
};

export default function TextInput({
  value,
  onChange,
  placeholder,
  status,
}: Props) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      status={status}
    />
  );
}
