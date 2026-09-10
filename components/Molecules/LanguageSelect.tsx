import { ChangeEvent } from 'react';
import useLoading from '@/lib/hooks/useLoading';
import { Languages, Language } from '@/lib/domain/languages';
import Option from '@/components/Atoms/Option';

type Props = {
  label: string
  value: Language
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
};

export default function LanguageSelect({ label, value, onChange }: Props) {
  const { loading } = useLoading();
  const selectClassName = loading ? 'border-gray-400 cursor-not-allowed' : 'border-[color:var(--color-primary)] cursor-pointer';

  return (
    <div className='flex justify-center items-center py-2'>
      <label htmlFor={label} className='block w-20'>{label}: </label>
      <select
        id={label}
        value={value}
        disabled={loading}
        className={`w-47 h-9 border-2 px-2 py-1 outline-none appearance-none ${selectClassName}`}
        onChange={onChange}
        required
      >
        {Object.keys(Languages).map(language => (
          <Option key={language} language={language as Language} />
        ))}
      </select>
    </div>
  );
}
