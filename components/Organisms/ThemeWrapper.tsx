'use client';

import { ThemeColor } from '@/lib/themeColor';
import { PaletteMode, FormLabel, RadioGroup } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '@/components/Templates/ThemeProviderWrapper';

export default function ThemeWrapper(
  props: {
    label: string,
    value: ThemeColor | PaletteMode,
    toggle: (() => void) | ((newColor: ThemeColor) => void),
    children: React.ReactNode
  }
) {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme } = context;

  return (
    <div className='flex flex-wrap justify-center items-center w-full h-auto my-10'>
      <FormLabel
        component='legend'
        sx={{
          color: theme.palette.primary.main,
          width: '100%',
          textAlign: 'center'
        }}
      >
        {props.label}
      </FormLabel>
      <RadioGroup
        name={props.label.toLocaleLowerCase()}
        value={props.value}
        onChange={(e) => props.toggle(e.target.value as ThemeColor)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0 10px'
        }}
        row
      >
        <div className='flex flex-wrap justify-center w-75 xl:w-full'>
          {props.children}
        </div>
      </RadioGroup>
    </div>
  );
}
