import { ChangeEvent } from 'react';
import Option from '@/components/Atoms/Option';
import { Languages, Language } from '@/lib/domain/languages';

export default function LanguageSelect(props: {label: string, value: Language, disabled: boolean, onChange: (e: ChangeEvent<HTMLSelectElement>) => void}) {
  const selectClassName = props.disabled ? 'border-gray-400 cursor-not-allowed' : 'border-[color:var(--color-primary)] cursor-pointer';

  return (
    <div className='flex justify-center items-center py-2'>
      <label htmlFor={props.label} className='block w-20'>{props.label}: </label>
      <select
        id={props.label}
        value={props.value}
        disabled={props.disabled}
        className={`w-47 h-9 border-2 px-2 py-1 outline-none appearance-none ${selectClassName}`}
        onChange={props.onChange}
        required
      >
        {Object.keys(Languages).map(language => (
          <Option key={language} language={language as Language} />
        ))}
      </select>
    </div>
  );
}
