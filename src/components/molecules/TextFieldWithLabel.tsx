import TextInput from '@/components/atoms/TextInput';
import TextLabel from '@/components/atoms/TextLabel';

type Props = {
  label: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  placeholder?: string;
  status?: string;
};

export default function TextFieldWithLabel({
  label,
  value,
  onChange,
  placeholder,
  status,
}: Props) {
  return (
    <div>
      <TextLabel>{label}</TextLabel>
      <TextInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        status={status ? 'error' : ''}
      />
    </div>
  );
}
