'use client';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

type Props = {
  value: dayjs.Dayjs | null;
  // eslint-disable-next-line no-unused-vars
  onChange: (val: dayjs.Dayjs | null) => void;
  // eslint-disable-next-line no-unused-vars
  disabledDate?: (date: dayjs.Dayjs) => boolean;
  status?: '' | 'error';
};

export default function DateInput({
  value,
  onChange,
  disabledDate,
  status,
}: Props) {
  return (
    <DatePicker
      style={{ width: '100%' }}
      value={value}
      onChange={onChange}
      disabledDate={disabledDate}
      status={status}
    />
  );
}
