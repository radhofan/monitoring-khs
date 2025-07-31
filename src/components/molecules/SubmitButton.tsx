import PrimaryButton from '@/components/atoms/PrimaryButton';

type Props = {
  onClick: () => void;
  loading?: boolean;
  children: React.ReactNode;
};

export default function SubmitButton({ onClick, loading, children }: Props) {
  return (
    <PrimaryButton onClick={onClick} loading={loading}>
      {children}
    </PrimaryButton>
  );
}
