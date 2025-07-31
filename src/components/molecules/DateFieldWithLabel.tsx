import DateInput from '@/components/atoms/DateInput';
import TextLabel from '@/components/atoms/TextLabel';
import { Dayjs } from 'dayjs';

type Props = {
  label: string;
  value: Dayjs | null;
  // eslint-disable-next-line no-unused-vars
  onChange: (val: Dayjs | null) => void;
  // eslint-disable-next-line no-unused-vars
  disabledDate?: (date: Dayjs) => boolean;
  status?: string;
};

export default function DateFieldWithLabel({
  label,
  value,
  onChange,
  disabledDate,
  status,
}: Props) {
  return (
    <div>
      <TextLabel>{label}</TextLabel>
      <DateInput
        value={value}
        onChange={onChange}
        status={status ? 'error' : ''}
        disabledDate={disabledDate}
      />
    </div>
  );
}
