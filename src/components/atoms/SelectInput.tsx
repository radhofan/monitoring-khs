'use client';
import { Select } from 'antd';
import { DropdownOption } from '@/types/DropdownOption';

type Props = {
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (val: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  status?: '' | 'error';
};

export default function SelectInput({
  value,
  onChange,
  options,
  placeholder,
  status,
}: Props) {
  return (
    <Select
      value={value}
      onChange={onChange}
      style={{ width: '100%' }}
      placeholder={placeholder}
      status={status}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value}>
          {opt.label}
        </Select.Option>
      ))}
    </Select>
  );
}
