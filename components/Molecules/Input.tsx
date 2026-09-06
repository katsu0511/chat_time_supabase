import { ChangeEvent } from 'react';

export default function Input(props: {label: string, type: string, value: string, disabled: boolean, onChange: (e: ChangeEvent<HTMLInputElement>) => void}) {
  const inputClassName = props.disabled ? 'border-gray-400 cursor-not-allowed' : 'border-[color:var(--color-primary)] cursor-text';

  return (
    <div className='flex justify-center items-center py-2'>
      <label htmlFor={props.label} className='block w-20'>{props.label}: </label>
      <input
        id={props.label}
        type={props.type}
        disabled={props.disabled}
        className={`w-47 h-9 border-2 px-2 py-1 outline-none appearance-none ${inputClassName}`}
        value={props.value}
        onChange={props.onChange}
        required
      />
    </div>
  );
}
