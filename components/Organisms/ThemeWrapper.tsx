'use client';

import { ThemeColor } from '@/lib/theme/colors';
import { PaletteMode, FormLabel, RadioGroup } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '@/components/Templates/ThemeProviderWrapper';

type Props = {
  label: string
  value: ThemeColor | PaletteMode
  toggle: (() => void) | ((newColor: ThemeColor) => void)
  children: React.ReactNode
};

export default function ThemeWrapper({ label, value, toggle, children }: Props) {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme } = context;

  return (
    <div className={`flex flex-wrap justify-center items-center w-full h-auto ${label === 'Theme' && 'mb-10'}`}>
      <FormLabel
        component='legend'
        sx={{
          color: theme.palette.primary.main,
          width: '100%',
          textAlign: 'center'
        }}
      >
        {label}
      </FormLabel>
      <RadioGroup
        name={label.toLocaleLowerCase()}
        value={value}
        onChange={(e) => toggle(e.target.value as ThemeColor)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0 10px'
        }}
        row
      >
        <div className='flex flex-wrap justify-center w-75 xl:w-full'>
          {children}
        </div>
      </RadioGroup>
    </div>
  );
}
