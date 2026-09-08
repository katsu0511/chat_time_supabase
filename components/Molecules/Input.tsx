import { ChangeEvent } from 'react';
import useLoading from '@/lib/hooks/useLoading';

type Props = {
  label: string
  type: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
};

export default function Input({ label, type, value, onChange }: Props) {
  const { loading } = useLoading();
  const inputClassName = loading ? 'border-gray-400 cursor-not-allowed' : 'border-[color:var(--color-primary)] cursor-text';

  return (
    <div className='flex justify-center items-center py-2'>
      <label htmlFor={label} className='block w-20'>{label}: </label>
      <input
        id={label}
        type={type}
        disabled={loading}
        className={`w-47 h-9 border-2 px-2 py-1 outline-none appearance-none ${inputClassName}`}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
