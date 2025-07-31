import SelectInput from '@/components/atoms/SelectInput';
import TextLabel from '@/components/atoms/TextLabel';
import { DropdownOption } from '@/types/DropdownOption';

type Props = {
  label: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (val: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  status?: string;
};

export default function SelectFieldWithLabel({
  label,
  value,
  onChange,
  options,
  placeholder,
  status,
}: Props) {
  return (
    <div>
      <TextLabel>{label}</TextLabel>
      <SelectInput
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        status={status ? 'error' : ''}
      />
    </div>
  );
}
