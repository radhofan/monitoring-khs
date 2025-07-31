import NumberInput from '../atoms/NumberInput';
import TextLabel from '../atoms/TextLabel';

type Props = {
  label: string;
  value: number | null;
  // eslint-disable-next-line no-unused-vars
  onChange: (val: number | null) => void;
  placeholder?: string;
  status?: string;
};

export default function NumberFieldWithLabel({
  label,
  value,
  onChange,
  placeholder,
  status,
}: Props) {
  return (
    <div>
      <TextLabel>{label}</TextLabel>
      <NumberInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        status={status ? 'error' : ''}
      />
    </div>
  );
}
