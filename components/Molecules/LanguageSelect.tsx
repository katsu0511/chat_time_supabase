import { ChangeEvent } from 'react';
import Option from '@/components/Atoms/Option';
import { Languages, Language } from '@/lib/domain/languages';

export default function LanguageSelect(props: {label: string, onChange: (e: ChangeEvent<HTMLSelectElement>) => void}) {
  return (
    <div className='flex justify-center items-center py-2'>
      <label htmlFor={props.label} className='block w-20'>{props.label}: </label>
      <select
        id={props.label}
        className='border-[color:var(--color-primary)] w-47 h-9 border-2 px-2 py-1 outline-none appearance-none'
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
